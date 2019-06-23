import React, { Component } from 'react';
import {Row, Col, Form} from 'react-bootstrap';

class Background extends Component {
	state = {
		fields: {
			name: this.props.fields.name,
			classes : this.props.fields.classes,
			levels: this.props.fields.levels ? this.props.fields.levels : 0,
			ancestry : this.props.fields.ancestry,
			background: this.props.fields.background,
			alignment: this.props.fields.alignment,
			experience : this.props.fields.experience ? this.props.fields.experience : 0,
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
			<Form>
				<Row className={'right-padding'}>
					<Col md={4} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"}
							   defaultValue={this.state.fields.name} title='name'
							   onChange={(e) => this.handleFieldChange(e)} tabIndex={1}/>
						<Form.Label><em>Character Name</em></Form.Label>
					</Col>
					<Col md={8}>
						<Row>
							<Col md={4} onMouseDown={(e) => e.stopPropagation()}>
								<Row>
									<input type={'text'} className={"form-control"} placeholder={"Classes"}
										   defaultValue={this.state.fields.classes} title='classes'
										   onChange={(e) => this.handleFieldChange(e)} tabIndex={2}/>
								</Row>
								<hr className={"style-eight"}/>
								<Row>
									<input type={'text'} className={"form-control"} placeholder={"Experience"}
										   defaultValue={this.state.fields.experience} title='experience'
										   onChange={(e) => this.handleFieldChange(e)} tabIndex={5}/>
								</Row>
							</Col>
							<Col md={4} onMouseDown={(e) => e.stopPropagation()}>
								<Row>
									<input type={'text'} className={"form-control"} placeholder={"Levels"}
										   defaultValue={this.state.fields.levels} title='levels'
										   onChange={(e) => this.handleFieldChange(e)} tabIndex={3}/>
								</Row>
								<hr className={"style-eight"}/>
								<Row>
									<input type={'text'} className={"form-control"} placeholder={"Character Ancestry"}
										   defaultValue={this.state.fields.ancestry} title='ancestry'
										   onChange={(e) => this.handleFieldChange(e)} tabIndex={6}/>
								</Row>
							</Col>
							<Col md={4} onMouseDown={(e) => e.stopPropagation()}>
								<Row>
									<input type={'text'} className={"form-control"} placeholder={"Background"}
										   defaultValue={this.state.fields.background} title='background'
										   onChange={(e) => this.handleFieldChange(e)} tabIndex={4}/>
								</Row>
								<hr className={"style-eight"}/>
								<Row>
									<input type={'text'} className={"form-control"} placeholder={"Alignment"}
										   defaultValue={this.state.fields.alignment} title='alignment'
										   onChange={(e) => this.handleFieldChange(e)} tabIndex={7}/>
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Form>
		);
	}
}

export default Background;
