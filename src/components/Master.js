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

	getType() {
		const type = this.props.type;
		const data = this.props.data;
		if (type === 'Background')
			return <Background data={data} handleChanges={this.onChange.bind(this)}/>;
		if (type === 'Encumbrance')
			return <Encumbrance data={data} handleChanges={this.onChange.bind(this)}/>;
		if (type === 'Personality')
			return <Personality data={data} handleChanges={this.onChange.bind(this)}/>;
		if (type === 'Portrait')
			return <Portrait data={data} handleChanges={this.onChange.bind(this)}/>;
		if (type === 'Statbloc')
			return <Statbloc data={data} handleChanges={this.onChange.bind(this)}/>;
		if (type === 'Spellbook')
			return <Spellbook data={data} handleChanges={this.onChange.bind(this)}/>;
		if (type === 'State')
			return <State data={data} handleChanges={this.onChange.bind(this)}/>;
		if (type === 'TextBox')
			return <TextBox data={data} handleChanges={this.onChange.bind(this)}/>;
		if (type === 'Weapon')
			return <Weapon data={data} handleChanges={this.onChange.bind(this)}/>;
		if (type === 'Encounter')
			return <Encounter data={data} handleChanges={this.onChange.bind(this)}/>;
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
