import React, { Component } from "react";
import { Link,IndexLink } from "react-router";

import "./app.css";

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <li> <IndexLink activeClassName="active" to="/">TODO'S</IndexLink> </li>
          <li> <Link activeClassName="active" to="sync">Save To Cloud</Link> </li>
          <li> <Link activeClassName="active" to="load">Load From Cloud</Link> </li>

        </nav>

        <div className="container">
        {this.props.children}
        </div>
        
      </div>
    );
  }
}

export default App;
