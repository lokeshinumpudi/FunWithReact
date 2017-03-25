import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { Router, Route,IndexRoute, browserHistory } from "react-router";
// our components and stores
// import noteStore from "./components/redux/notesStore";
// import NotesContainer from "./components/notes";

// todoApp store 
import todoStore from "./todoApp/store/todoStore";

// all our components
import TodoContainer from "./todoApp/todo";
import App from "./todoApp/app";
import syncContainer from "./todoApp/sync";
import loadSyncContainer from "./todoApp/loadSync";

ReactDOM.render(
  <Provider store={todoStore}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute  component={TodoContainer} />
        <Route path="/sync" component={syncContainer} />
        <Route path="/load" component={loadSyncContainer} />
      </Route>

    </Router>
  </Provider>,
  document.getElementById("root")
);
