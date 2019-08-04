import React, { Component } from 'react';
import {Button, Col, InputGroup, Row} from "react-bootstrap";
import * as _ from "lodash";
import PieChart from 'react-minimal-pie-chart';

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
					name: '', duration: 0, target: '', isPassed: false
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
							<input type={'number'} className={"form-control"} placeholder={"Duration (rounds)"}
								   defaultValue={this.state.fields.effects[index].duration} title={index + '-duration'} id={index}
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

	getLabel = () => {
		let minutes = 0, seconds = this.state.fields.turns * 6, labelString = '';
		while (seconds >= 60){
			minutes += 1;
			seconds += -60;
		}
		labelString = minutes === 0 ? seconds + 's' : minutes + 'm' + seconds + 's';
		return labelString;
	};

	render() {
		return (
			<div>
				<Row>
					<Col sm={6} onMouseDown={(e) => e.stopPropagation()}>
						<Row className={"text-center"}><Col>
							<Button variant="dark" onClick={this.newEncounter}>Reset</Button>
						</Col></Row>
							<hr className={'style-eight'}/>
						<Row className={"text-center"}><Col>
							<Button variant="dark" onClick={this.advance}>Turn {this.state.fields.turns}</Button>
						</Col></Row>
					</Col>
					<PieChart
						label={this.getLabel}
						labelPosition={0}
						totalValue={600}
						background={'#fff1c1'}
						startAngle={-90}
						style={ { "width":"9rem", "height": "9rem" } }
						data={[
							{ value: ((this.state.fields.turns * 6) % 60) * 10 - 1, color: '#f76262'},
							{ value: 1, color: '#263859'}
						]}
					/>
				</Row>
				<Row>
					Ongoing Effects:
				</Row>
				{this.getEffects()}
				<Button variant="dark" onMouseDown={(e) => e.stopPropagation()} onClick={this.newEffect}>+</Button>
			</div>
		);
	}
}

export default Encounter;
