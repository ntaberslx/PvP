import React, { Component } from 'react';
import {Button, Col, InputGroup, Row} from "react-bootstrap";
import * as _ from "lodash";

class Encounter extends Component {
	state = {
		fields: {
			turns: this.props.fields.turns ? this.props.fields.turns : 0,
			effects : this.props.fields.effects ? this.props.fields.effects : []
		}
	};

	handleChanges = (fields) => {this.props.handleChanges(fields)};

	handleFieldChange = (event) =>{
		const element = event.target;
		const text = element.title.split('-');
		const ext = {...this.state.fields};
		ext.effects[text[0]][text[1]] = element.value;
		this.handleChanges(ext);
		this.setState(prevState => {
				return {
					fields: ext
				};
			}
		);
	};

	newEffect = () => {
		const fields = {
			...this.state.fields,
			effects : [
				...this.state.fields.effects,
				{
					name: '', duration: 0, type: '', target: '', isPassed: false
				}
			]
		};
		this.setState({
			fields
		});
		this.handleChanges(fields);
	};

	newEncounter = () => {
		let fields = {
			...this.state.fields,
			turns: 0,
			effects: []
		};
		this.setState({
			fields
		});
		this.handleChanges(fields);
	};

	advance = () => {
		let effects = [...this.state.fields.effects];
		for (let i = 0; i < effects.length; i++) {
			effects[i].duration = +effects[i].duration - 1;
			if (effects[i].duration <= 0) {
				effects[i].isPassed = true;
			}
		}
		this.setState({
			fields: {
				...this.state.fields,
				effects,
				turns: this.state.fields.turns + 1
			}
		}, () => {
			this.handleChanges(this.state.fields);
			for (let i = 0; i < this.state.fields.effects.length; i++) {
				if (this.state.fields.effects[i].duration > 0) {
					document.getElementById(''+i).value = this.state.fields.effects[i].duration;
				}
			}
		});
	};

	getEffects = () => {
		return _.map(this.state.fields.effects, (effect, index)=>{
			return (
				<div >
					{!effect.isPassed && <Row>
						<InputGroup onMouseDown={(e) => e.stopPropagation()}>
							<input type={'text'} className={"form-control"} placeholder={"Name"}
								   defaultValue={this.state.fields.effects[index].name} title={index + '-name'}
								   onChange={(e) => this.handleFieldChange(e)}/>
							<input type={'number'} className={"form-control"} placeholder={"Duration"}
								   defaultValue={this.state.fields.effects[index].duration} title={index + '-duration'} id={index}
								   onChange={(e) => this.handleFieldChange(e)}/>
							<input type={'text'} className={"form-control"} placeholder={"Type"}
								   defaultValue={this.state.fields.effects[index].type} title={index + '-type'}
								   onChange={(e) => this.handleFieldChange(e)}/>
							<input type={'text'} className={"form-control"} placeholder={"Target"}
								   defaultValue={this.state.fields.effects[index].target} title={index + '-target'}
								   onChange={(e) => this.handleFieldChange(e)}/>
						</InputGroup>
					</Row>}
				</div>
			)
		});
	};

	render() {
		return (
			<div>
				<Row>
					<Col sm={4} onMouseDown={(e) => e.stopPropagation()}>
						<Button variant="dark" onClick={this.newEncounter}>Reset</Button>
					</Col>
					<Col sm={2}>
						<h1>{this.state.fields.turns}</h1>
					</Col>
					<Col sm={2}>
						<h4 className={'center'}>{this.state.fields.turns * 6}</h4>
						<h6>seconds</h6>
					</Col>
					<Col sm={4} onMouseDown={(e) => e.stopPropagation()}>
						<Button variant="dark" onClick={this.advance}>Turn</Button>
					</Col>
				</Row>
				<Row>
					Ongoing Effects:
				</Row>
				{this.getEffects()}
				<Button variant="dark" onClick={this.newEffect}>+</Button>
			</div>
		);
	}
}

export default Encounter;
