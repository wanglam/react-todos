var datas = [
  {id: 1, text: "This is one comment","completed":false},
  {id: 2, text: "This is *another* comment","completed":true}
];
(function(){
	var TodoInputRow = React.createClass({
		render:function(){
			return(
				<div style={{padding:5+"px",border:"1px solid gray"}}>
					<input 
						type="checkbox"
						onChange={this.onAllCompleteCheckedHandler}
						style={{marginRight:"5px"}} />
					<input 
						type="text" 
						ref="newOneInput" 
						onKeyUp={this.onInputKeyUpHandler} 
						placeholder="Please input a message" 
						style={{fontSize:"1.2em",padding:"5px"}} />
				</div>
			);
		},
		onInputKeyUpHandler:function(e){
			if(e.keyCode === 13){
				var inputVal = e.target.value;
				if(!/^\s*$/.test(inputVal)){
					this.props.onAddNew&&this.props.onAddNew(inputVal);
					React.findDOMNode(this.refs.newOneInput).value = "";
				}
			}
		},
		onAllCompleteCheckedHandler:function(e){
			this.props.onAllComplete(e.target.checked);
		}
	});
	var TodoList = React.createClass({
		getInitialState:function(){
			return {editing:null}
		},
		edit:function(todo){
			this.setState({editing:todo.id})
		},
		save:function(todo,text){
			this.props.onSave(todo.id,text);
			this.setState({editing:null})
		},
		destroy:function(todo){
			this.setState({editing:null})
		},
		checkedChangeHandler:function(todo){
			console.log(todo);
			this.props.onItemCheckedChange(todo.id);
		},
		render:function(){
			var todoItems = this.props.data.map(function(item){
				return(
					<TodoItem 
							todo={item} 
							editing={this.state.editing === item.id}
							onSave={this.save.bind(this,item)}
							onEdit={this.edit.bind(this,item)}
							onCheckedChange={this.checkedChangeHandler.bind(this,item)}
							onDestroy={this.props.onItemDestroy.bind(this,item)} />
				)
			},this)
			return(
				<div>
					{todoItems}
				</div>
			);
		}
	});

	var TodoItem = React.createClass({
		handleEdit:function(e){
			this.props.onEdit();
			this.setState({"editText":this.props.todo.text})
		},
		getInitialState:function(){
			return {editText:this.props.todo.text}
		},
		handleChange:function(e){
			this.setState({editText:e.target.value});
		},
		handleSubmit:function(e){
			var val = e.target.value.trim();
			if(val!=""){
				this.props.onSave(val);
				this.setState({editText:val});
			}else{
				this.props.onDestroy();
			}
		},
		render:function(){
			var cxs = React.addons.classSet({
					todoitem:true,
					editing:this.props.editing,
					complete:this.props.todo.completed
			});
			return (
				<div className={cxs}>
					<input type="checkbox" 
						onChange={this.props.onCheckedChange} 
						checked={this.props.todo.completed} 
						style={{marginRight:"5px"}} />
					<label onDoubleClick={this.handleEdit} className={"show"}>{this.props.todo.text}</label>
					<input 
						className="input" 
						type="text" 
						value={this.state.editText}
						onBlur={this.handleSubmit}
						onChange={this.handleChange} />
					<button style={{float:"right"}} onClick={this.props.onDestroy}>X</button>
					<div style={{clear:"both"}}></div>
				</div>
			)
		}
	})

	var TodoControllerBar = React.createClass({
		render:function(){
			var allActive = this.props.mode === "all"?"active":"";
			var activeActive = this.props.mode === "active"?"active":"";
			var completedActive = this.props.mode === "completed"?"active":"";
			return(
				<div style={{padding:5+"px",border:"1px solid green"}}>
					<span>{this.props.leftItems} item left</span>
					<button className={allActive} onClick={this.onModeChangeHandler.bind(this,"all")}>All</button>
					<button className={activeActive}  onClick={this.onModeChangeHandler.bind(this,"active")}>Active</button>
					<button className={completedActive}  onClick={this.onModeChangeHandler.bind(this,"completed")}>Completed</button>
				</div>
			);
		},
		onModeChangeHandler:function(mode){
			this.props.onModeChange&&this.props.onModeChange(mode);
		}
	});



	var TodoPanel = React.createClass({
		getInitialState:function(){
			return {
				data:[],
				mode:"all",
			}
		},
		save:function(id,text){
			var newData = this.state.data;
			for(var i=0;i<newData.length;i++){
				if(newData[i].id == id){
					newData[i].text = text;
					break;
				}
			}
			this.setState({data:newData});
		},
		addNewHandler:function(inputVal){
			var lastId = new Date().getTime();
			this.setState({data:React.addons.update(this.state.data,{
				$push:[{id:lastId,text:inputVal,completed:false}]
			})})
		},
		onAllCompleteHandler:function(checkedStatus){
			var newData = this.state.data;
			for(var i=0;i<newData.length;i++){
				newData[i].completed = checkedStatus;
			}
			this.setState({data:newData})
		},
		itemCheckedChangeHandler:function(id){
			var newData = this.state.data;
			for(var i=0;i<newData.length;i++){
				if(newData[i].id == id){
					newData[i].completed = !newData[i].completed;
					break;
				}
			}
			this.setState({data:newData});
		},
		itemDestroyHandler:function(todo){
			this.setState({data:this.state.data.filter(function(item){
				return item.id!==this.id;
			}.bind({id:todo.id}))})
		},
		onModeChangeHandler:function(mode){
			this.setState({mode:mode});
		},
		render:function(){
			var leftCount = this.getLeftItemCount();
			var displayItems = this.getDisplayItems();
			return(
				<div>
					<TodoInputRow 
						onAddNew={this.addNewHandler}
						onAllComplete={this.onAllCompleteHandler} />
					<TodoList 
						data={displayItems}
						onSave={this.save}
						onItemDestroy={this.itemDestroyHandler}
						onItemCheckedChange={this.itemCheckedChangeHandler}  />
					<TodoControllerBar 
						leftItems={leftCount} 
						mode={this.state.mode}
						onModeChange={this.onModeChangeHandler} />
				</div>
			);
		},
		getLeftItemCount:function(){
			var count = 0;
			for(var i in this.state.data){
				if(this.state.data[i].completed===false){
					count++;
				}
			}
			return count;
		},
		getDisplayItems:function(){
			return this.state.data.filter(this.conditions[this.state.mode]);
		},
		componentWillMount:function(){
			this.setState({data:this.props.data});
		},
		conditions:{
			"all":function(){
				return true;
			},
			"active":function(item){
				return !item.completed;
			},
			"completed":function(item){
				return item.completed;
			}
		}
	});

	React.render(
	     <TodoPanel data={datas} />,
	    document.getElementById('todoContainer')
	);
})()
