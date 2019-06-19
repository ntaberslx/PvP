import React, { Component } from 'react';
import {Col, Row, Image} from "react-bootstrap";

class Portrait extends Component {
	state = {
		fields: {
			path: this.props.fields.path ? this.props.fields.path : '',
		}
	};

	handleChanges = (fields) => {this.props.handleChanges(fields)};

	handleFieldChange = (event) =>{
		const element = event.target;
		const ext = {...this.state.fields};
		ext[element.title] = element.value;
		this.handleChanges(ext);
		this.setState(prevState => {
				return {
					fields: ext
				};
			}
		);
	};

	render() {
		return (
			<Row className="row">
				<Col md={12} onMouseDown={(e) => e.stopPropagation()}>
					<input type={'text'} className={"form-control"} placeholder={"Portrait URL"}
						   defaultValue={this.state.fields.path} title='path'
						   onChange={(e) => this.handleFieldChange(e)}/>
					<Image src={this.state.fields.path} rounded thumbnail />
				</Col>
			</Row>
		);
	}
}

export default Portrait;
