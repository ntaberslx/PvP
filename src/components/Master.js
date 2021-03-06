import React, { Component } from 'react';

import Background from '../components/Background';
import Personality from '../components/Personality';
import Portrait from '../components/Portrait';
import Statblock from '../components/Statblock';
import Spellbook from '../components/Spellbook';
import State from '../components/State';
import TextBox from '../components/TextBox';
import Weapon from '../components/Weapon';
import Encounter from '../components/Encounter';
import CompanionStatblock from "./CompanionStatblock";
import CoinPouch from './CoinPouch';
import Skills from './Skills';
import Actions from './Actions';
import Conditions from './Conditions';
import Spellcasting from './Spellcasting';
import Equipment from "./Equipment";

import {Container} from 'react-bootstrap';

class Master extends Component {
	handleChanges = (fields) => {
		const ext = {
			id: this.props.id,
			type: this.props.type,
			fields
		};
		this.props.handleChanges(ext);
	};

	removeElement = (id) => {this.props.removeElement(id);};

	close = (event) => {
		event.stopPropagation();
		this.props.removeElement(this.props.id);
	};

	getType() {
		const type = this.props.type;
		if (type === 'Basics')
			return <Background fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Personality')
			return <Personality fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Portrait')
			return <Portrait fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Statblock')
			return <Statblock fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Companion Statblock')
			return <CompanionStatblock fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Spellbook')
			return <Spellbook fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'State')
			return <State fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Text Box')
			return <TextBox fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Coin Pouch')
			return <CoinPouch fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Weapon')
			return <Weapon fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Encounter')
			return <Encounter fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Spellcasting')
			return <Spellcasting fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Equipment')
			return <Equipment fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;

		if (type === 'Skills')
			return <Skills/>;
		if (type === 'Actions')
			return <Actions/>;
		if (type === 'Conditions')
			return <Conditions/>;
	}
	
	render() {
		return (
			<Container className={"marginally-top"}>
				<button type="button" className="close" aria-label="Close" onClick={this.close}>
					<span aria-hidden="true">&times;</span>
				</button>

				{this.getType()}
			</Container>
		);
	}
}

export default Master;
