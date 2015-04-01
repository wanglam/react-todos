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
			return(
				React.createElement("h2", null)
			);
		}
	});

	var TodoItem = React.createClass({displayName: "TodoItem",
		render:function(){
			
		}
	})

	var TodoControllerBar = React.createClass({displayName: "TodoControllerBar",
		render:function(){
			return(
				React.createElement("h2", null)
			);
		}
	});



	var TodoPanel = React.createClass({displayName: "TodoPanel",
		render:function(){
			return(
				React.createElement(TodoInputRow, null)
			);
		}
	});

	React.render(
	     React.createElement(TodoPanel, null),
	    document.getElementById('todoContainer')
	);
})()
