import React, { Component } from 'react';
import {Button, Col, Row, Form, InputGroup} from "react-bootstrap";

class State extends Component {
	state = {
		fields: {
			armorClass: this.props.fields.armorClass ? this.props.fields.armorClass : 10,
			initiative: this.props.fields.initiative ? this.props.fields.initiative : 0,
			speed: this.props.fields.speed ? this.props.fields.speed : 30,
			hpMax: this.props.fields.hpMax ? this.props.fields.hpMax : 0,
			hpCurrent: this.props.fields.hpCurrent ? this.props.fields.hpCurrent : 0,
			hpTemporary: this.props.fields.hpTemporary ? this.props.fields.hpTemporary : 0,
			hdMax: this.props.fields.hdMax ? this.props.fields.hdMax : 1,
			hdCurrent: this.props.fields.hdCurrent ? this.props.fields.hdCurrent : 1,
			deathSaves: this.props.fields.deathSaves ? this.props.fields.deathSaves : {
				success: {one: false, two: false, three: false},
				failure: {one: false, two: false, three: false}
			}
		}
	};

	handleChanges = (fields) => {this.props.handleChanges(fields)};

	handleDeathSave = (box) => {
		const ext = {...this.state.fields};
		if (box.startsWith('s')){
			if (box.endsWith('1')) {
				ext.deathSaves.success.one = !ext.deathSaves.success.one;
			} else if (box.endsWith('2')) {
				ext.deathSaves.success.two = !ext.deathSaves.success.two;
			} else if (box.endsWith('3')) {
				ext.deathSaves.success.three = !ext.deathSaves.success.three;
			}
		} else if (box.startsWith('f')){
			if (box.endsWith('1')) {
				ext.deathSaves.failure.one = !ext.deathSaves.failure.one;
			} else if (box.endsWith('2')) {
				ext.deathSaves.failure.two = !ext.deathSaves.failure.two;
			} else if (box.endsWith('3')) {
				ext.deathSaves.failure.three = !ext.deathSaves.failure.three;
			}
		}
		this.handleChanges(ext);
		this.setState(prevState => {
				return {
					fields: ext
				};
			}
		);
	};

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

	rest = () => {
		const ext = {...this.state.fields};
		ext.deathSaves = {
			success: {one: false, two: false, three: false},
			failure: {one: false, two: false, three: false}
		};
		ext.hpCurrent = ext.hpMax;
		ext.hdCurrent = ext.hdMax;
		document.getElementById('hpCurrent').value=ext.hpCurrent;
		document.getElementById('hdCurrent').value=ext.hdCurrent;

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
			<div>
				<Row>
					<Col md={4} className={"right-padding"} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'number'} className={"form-control"}
							   defaultValue={this.state.fields.armorClass} title='armorClass'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<Form.Label className={"center"}><em>A.C.</em></Form.Label>
					</Col>
					<Col md={4} className={"right-padding"} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'number'} className={"form-control"}
							   defaultValue={this.state.fields.initiative} title='initiative'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<Form.Label className={"center"}><em>Initiative</em></Form.Label>
					</Col>
					<Col md={4} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'number'} className={"form-control"}
							   defaultValue={this.state.fields.speed} title='speed'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<Form.Label className={"center"}><em>Speed</em></Form.Label>
					</Col>
				</Row>

				<Col>
					<InputGroup onMouseDown={(e) => e.stopPropagation()}>
						<Form.Control type="number" title="hpCurrent" defaultValue={this.state.fields.hpCurrent} onChange={(e) => this.handleFieldChange(e)} id="hpCurrent"/>
						<InputGroup.Prepend>
							<InputGroup.Text>/</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control type="number" title="hpMax" defaultValue={this.state.fields.hpMax} onChange={(e) => this.handleFieldChange(e)}/>
					</InputGroup>
					<Form.Label><em>Hit Points (Current / Max)</em></Form.Label>
				</Col>

				<Col>
					<InputGroup onMouseDown={(e) => e.stopPropagation()}>
						<Form.Control type="number" title="hdCurrent" defaultValue={this.state.fields.hdCurrent} onChange={(e) => this.handleFieldChange(e)} id="hdCurrent"/>
						<InputGroup.Prepend>
							<InputGroup.Text>/</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control type="number" title="hdMax" defaultValue={this.state.fields.hdMax} onChange={(e) => this.handleFieldChange(e)}/>
					</InputGroup>
					<Form.Label><em>Hit Die (Current / Max)</em></Form.Label>
				</Col>

				<Col className="thin-border">
					<InputGroup onMouseDown={(e) => e.stopPropagation()}>
						<Form.Label><em>Successes</em></Form.Label> &nbsp;
						<Form.Check checked={this.state.fields.deathSaves.success.one} onChange={(e) => this.handleDeathSave('s1')}/>
						<Form.Check checked={this.state.fields.deathSaves.success.two} onChange={(e) => this.handleDeathSave('s2')}/>
						<Form.Check checked={this.state.fields.deathSaves.success.three} onChange={(e) => this.handleDeathSave('s3')}/>
					</InputGroup>

					<InputGroup onMouseDown={(e) => e.stopPropagation()}>
						<Form.Label><em>Failures</em></Form.Label> &nbsp;
						<Form.Check checked={this.state.fields.deathSaves.failure.one} onChange={(e) => this.handleDeathSave('f1')}/>
						<Form.Check checked={this.state.fields.deathSaves.failure.two} onChange={(e) => this.handleDeathSave('f2')}/>
						<Form.Check checked={this.state.fields.deathSaves.failure.three} onChange={(e) => this.handleDeathSave('f3')}/>
					</InputGroup>

					<Form.Label><em>Death Saves</em></Form.Label> &nbsp;
				</Col>
				<hr className={"style-eight"}/>

				<Row>
					<Col onMouseDown={(e) => e.stopPropagation()}>
						<Button variant="dark" onClick={this.rest}>Rest</Button>
					</Col>
				</Row>


			</div>
		);
	}
}

export default State;
