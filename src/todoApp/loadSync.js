import React, { Component } from "react";
import { connect } from "react-redux";
import { Link,browserHistory } from "react-router";
import * as firebase from "firebase";

import "./app.css";
let db = firebase.database();

function Status(props) {
  if (props.loaded) {

    setTimeout(()=>{
      browserHistory.push("/");
    },4500);

    return (
      <div>
        Data loaded successfully!
        <Link to="/">Visit</Link>
        <p>UserCode: {props.user}</p>
      </div>
    );
  }
  if (props.error && !props.loaded) {
    return <div>UserCode not Found.</div>;
  }

  return <div />;
}

class loadSyncContainer extends Component {
  componentDidMount() {
    this.refs.usercode.focus();
  }
  loadFromCloud = e => {
    e.preventDefault();
    let usercode = this.refs.usercode.value;
    db.ref("users/" + usercode).once("value", snap => {
      let cloudState = snap.val();
      if (cloudState != null) {
        this.props.loadFromCloud(cloudState);
      }
      if (cloudState == null) {
        this.props.UserNotFound();
      }
      //   cleanup input
      this.refs.usercode.value = "";
    });
  };
  render() {
    return (
      <div className="container">
        
         <ul className="sync">
          <li>Enter the UserCode to load your data from the cloud;</li>
         
        </ul>

        <form className="note" onSubmit={this.loadFromCloud}>
          <input type="text" required ref="usercode" placeholder="Usercode" />
          <input type="submit" value="loadFromCloud" />
        </form>
        <Status
          loaded={this.props.store.loadFromCloud}
          user={this.props.store.userCode}
          error={this.props.store.loadError}
        />
      </div>
    );
  }
}

function mapState(store) {
  return {
    store
  };
}

function mapDispatch(dispatch) {
  return {
    loadFromCloud: cloudState => {
      dispatch({ type: "LOAD_FROM_CLOUD", cloudState });
    },
    UserNotFound: () => {
      dispatch({ type: "USER_NOT_FOUND" });
    }
  };
}

export default connect(mapState, mapDispatch)(loadSyncContainer);
