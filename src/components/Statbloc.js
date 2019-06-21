import React, { Component } from 'react';
import {Container, Col, Row, InputGroup, Form} from "react-bootstrap";
import _ from "lodash";

class Statbloc extends Component {
	state = {
		fields: {
			proficiencyBonus: this.props.fields.proficiencyBonus ? this.props.fields.proficiencyBonus : '',
			str: this.props.fields.str ? this.props.fields.str : '',
			str_saving_throws: this.props.fields.str_saving_throws ? this.props.fields.str_saving_throws : '',
			athletics: this.props.fields.athletics ? this.props.fields.athletics : '',

			dex: this.props.fields.dex ? this.props.fields.dex : '',
			dex_saving_throws: this.props.fields.dex_saving_throws ? this.props.fields.dex_saving_throws : '',
			acrobatics: this.props.fields.acrobatics ? this.props.fields.acrobatics : '',
			sleight_of_hand: this.props.fields.sleight_of_hand ? this.props.fields.sleight_of_hand : '',
			stealth: this.props.fields.stealth ? this.props.fields.stealth : '',
		}
	};

	handleChanges = (fields) => {this.props.handleChanges(fields)};

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
		console.log(event.target.value);
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

	stats = [
		{
			"name" : "Strength",
			"field" : "str",
			"skills" : [
				{name: "Athletics", field: "athletics"}
			]
		},
		{
			"name" : "Dexterity",
			"field" : "dex",
			"skills" : [
				{name: "Acrobatics", field: "acrobatics"},
				{name: "Sleight Of Hand", field: "sleight_of_hand"},
				{name: "Stealth", field: "stealth"},
			]
		}
	];

	getModifier = (stat) => {
		return Math.floor((stat - 10) / 2) > 0 ? '+' + Math.floor((stat - 10) / 2) : Math.floor((stat - 10) / 2);
	};

	getStats = () => {
		return _.map(this.stats, (statistic)=>{
			return (
				<div>
					<Row>
						<Col md={12}>
							<Form.Label><em>{statistic.name}</em></Form.Label>
						</Col>
					</Row>
					<Row className="row">

						<Col sm={4} onMouseDown={(e) => e.stopPropagation()}>
							<Form.Control type="number" title={statistic.field} defaultValue={this.state.fields[statistic.field]} onChange={(e) => this.handleFieldChange(e)}/>
							<div>{this.getModifier(this.state.fields.str)}</div>
						</Col>

						<Col sm={8} onMouseDown={(e) => e.stopPropagation()}>
							<Row>
								<Col sm={8}>
									<Form.Check label={"Saving Throws"} checked={this.state.fields[statistic.field + '_saving_throws']} onChange={(e) => this.handleCheckbox(statistic.field + '_saving_throws')}/>
								</Col>
								<Col sm={4}>
									{this.getModifier(+this.state.fields[statistic.field] + (this.state.fields[statistic.field + '_saving_throws'] ? +this.state.fields.proficiencyBonus : 0))}
								</Col>
							</Row>
							{this.getSkills(statistic)}
						</Col>
					</Row>
				</div>
			);
		});
	};

	getSkills = (statistic) => {
		return _.map(statistic.skills, (skill) => {
			return (
				<Row>
					<Col sm={8}>
						<Form.Check label={skill.name} checked={this.state.fields[skill.field]} onChange={(e) => this.handleCheckbox(skill.field)}/>
					</Col>
					<Col sm={4}>
						{this.getModifier(+this.state.fields[statistic.field] + (this.state.fields[skill.field] ? +this.state.fields.proficiencyBonus : 0))}
					</Col>
				</Row>
			);
		});
	};

	render() {
		return (
			<Form>
				<Row className="row">
					<Col md={12} onMouseDown={(e) => e.stopPropagation()}>
						<InputGroup size='sm' >
							<InputGroup.Prepend>
								<InputGroup.Text >
									proficiency Bonus
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control type="number" onChange={(e) => this.handleFieldChange(e)} title="proficiencyBonus" defaultValue={this.state.fields.proficiencyBonus}/>
						</InputGroup>
					</Col>
				</Row>

				{this.getStats()}

			</Form>
		);
	}
}

export default Statbloc;
