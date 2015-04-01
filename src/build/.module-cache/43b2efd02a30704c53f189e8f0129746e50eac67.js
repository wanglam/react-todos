var datas = [
  {id: 1, text: "This is one comment","completed":false},
  {id: 2, text: "This is *another* comment","completed":true}
];
;(function(){
	var TodoInputRow = React.createClass({displayName: "TodoInputRow",
		render:function(){
			return(
				React.createElement("div", {style: {padding:5+"px",border:"1px solid gray"}}, 
					React.createElement("input", {type: "checkbox", style: {marginRight:"5px"}}), 
					React.createElement("input", {type: "text", value: "Please input a message", style: {fontSize:"1.2em",padding:"5px"}})
				)
			);
		}
	});
	var TodoList = React.createClass({displayName: "TodoList",
		getInitialState:function(){
			return {editing:null}
		},
		edit:function(todo){
			this.setState({editing:todo.id})
		},
		save:function(todo,text){
			for(var i=0;i<this.props.data.length;i++){
				if(this.props.data[i].id == todo.id){
					this.props.data[i].text = text;
					break;
				}
			}
			this.setState({editing:null})
		},
		destroy:function(todo){
			this.setState({editing:null})
		},
		render:function(){
			var todoItems = this.props.data.map(function(item){
				return(
					React.createElement(TodoItem, {
							todo: item, 
							editing: this.state.editing === item.id, 
							onSave: this.save.bind(this,item), 
							onEdit: this.edit.bind(this,item)})
				)
			},this)
			return(
				React.createElement("div", null, 
					todoItems
				)
			);
		}
	});

	var TodoItem = React.createClass({displayName: "TodoItem",
		handleEdit:function(e){
			this.props.onEdit();
			this.setState({"editText":this.props.todo.text})
		},
		getInitialState:function(){
			return {editText:this.props.todo.text}
		},
		handleChange:function(e){
			this.setState({editText:e.target.value})
		},
		handleSubmit:function(e){
			var val = e.target.value.trim();
			if(val!=""){
				this.props.onSave(val);
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
				React.createElement("div", {className: cxs}, 
					React.createElement("input", {type: "checkbox", style: {marginRight:"5px"}}), 
					React.createElement("label", {onDoubleClick: this.handleEdit, className: "show"}, this.props.todo.text), 
					React.createElement("input", {
						className: "input", 
						type: "text", 
						value: this.state.editText, 
						onBlur: this.handleSubmit, 
						onChange: this.handleChange}), 
					React.createElement("button", {style: {float:"right"}}, "X"), 
					React.createElement("div", {style: {clear:"both"}})
				)
			)
		}
	})

	var TodoControllerBar = React.createClass({displayName: "TodoControllerBar",
		render:function(){
			return(
				React.createElement("div", {style: {padding:5+"px",border:"1px solid green"}}, 
					React.createElement("span", null, "1 item left"), 
					React.createElement("button", null, "All"), 
					React.createElement("button", null, "Active"), 
					React.createElement("button", null, "Completed")
				)
			);
		}
	});



	var TodoPanel = React.createClass({displayName: "TodoPanel",
		render:function(){
			return(
				React.createElement("div", null, 
					React.createElement(TodoInputRow, null), 
					React.createElement(TodoList, {data: datas}), 
					React.createElement(TodoControllerBar, null)
				)
			);
		}
	});

	React.render(
	     React.createElement(TodoPanel, null),
	    document.getElementById('todoContainer')
	);
})()
