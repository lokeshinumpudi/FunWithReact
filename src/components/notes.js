import React, { Component } from "react";
import {connect} from "react-redux";
import "./notes.css";

// presentational components
class Note extends Component {
  // calls parent method passing list value
  editModeOn = () => {
    this.props.triggerEditMode(this.props.list.text);
  };
  render() {
    return (
      <div className="note">
        <li onClick={this.editModeOn}>{this.props.list.text}</li>
        <span onClick={this.editModeOn}>
          Edit
        </span>
        <span data-item={this.props.list.text} onClick={this.props.deleteItem}>
          X
        </span>
      </div>
    );
  } //render
} //component
class Edit extends Component {
  componentDidMount() {
    this.refs.editModeItemText.focus();
  }
  render() {
    return (
      <div className="note">
        <form onSubmit={this.finishEdit}>
          <input
            type="text"
            ref="editModeItemText"
            defaultValue={this.props.list.text}
            onBlur={this.finishEdit}
          />
          <input type="submit" className="success" value="save" />
        </form>

      </div>
    );
  } //render

  finishEdit = e => {
    e.preventDefault();
    let prevVal = this.props.list.text;
    let newVal = this.refs.editModeItemText.value;
    // console.log(newVal);
    // notify parent component of this edit
    this.props.editDone(prevVal, newVal);
  };
} //component
// pure functional Comp : Toggles between (Edit,Note) presentational components based on props{list.editMode}
let EditableItem = props => {
  if (props.list.editMode) {
    return <Edit {...props} />;
  }
  return <Note {...props} />;
}; //pure component

// Container component
class NotesContainer extends Component {

  componentDidMount() {
    this.refs.noteInput.focus();
  }
  addItem = e => {
    e.preventDefault();
    let noteText = this.refs.noteInput.value;
    // dispatch an action to store to update
    this.props.dispatch({ type: "addItem", noteText });
    // reset the note value
    this.refs.noteInput.value = "";
    this.refs.noteInput.focus();
  };
  deleteItem = e => {
    let noteText = e.target.attributes["data-item"].value;
    // dispatch an action to store to update
    this.props.dispatch({ type: "deleteItem", noteText });
  }; //deleteItem
  triggerEditMode = noteText => {
    // dispatch an action to store to update
    this.props.dispatch({ type: "triggerEditMode", noteText });
  }; //triggerEditMode

  // propagated through child components
  editDone = (prevVal, newVal) => {
    this.props.dispatch({ type: "editDone", prevVal, newVal });
  };
  render() {
    let { addItem, deleteItem, triggerEditMode, editDone } = this;
    let passToChildThigs = { addItem, deleteItem, triggerEditMode, editDone };

    console.log(this.props);
    return (
      <div className="container">
        <form className="note" onSubmit={this.addItem}>
          <input type="text" required ref="noteInput" placeholder="Add Notes" />
          <input type="submit" value="Add" />
        </form>
        {this.props.notes.map((list,index) => {
          return <EditableItem list={list} key={list.id} {...passToChildThigs} />;
        })}
      </div>
    );
  } //render
} //Component"



function mapStateToProps(store){
  return {
    notes:store.notes
  }
}
// enacpsulate with redux component so store updates are listened 
export default connect(mapStateToProps)(NotesContainer);
