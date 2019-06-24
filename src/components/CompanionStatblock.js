import React, { Component } from 'react';
import {Col, Row, InputGroup, Form} from "react-bootstrap";
import _ from "lodash";
import uuid from 'uuid';

class Statblock extends Component {
	state = {
		fields: {
			name: this.props.fields.name,
			type: this.props.fields.type,
			armorClass: this.props.fields.armorClass,
			speed: this.props.fields.speed,
			hpCurrent: this.props.fields.hpCurrent,
			hpMax: this.props.fields.hpMax,
			skills: this.props.fields.skills,
			senses: this.props.fields.senses,
			features: this.props.fields.features,
			actions: this.props.fields.actions,

			str: this.props.fields.str ? this.props.fields.str : 10,
			dex: this.props.fields.dex ? this.props.fields.dex : 10,
			con: this.props.fields.con ? this.props.fields.con : 10,
			int: this.props.fields.int ? this.props.fields.int : 10,
			wis: this.props.fields.wis ? this.props.fields.wis : 10,
			cha: this.props.fields.cha ? this.props.fields.cha : 10,
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

	getModifier = (stat) => {
		return Math.floor((stat - 10) / 2) > 0 ? '+' + Math.floor((stat - 10) / 2) : Math.floor((stat - 10) / 2);
	};

	render() {
		return (
			<div>
				<Row onMouseDown={(e) => e.stopPropagation()}  className={'four-padding'}>
					<input type={'text'} className={"form-control"} placeholder={"Name"}
						   defaultValue={this.state.fields.name} title='name'
						   onChange={(e) => this.handleFieldChange(e)}/>
				</Row>
				<Row onMouseDown={(e) => e.stopPropagation()}  className={'four-padding'}>
					<input type={'text'} className={"form-control"} placeholder={"Type and Alignment"}
						   defaultValue={this.state.fields.type} title='type'
						   onChange={(e) => this.handleFieldChange(e)}/>
				</Row>
				<hr className={"style-eight"}/>
				<Row>
					<Col sm={6} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'number'} className={"form-control"} placeholder={"Armor Class"}
							   defaultValue={this.state.fields.armorClass} title='armorClass'
							   onChange={(e) => this.handleFieldChange(e)}/>
					</Col>
					<Col sm={6} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"} placeholder={"Speed"}
							   defaultValue={this.state.fields.speed} title='speed'
							   onChange={(e) => this.handleFieldChange(e)}/>
					</Col>
				</Row>
				<Row>
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
				</Row>
				<Row>
					<Col sm={2} className={'four-padding'} onMouseDown={(e) => e.stopPropagation()}>
						Str
						<input type={'number'} className={"form-control"}
							   defaultValue={this.state.fields.str} title='str'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<h3>{this.getModifier(+this.state.fields.str)}</h3>
					</Col>
					<Col sm={2} className={'four-padding'} onMouseDown={(e) => e.stopPropagation()}>
						Dex
						<input type={'number'} className={"form-control"}
							   defaultValue={this.state.fields.dex} title='dex'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<h3>{this.getModifier(+this.state.fields.dex)}</h3>
					</Col>
					<Col sm={2} className={'four-padding'} onMouseDown={(e) => e.stopPropagation()}>
						Con
						<input type={'number'} className={"form-control"}
							   defaultValue={this.state.fields.con} title='con'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<h3>{this.getModifier(+this.state.fields.con)}</h3>
					</Col>
					<Col sm={2} className={'four-padding'} onMouseDown={(e) => e.stopPropagation()}>
						Int
						<input type={'number'} className={"form-control"}
							   defaultValue={this.state.fields.int} title='int'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<h3>{this.getModifier(+this.state.fields.int)}</h3>
					</Col>
					<Col sm={2} className={'four-padding'} onMouseDown={(e) => e.stopPropagation()}>
						Wis
						<input type={'number'} className={"form-control"}
							   defaultValue={this.state.fields.wis} title='wis'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<h3>{this.getModifier(+this.state.fields.wis)}</h3>
					</Col>
					<Col sm={2} className={'four-padding'} onMouseDown={(e) => e.stopPropagation()}>
						Cha
						<input type={'number'} className={"form-control"}
							   defaultValue={this.state.fields.cha} title='cha'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<h3>{this.getModifier(+this.state.fields.cha)}</h3>
					</Col>
				</Row>
				<Row onMouseDown={(e) => e.stopPropagation()}  className={'four-padding'}>
					<input type={'text'} className={"form-control"} placeholder={"Skills"}
						   defaultValue={this.state.fields.skills} title='skills'
						   onChange={(e) => this.handleFieldChange(e)}/>
				</Row>
				<Row onMouseDown={(e) => e.stopPropagation()}  className={'four-padding'}>
					<input type={'text'} className={"form-control"} placeholder={"Senses"}
						   defaultValue={this.state.fields.senses} title='senses'
						   onChange={(e) => this.handleFieldChange(e)}/>
				</Row>
				<Row onMouseDown={(e) => e.stopPropagation()}  className={'four-padding'}>
					<Form.Control as="textarea" rows="3" title='features' placeholder={"Features"}
								  defaultValue={this.state.fields.features}
								  onChange={(e) => this.handleFieldChange(e)}/>
				</Row>
				<Row onMouseDown={(e) => e.stopPropagation()}  className={'four-padding'}>
					<Form.Control as="textarea" rows="3" title='actions' placeholder={"Actions"}
								  defaultValue={this.state.fields.actions}
								  onChange={(e) => this.handleFieldChange(e)}/>
				</Row>
			</div>
		);
	}
}

export default Statblock;
