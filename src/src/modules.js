var datas = [
  {id: 1, text: "This is one comment","completed":false},
  {id: 2, text: "This is *another* comment","completed":true}
];
;(function(){
	var TodoInputRow = React.createClass({
		render:function(){
			return(
				<div style={{padding:5+"px",border:"1px solid gray"}}>
					<input type="checkbox" style={{marginRight:"5px"}} />
					<input type="text" value="Please input a message" style={{fontSize:"1.2em",padding:"5px"}} />
				</div>
			);
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
			this.onSave(todo.id,text);
			this.setState({editing:null})
		},
		destroy:function(todo){
			this.setState({editing:null})
		},
		render:function(){
			var todoItems = this.props.data.map(function(item){
				return(
					<TodoItem 
							todo={item} 
							editing={this.state.editing === item.id}
							onSave={this.save.bind(this,item)}
							onEdit={this.edit.bind(this,item)} />
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
				this.props.Destroy();
			}
		},
		render:function(){
			var cxs = React.addons.classSet({
					todoitem:true,
					editing:this.props.editing,
					complete:this.props.completed
			});
			return (
				<div className={cxs}>
					<input type="checkbox" style={{marginRight:"5px"}} />
					<label onDoubleClick={this.handleEdit} className="show">{this.props.todo.text}</label>
					<input 
						className="input" 
						type="text" 
						value={this.state.editText}
						onBlur={this.handleSubmit}
						onChange={this.handleChange} />
					<button style={{float:"right"}}>X</button>
					<div style={{clear:"both"}}></div>
				</div>
			)
		}
	})

	var TodoControllerBar = React.createClass({
		render:function(){
			return(
				<div style={{padding:5+"px",border:"1px solid green"}}>
					<span>1 item left</span>
					<button>All</button>
					<button>Active</button>
					<button>Completed</button>
				</div>
			);
		}
	});



	var TodoPanel = React.createClass({
		save:function(id,text){
			for(var i=0;i<this.props.data.length;i++){
				if(this.props.data[i].id == id){
					this.props.data[i].text = text;
					break;
				}
			}
		},
		render:function(){
			return(
				<div>
					<TodoInputRow />
					<TodoList 
						data={this.props.data}
						onSave={this.save.bind(this)}  />
					<TodoControllerBar />
				</div>
			);
		}
	});

	React.render(
	     <TodoPanel data={datas} />,
	    document.getElementById('todoContainer')
	);
})()
