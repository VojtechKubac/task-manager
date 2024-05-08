import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import BaseRouter from "./routes";
import Layout from "./containers/Layout";

class App extends Component {
	render () {
		return (
			<Router>
		   <Layout {...this.props}>
					<BaseRouter/>
				</Layout>
			</Router>
		);
	}
}

export default App;
