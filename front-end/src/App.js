import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.css";
import TasksList from "./containers/TasksList";


class App extends Component {
	render () {
		return (
			<>
			<TasksList/>
			</>
		);
	}
}

export default App;
