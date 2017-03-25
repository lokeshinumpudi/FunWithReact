import React, { Component } from "react";
import { connect } from "react-redux";

import LinkContainer from "./footerLinks";

function Button(props) {
  if (props.completed) {
    return <button> ❌ </button>;
  }
  return <button> ✓ </button>;
}
function Todo(props) {
  return (
    <div>
      <p
        className={props.todo.completed === true ? "done" : null}
        onClick={() => {
          return props.toggleDone(props.todo.id);
        }}
      >
        {props.todo.text}
        <Button completed={props.todo.completed} />
      </p>

    </div>
  );
}


function UserName(props){
  if(props.user!==null){
    return <div className="userName">Welcome {props.user}</div>
  }

  return <div/>
}

// toDo container
class TodoContainer extends Component {
  addTodo = e => {
    e.preventDefault();
    let text = this.refs.todoText.value;
    this.props.addTodo(text);
    // cleanup
    this.refs.todoText.value = "";
  };
  componentDidMount() {
    this.refs.todoText.focus();
  }
  render() {
    return (
      <div className="container">
        <UserName user={this.props.user}/>
        <form className="note" onSubmit={this.addTodo}>
          <input type="text" required ref="todoText" placeholder="Add Todo" />
          <input type="submit" value="Add" />
        </form>

        
          {this.props.todos.map((todo, index) => {
            return <Todo key={index} todo={todo} {...this.props} />;
          })}
        

        <LinkContainer />
      </div>
    );
  } //render
}

function filterTodos(store) {
  switch (store.filter) {
    case "SHOW_ALL": {
      return store.todos;
    }
    case "SHOW_DONE": {
      return store.todos.filter(eachTodo => {
        return eachTodo.completed === true;
      });
    }
    case "SHOW_UNDONE": {
      return store.todos.filter(eachTodo => {
        return eachTodo.completed !== true;
      });
    }
    default:
      return store.todos;
  }
}

// based on visibily filter we filter out the todos here
function mapStateToProps(store) {
  return {
    todos: filterTodos(store),
    user:store.userCode
  };
}

function mapDispatchToProps(dispatch, store) {
  return {
    addTodo: text => {
      dispatch({ type: "ADD_TODO", text: text });
    },
    toggleDone: id => {
      dispatch({ type: "TOGGLE_DONE", id });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
