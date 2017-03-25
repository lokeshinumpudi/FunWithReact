import React, { Component } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import "./app.css";
var config = {
  apiKey: "AIzaSyAuGeQBm6Q4BwlrC7p-mANCuese6mZP99Y",
  authDomain: "todos-react-eb4cd.firebaseapp.com",
  databaseURL: "https://todos-react-eb4cd.firebaseio.com",
  storageBucket: "todos-react-eb4cd.appspot.com",
  messagingSenderId: "90815147882"
};

firebase.initializeApp(config);

let db = firebase.database();
db.ref("react/speed").set(100);

db.ref("react/speed").on("value", snap => {
  //   console.log(snap.val());
});
// import "../components/notes.css";

function SyncStatus(props) {
  if (props.store.syncStatus) {
    return (
      <div>
        <p>Sync:{props.store.syncStatus ? "OK" : null}</p>
        <p>Last Sync: {props.store.lastSync} </p>
      </div>
    );
  }

  return <div />;
} //SyncStatus

class syncContainer extends Component {
  componentDidMount = () => {
    if (this.props.store.userCode !== null) {
      this.refs.usercode.value = this.props.store.userCode;
    }
  };
  saveToCloud = e => {
    e.preventDefault();
    let userCode = this.refs.usercode.value;
    let store = this.props.store;
    store.userCode = userCode;
    db.ref("users/" + userCode).set(store, () => {
      let time = Date.now();
      this.props.setSyncStatus({ time, userCode });
    });
  };
  render() {
    return (
      <div className="container">
        <ul className="sync">
          <li>All your data is synced to cloud.</li>
          <li>
            Usercode is your passsword, which you can use to retreive your data later.
          </li>
          {/*<li></li>*/}
        </ul>

        <form className="note" onSubmit={this.saveToCloud}>
          <label htmlFor="usercode">Usercode:</label>
          <input id="usercode" type="text" required ref="usercode" placeholder="Usercode" />
          <input type="submit" value="Save" />
        </form>

        <SyncStatus {...this.props} />

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
    setSyncStatus: ({ time, userCode }) => {
      dispatch({ type: "SYNC_STATUS", time, syncStatus: true, userCode });
    }
  };
}

export default connect(mapState, mapDispatch)(syncContainer);
