import React, { Component } from 'react';
import {Col, Row, Form} from "react-bootstrap";

class TextBox extends Component {
	state = {
		fields: {
			box: this.props.fields.box
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
			<Row>
				<Col md={12} onMouseDown={(e) => e.stopPropagation()}>
						<Form.Control as="textarea" rows="10" title='box' defaultValue={this.state.fields.box} onChange={(e) => this.handleFieldChange(e)}/>
				</Col>
			</Row>
		);
	}
}

export default TextBox;
