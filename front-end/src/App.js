import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import BaseRouter from "./routes";


class App extends Component {
	render () {
		return (
			<Router>
				<ul className="App-header">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/login">
							Log in
						</Link>
					</li>
					<li>
						<Link to="/tasks">
							See tasks
						</Link>
					</li>
				</ul>
				<BaseRouter/>
			</Router>
		);
	}
}

export default App;
