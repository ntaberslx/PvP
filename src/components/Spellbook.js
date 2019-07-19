import React, { Component } from 'react';
import {Button, Col, Table, Row} from "react-bootstrap";
import _ from 'lodash';
import uuid from 'uuid';

class Spellbook extends Component {
	state = {
		fields: {
			spells : this.props.fields.spells ? this.props.fields.spells : [],
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

	addSpell = () => {
		let name, level, text;
		name = [document.getElementById('Name').value, document.getElementById('Name').value = ''][0];
		level = [document.getElementById('Level').value, document.getElementById('Level').value = ''][0];
		text = [document.getElementById('Text').value, document.getElementById('Text').value = ''][0];
		const ext = [...this.state.fields.spells], extFields = {...this.state.fields};
		ext.push({name, level, text, id: uuid.v4()});
		ext.sort((a,b)=>{
			return a.level - b.level;
		});
		extFields.spells = ext;

		this.handleChanges(extFields);
		this.setState({
			fields: extFields
		});
	};

	removeSpell = (id) => {
		const extFields = {...this.state.fields};
		extFields.spells = this.state.fields.spells.filter(spell => spell.id !== id);
		this.handleChanges(extFields);
		this.setState({
			fields: extFields
		});
	};

	getSpells = () => {
		return _.map(this.state.fields.spells, (s, i) => {
			return (
				<tr>
					<td>
						{s.level}
					</td>
					<td>
						{s.name}
					</td>
					<td>
						{s.text}
					</td>
					<td>
						<Button variant={'dark'} size={"sm"} onClick={(e) => this.removeSpell(s.id)} onChange={(e) => this.handleFieldChange(e)}>
							x
						</Button>
					</td>
				</tr>
			)
		});
	};

	render() {
		return (
			<div>
				<Row>
					<Col md={3} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"} placeholder={"Name"}
							   defaultValue={this.state.fields.ability} id='Name'
							   onChange={(e) => this.handleFieldChange(e)}/>
					</Col>
					<Col md={3} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"} placeholder={"Level"}
							   defaultValue={this.state.fields.ability} id='Level'
							   onChange={(e) => this.handleFieldChange(e)}/>
					</Col>
					<Col md={3} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"} placeholder={"Text"}
							   defaultValue={this.state.fields.ability} id='Text'
							   onChange={(e) => this.handleFieldChange(e)}/>
					</Col>
					<Col md={3}>
						<Button variant={'dark'} onClick={this.addSpell.bind(this)}>
							Add
						</Button>
					</Col>
				</Row>
				<Table size={'sm'} striped>
					<thead>
						<th>
							Level
						</th>
						<th>
							Name
						</th>
						<th>
							Text
						</th>
					</thead>

					{this.getSpells()}
				</Table>
			</div>
		);
	}
}

export default Spellbook;
