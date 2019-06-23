import React, { Component } from 'react';
import {Col, Row, InputGroup} from "react-bootstrap";

class Weapon extends Component {
	state = {
		fields: {
			name: this.props.fields.name,
			attackBonus: this.props.fields.attackBonus,
			damage: this.props.fields.damage,
			modifier: this.props.fields.modifier,
			type: this.props.fields.type
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
			<Row>
				<Col sm={12} onMouseDown={(e) => e.stopPropagation()}>
					<InputGroup className="mb-3">
						<input type={'text'} className={"form-control"} placeholder={"Name"}
							   defaultValue={this.state.fields.name} title='name'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<input type={'text'} className={"form-control"} placeholder={"Type"}
							   defaultValue={this.state.fields.type} title='type'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<input type={'text'} className={"form-control"} placeholder={"Bonus"}
							   defaultValue={this.state.fields.attackBonus} title='attackBonus'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<input type={'text'} className={"form-control"} placeholder={"Damage"}
							   defaultValue={this.state.fields.damage} title='damage'
							   onChange={(e) => this.handleFieldChange(e)}/>
						<InputGroup.Prepend>
							<InputGroup.Text>+</InputGroup.Text>
						</InputGroup.Prepend>
						<input type={'text'} className={"form-control"} placeholder={"Modifier"}
							   defaultValue={this.state.fields.modifier} title='modifier'
							   onChange={(e) => this.handleFieldChange(e)}/>
					</InputGroup>
				</Col>
			</Row>
		);
	}
}

export default Weapon;
