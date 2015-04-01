;(function(){
	var TodoInputRow = React.createClass({displayName: "TodoInputRow",});
	var TodoList = React.createClass({displayName: "TodoList",});
	var TodoControllerBar = React.createClass({displayName: "TodoControllerBar",});



	var TodoPanel = React.createClass({displayName: "TodoPanel",
		render:function(){
			return(
				React.createElement("h2", null)
			);
		}
	});

	React.render(
	     React.createElement(TodoPanel, null),
	    document.getElementById('todoContainer')
	);
})()
