import React, { Component } from 'react';
import {Col, Row, InputGroup, Form} from "react-bootstrap";
import _ from "lodash";

class Statblock extends Component {
	state = {
		fields: {
			proficiencyBonus: this.props.fields.proficiencyBonus ? this.props.fields.proficiencyBonus : 2,

			str: this.props.fields.str ? this.props.fields.str : 10,
			str_saving_throws: this.props.fields.str_saving_throws,
			athletics: this.props.fields.athletics,

			dex: this.props.fields.dex ? this.props.fields.dex : 10,
			dex_saving_throws: this.props.fields.dex_saving_throws,
			acrobatics: this.props.fields.acrobatics,
			sleight_of_hand: this.props.fields.sleight_of_hand,
			stealth: this.props.fields.stealth,

			con: this.props.fields.con ? this.props.fields.con : 10,
			con_saving_throws: this.props.fields.con_saving_throws,

			int: this.props.fields.int ? this.props.fields.int : 10,
			int_saving_throws: this.props.fields.int_saving_throws,
			arcana: this.props.fields.arcana,
			history: this.props.fields.history,
			investigation: this.props.fields.investigation,
			nature: this.props.fields.nature,
			religion: this.props.fields.religion,

			wis: this.props.fields.wis ? this.props.fields.wis : 10,
			wis_saving_throws: this.props.fields.wis_saving_throws,
			animal_handling: this.props.fields.animal_handling,
			insight: this.props.fields.insight,
			medicine: this.props.fields.medicine,
			perception: this.props.fields.perception,
			survival: this.props.fields.survival,

			cha: this.props.fields.cha ? this.props.fields.cha : 10,
			cha_saving_throws: this.props.fields.cha_saving_throws,
			deception: this.props.fields.deception,
			intimidation: this.props.fields.intimidation,
			performance: this.props.fields.performance,
			persuasion: this.props.fields.persuasion,
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
		const element = event.target;
		const ext = {...this.state.fields};
		ext[element.title] = element.value;
		this.handleChanges(ext);
		this.setState({
			fields: ext
		});
	};

	stats = [
		{
			name : "Strength",
			field : "str",
			skills : [
				{name: "Saving Throws", field: "str_saving_throws"},
				{name: "Athletics", field: "athletics"}
			]
		},
		{
			name : "Dexterity",
			field : "dex",
			skills : [
				{name: "Saving Throws", field: "dex_saving_throws"},
				{name: "Acrobatics", field: "acrobatics"},
				{name: "Sleight Of Hand", field: "sleight_of_hand"},
				{name: "Stealth", field: "stealth"}
			]
		},
		{
			name : "Constitution",
			field : "con",
			skills : [
				{name: "Saving Throws", field: "con_saving_throws"},
			]
		},
		{
			name : "Intelligence",
			field : "int",
			skills : [
				{name: "Saving Throws", field: "int_saving_throws"},
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
				{name: "Saving Throws", field: "wis_saving_throws"},
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
				{name: "Saving Throws", field: "cha_saving_throws"},
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
			const stat = +this.getModifier(this.state.fields[statistic.field]);
			const statProficient = stat + (+this.state.fields.proficiencyBonus);
			return (
				<div key={index}>
					<Row>
						<Col sm={4} onMouseDown={(e) => e.stopPropagation()}>
							<input type={'number'} className={"form-control"}
								   defaultValue={this.state.fields[statistic.field]} title={statistic.field}
								   onChange={(e) => this.handleFieldChange(e)}/>
							<div className={"center"}><h1 className={"marginless"}>{stat}</h1></div>
							<Form.Label className={"center"}><em>{statistic.name}</em></Form.Label>
						</Col>

						<Col sm={8} onMouseDown={(e) => e.stopPropagation()}>
							{this.getSkills(statistic, stat, statProficient)}
						</Col>
					</Row>
					<hr className={"style-seven"} hidden={index === collection.length - 1}/>
				</div>
			);
		});
	};

	getSkills = (statistic, mod, statProficient) => {
		return _.map(statistic.skills, (skill) => {
			return (
				<Row key={statistic.name+'/'+skill.name}>
					<Col sm={8}>
						<Form.Check label={skill.name} checked={this.state.fields[skill.field]} onChange={(e) => this.handleCheckbox(skill.field)}/>
					</Col>
					<Col sm={4}>
						{this.state.fields[skill.field] ? statProficient : mod}
					</Col>
				</Row>
			);
		});
	};

	render() {
		return (
			<div>
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

			</div>
		);
	}
}

export default Statblock;
