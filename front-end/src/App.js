import React, { Component } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";


class App extends Component {
	state = {
		tasks: [],
		name: "",
		description: "",
	};

	componentDidMount() {
		let data;

		axios
			.get("http://localhost:8000/tasks/")
			.then((res) => {
				data = res.data;
				this.setState({
					tasks: data,
				});
			})
			.catch((err) => {});
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post("http://localhost:8000/tasks/", {
				name: this.state.name,
				description: this.state.description,
			})
			.then((res) => {
				this.setState({
					name: "",
					description: "",
				});
			})
			.catch((err) => {});
	};

render() {
	return (
		<Container>
			<Row
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					fontSize: "3rem",
					fontWeight: "bolder",
				}}
			>
				TASK LIST
			</Row>

			<hr />
			<Row>
				<Col md={{ span: 5, offset: 4 }}>
          <Form>
            <Form.Group className="mb-3" controlId="inputFormName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="add task . . . "
                size="lg"
                value={this.state.name} name="name"
                onChange={this.handleInput}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="describe the task . . . "
                size="lg"
                value={this.state.description}
                name="description"
                onChange={this.handleInput}
                type="textarea"
                rows={3}
              />
            </Form.Group>
						<Form.Group>
							<Button
								variant="dark"
								className="mt-2"
								onClick={this.handleSubmit}
							>
								ADD
							</Button>
						</Form.Group>
          </Form>
				</Col>
			</Row>
			<Row>
				<Col md={{ span: 5, offset: 4 }}>
					<ListGroup>
						{/* map over and print items */}
						{this.state.tasks.map((task, index) => {
							return (
								<div key = {index} >
									<ListGroup.Item
										variant="dark"
										action
										style={{display:"flex",
												justifyContent:'space-between'
											}}
									>
									{task.name}
									<span>
										<Button style={{marginRight:"10px"}}
											variant = "light"
											onClick={() => this.deleteItem(task.id)}>
											Delete
										</Button>
										<Button variant = "light"
											onClick={() => this.editItem(index)}>
											Edit
										</Button>
									</span>
									</ListGroup.Item>
								</div>
							);
						})}
					</ListGroup>
				</Col>
			</Row>
		</Container>
		);
	}
}

export default App;
