var datas = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
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
		render:function(){
			var todoItems = this.props.data.map(function(item){
				return(
					React.createElement(TodoItem, {text: item.text})
				)
			})
			return(
				React.createElement("div", null, 
					todoItems
				)
			);
		}
	});

	var TodoItem = React.createClass({displayName: "TodoItem",
		handleDoubleClick:function(){
			console.log("double click");
		},
		render:function(){
			
			return (
				React.createElement("div", {className: "todoItem", onDoubleClick: this.handleDoubleClick}, 
					React.createElement("input", {type: "checkbox", style: {marginRight:"5px"}}), 
					React.createElement("span", {className: "show"}, this.props.text), 
					React.createElement("input", {className: "input", type: "text", value: this.props.text}), 
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
