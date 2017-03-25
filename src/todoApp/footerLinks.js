import React, { Component } from "react";
import { connect } from "react-redux";
import "./todostyles.css";

function Link(props) {
  // console.log(props)
  return (
    <span
      className={props.filter === props.filterText ? "active" : null}
      onClick={() => {
        return props.changeFilter(props.filterText);
      }}
    >
      {" "}{props.children}{" "}
    </span>
  );
}

// well encapsulate link with redux so when links are clicked we can change the filter prop in store

// Links container

class LinkContainer extends Component {
  render() {
    if (this.props.todosLength > 0) {
      return (
        <div>
          <Link filterText="SHOW_UNDONE" {...this.props}>
            Remaining
          </Link>
          <Link filterText="SHOW_DONE" {...this.props}>
            Completed
          </Link>
          <Link filterText="SHOW_ALL" {...this.props}>
            All
          </Link>

        </div>
      );
    }

    return <div />;
  } //render
}

function mapStoreToProps(store) {
  // console.log(store);
  return {
    filter: store.filter,
    todosLength: store.todos.length
  };
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    changeFilter: filter => {
      // console.log(filter);
      dispatch({ type: filter });
    }
  }; //return
}

export default connect(mapStoreToProps, mapDispatchToProps)(LinkContainer);
