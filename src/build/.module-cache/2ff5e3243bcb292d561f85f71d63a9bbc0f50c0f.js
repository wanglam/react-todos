;(function(){
	var TodoInputRow = React.createClass({displayName: "TodoInputRow",
		render:function(){
			return(
				React.createElement("div", {style: {padding:5+"px",border:"1px solid black"}}, 
					React.createElement("input", {type: "checkbox"}), 
					React.createElement("input", {type: "text"})
				)
			);
		}});
	var TodoList = React.createClass({displayName: "TodoList",
		render:function(){
			return(
				React.createElement("h2", null)
			);
		}});
	var TodoControllerBar = React.createClass({displayName: "TodoControllerBar",
		render:function(){
			return(
				React.createElement("h2", null)
			);
		}});



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
