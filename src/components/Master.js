import React, { Component } from 'react';

import Background from '../components/Background';
import Encumbrance from '../components/Encumbrance';
import Personality from '../components/Personality';
import Portrait from '../components/Portrait';
import Statbloc from '../components/Statbloc';
import Spellbook from '../components/Spellbook';
import State from '../components/State';
import TextBox from '../components/TextBox';
import Weapon from '../components/Weapon';
import Encounter from '../components/Encounter'

class Master extends Component {
	onChange = (data) => {this.props.handleChanges(data);};

	removeElement = (id) => {this.props.removeElement(id);};

	getType() {
		const type = this.props.type;
		const data = this.props.data;
		if (type === 'Background')
			return <Background data={this.props.data} handleChanges={this.onChange.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Encumbrance')
			return <Encumbrance data={this.props.data} handleChanges={this.onChange.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Personality')
			return <Personality data={this.props.data} handleChanges={this.onChange.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Portrait')
			return <Portrait data={this.props.data} handleChanges={this.onChange.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Statbloc')
			return <Statbloc data={this.props.data} handleChanges={this.onChange.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Spellbook')
			return <Spellbook data={this.props.data} handleChanges={this.onChange.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'State')
			return <State data={this.props.data} handleChanges={this.onChange.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'TextBox')
			return <TextBox data={this.props.data} handleChanges={this.onChange.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Weapon')
			return <Weapon data={this.props.data} handleChanges={this.onChange.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Encounter')
			return <Encounter data={this.props.data} handleChanges={this.onChange.bind(this)} removeElement={this.removeElement.bind(this)}/>;
	}
	
	render() {
		
		return (
			<div>
				{this.getType()}
			</div>
		);
	}
}

export default Master;
