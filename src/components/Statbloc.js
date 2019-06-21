import React, { Component } from 'react';
import {Col, Row, InputGroup, Form} from "react-bootstrap";
import _ from "lodash";

class Statbloc extends Component {
	state = {
		fields: {
			proficiencyBonus: this.props.fields.proficiencyBonus ? this.props.fields.proficiencyBonus : '',

			str: this.props.fields.str ? this.props.fields.str : 10,
			str_saving_throws: this.props.fields.str_saving_throws ? this.props.fields.str_saving_throws : false,
			athletics: this.props.fields.athletics ? this.props.fields.athletics : false,

			dex: this.props.fields.dex ? this.props.fields.dex : 10,
			dex_saving_throws: this.props.fields.dex_saving_throws ? this.props.fields.dex_saving_throws : false,
			acrobatics: this.props.fields.acrobatics ? this.props.fields.acrobatics : false,
			sleight_of_hand: this.props.fields.sleight_of_hand ? this.props.fields.sleight_of_hand : false,
			stealth: this.props.fields.stealth ? this.props.fields.stealth : false,

			con: this.props.fields.con ? this.props.fields.con : 10,

			int: this.props.fields.int ? this.props.fields.int : 10,
			arcana: this.props.fields.arcana ? this.props.fields.arcana : false,
			history: this.props.fields.history ? this.props.fields.history : false,
			investigation: this.props.fields.investigation ? this.props.fields.investigation : false,
			nature: this.props.fields.nature ? this.props.fields.nature : false,
			religion: this.props.fields.religion ? this.props.fields.religion : false,

			wis: this.props.fields.wis ? this.props.fields.wis : 10,
			animal_handling: this.props.fields.animal_handling ? this.props.fields.animal_handling : false,
			insight: this.props.fields.insight ? this.props.fields.insight : false,
			medicine: this.props.fields.medicine ? this.props.fields.medicine : false,
			perception: this.props.fields.perception ? this.props.fields.perception : false,
			survival: this.props.fields.survival ? this.props.fields.survival : false,

			cha: this.props.fields.cha ? this.props.fields.cha : 10,
			deception: this.props.fields.deception ? this.props.fields.deception : false,
			intimidation: this.props.fields.intimidation ? this.props.fields.intimidation : false,
			performance: this.props.fields.performance ? this.props.fields.performance : false,
			persuasion: this.props.fields.persuasion ? this.props.fields.persuasion : false,
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
			name : "Strength",
			field : "str",
			skills : [
				{name: "Athletics", field: "athletics"}
			]
		},
		{
			name : "Dexterity",
			field : "dex",
			skills : [
				{name: "Acrobatics", field: "acrobatics"},
				{name: "Sleight Of Hand", field: "sleight_of_hand"},
				{name: "Stealth", field: "stealth"}
			]
		},
		{
			name : "Constitution",
			field : "con",
			skills : []
		},
		{
			name : "Intelligence",
			field : "int",
			skills : [
				{name: "Arcana", field: "arcana"},
				{name: "History", field: "history"},
				{name: "Investigation", field: "investigation"},
				{name: "Nature", field: "nature"},
				{name: "Religion", field: "religion"}
			]
		},
		{
			name : "Wisdom",
			field: "wis",
			skills : [
				{name: "Animal Handling", field: "animal_handling"},
				{name: "Insight", field: "insight"},
				{name: "Medicine", field: "medicine"},
				{name: "Perception", field: "perception"},
				{name: "Survival", field: "survival"},
			]
		},
		{
			name : "Charisma",
			field: "cha",
			skills : [
				{name: "Deception", field: "deception"},
				{name: "Intimidation", field: "intimidation"},
				{name: "Performance", field: "performance"},
				{name: "Persuasion", field: "persuasion"}
			]
		}
	];

	getModifier = (stat) => {
		return Math.floor((stat - 10) / 2) > 0 ? '+' + Math.floor((stat - 10) / 2) : Math.floor((stat - 10) / 2);
	};

	getStats = () => {
		return _.map(this.stats, (statistic, index, collection)=>{
			return (
				<div>
					<Row className="row">
						<Col sm={4} onMouseDown={(e) => e.stopPropagation()} >
							<Form.Control type="number" title={statistic.field} defaultValue={this.state.fields[statistic.field]} onChange={(e) => this.handleFieldChange(e)}/>
							<div className={"center"}><h1 className={"marginless"}>{this.getModifier(this.state.fields[statistic.field])}</h1></div>
							<Form.Label className={"center"}><em>{statistic.name}</em></Form.Label>
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
					<hr className={"style-seven"} hidden={index === collection.length - 1}/>
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
				<Row className={"proficiency-bonus"}>
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
				<hr className={"style-seven"}/>

				{this.getStats()}

			</Form>
		);
	}
}

export default Statbloc;
