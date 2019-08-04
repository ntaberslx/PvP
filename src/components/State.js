import React, { Component } from 'react';
import {Button, Col, Row, Form, InputGroup} from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull, faHeartbeat, faDiceD20 } from '@fortawesome/free-solid-svg-icons'

class State extends Component {
	state = {
		fields: {
			armorClass: this.props.fields.armorClass ? this.props.fields.armorClass : 10,
			initiative: this.props.fields.initiative ? this.props.fields.initiative : 0,
			inspiration: this.props.fields.inspiration,
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

	handleCheckbox = (box) => {
		const event = {
			target: {
				title: box,
				value: !this.state.fields[box]
			}
		};
		this.handleFieldChange(event);
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
					<Col md={4} className={"four-padding"} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'number'} className={"form-control"}
							   defaultValue={this.state.fields.armorClass} title='armorClass'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<Form.Label className={"center"}><em>A.C.</em></Form.Label>
					</Col>
					<Col md={4} className={"four-padding"} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'number'} className={"form-control"}
							   defaultValue={this.state.fields.initiative} title='initiative'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<Form.Label className={"center"}><em>Initiative</em></Form.Label>
					</Col>
					<Col md={4} className={"four-padding"} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'number'} className={"form-control"}
							   defaultValue={this.state.fields.speed} title='speed'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<Form.Label className={"center"}><em>Speed</em></Form.Label>
					</Col>
				</Row>

				<Row onMouseDown={(e) => e.stopPropagation()}>
					<Col>
						<Row className={'text-center'}>
							<Col>
								<div className="pretty p-icon p-smooth" style={{"fontSize": "2.5em", "marginRight":"10px"}}>
									<input type="checkbox" checked={this.state.fields.inspiration} onChange={(e)=>this.handleCheckbox('inspiration')}/>
									<div className="state">
										<i className="icon">
											<FontAwesomeIcon icon={faDiceD20} size={"sm"} transform={"up-2.5"} color={"#f7be16"}/>
										</i>
										<label>Inspiration</label>
									</div>
								</div>
							</Col>
						</Row>
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

				<Col className="thin-border text-center">
					<Row><Col>
						<Form.Label><em>Death Saves</em></Form.Label> &nbsp;
					</Col></Row>

					<Row><Col>
						<InputGroup onMouseDown={(e) => e.stopPropagation()} className={'pull-center'}>
							<Form.Label title={"Successes"}>Pass: </Form.Label> &nbsp;
							<div className="pretty p-icon p-smooth" style={{"fontSize": "2em", "marginRight":"10px"}}>
								<input type="checkbox" checked={this.state.fields.deathSaves.success.one} onChange={(e) => this.handleDeathSave('s1')}/>
								<div className="state">
									<i className="icon">
										<FontAwesomeIcon icon={faHeartbeat} size={"sm"} transform={"up-2.5"} color={"#fabc74"}/>
									</i>
									<label/>
								</div>
							</div>
							<div className="pretty p-icon p-smooth" style={{"fontSize": "2em", "marginRight":"10px"}}>
								<input type="checkbox" checked={this.state.fields.deathSaves.success.two} onChange={(e) => this.handleDeathSave('s2')}/>
								<div className="state">
									<i className="icon">
										<FontAwesomeIcon icon={faHeartbeat} size={"sm"} transform={"up-2.5"} color={"#afa939"}/>
									</i>
									<label/>
								</div>
							</div>
							<div className="pretty p-icon p-smooth" style={{"fontSize": "2em", "marginRight":"10px"}}>
								<input type="checkbox" checked={this.state.fields.deathSaves.success.three} onChange={(e) => this.handleDeathSave('s3')}/>
								<div className="state">
									<i className="icon">
										<FontAwesomeIcon icon={faHeartbeat} size={"sm"} transform={"up-2.5"} color={"#2b580c"}/>
									</i>
									<label/>
								</div>
							</div>
						</InputGroup></Col>
						<Col>
						<InputGroup onMouseDown={(e) => e.stopPropagation()}>
							<Form.Label title={"Failures"}>Fail</Form.Label> &nbsp;
							<div className="pretty p-icon p-smooth" style={{"fontSize": "2em", "marginRight":"10px"}}>
								<input type="checkbox" checked={this.state.fields.deathSaves.failure.one} onChange={(e) => this.handleDeathSave('f1')}/>
								<div className="state">
									<i className="icon">
										<FontAwesomeIcon icon={faSkull} size={"sm"} transform={"up-2.5"} color={"#fabc74"}/>
									</i>
									<label/>
								</div>
							</div>
							<div className="pretty p-icon p-smooth" style={{"fontSize": "2em", "marginRight":"10px"}}>
								<input type="checkbox" checked={this.state.fields.deathSaves.failure.two} onChange={(e) => this.handleDeathSave('f2')}/>
								<div className="state">
									<i className="icon">
										<FontAwesomeIcon icon={faSkull} size={"sm"} transform={"up-2.5"} color={"#ff0000"}/>
									</i>
									<label/>
								</div>
							</div>
							<div className="pretty p-icon p-smooth" style={{"fontSize": "2em", "marginRight":"10px"}}>
								<input type="checkbox" checked={this.state.fields.deathSaves.failure.three} onChange={(e) => this.handleDeathSave('f3')}/>
								<div className="state">
									<i className="icon">
										<FontAwesomeIcon icon={faSkull} size={"sm"} transform={"up-2.5"} color={"#252525"}/>
									</i>
									<label/>
								</div>
							</div>
						</InputGroup>
					</Col></Row>

				</Col>
				<hr className={"style-eight"}/>

				<Row>
					<Col className={"text-center"} onMouseDown={(e) => e.stopPropagation()}>
						<Button variant="dark" onClick={this.rest}>Reset</Button>
					</Col>
				</Row>


			</div>
		);
	}
}

export default State;
