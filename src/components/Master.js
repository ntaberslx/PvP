import React, { Component } from 'react';

import Background from '../components/Background';
import BigStats from '../components/BigStats';
import Encumbrance from '../components/Encumbrance';
import Personality from '../components/Personality';
import Portrait from '../components/Portrait';
import SmallStats from '../components/SmallStats';
import Spellbook from '../components/Spellbook';
import State from '../components/State';
import TextBox from '../components/TextBox';
import Weapon from '../components/Weapon';
import Encounter from '../components/Encounter'

class Master extends Component {
	getType() {
		const type = this.props.type;
		const data = this.props.data;
		if (type === 'Background')
			return <Background data={data}/>;
		if (type === 'BigStats')
			return <BigStats data={data}/>;
		if (type === 'Encumbrance')
			return <Encumbrance data={data}/>;
		if (type === 'Personality')
			return <Personality data={data}/>;
		if (type === 'Portrait')
			return <Portrait data={data}/>;
		if (type === 'SmallStats')
			return <SmallStats data={data}/>;
		if (type === 'Spellbook')
			return <Spellbook data={data}/>;
		if (type === 'State')
			return <State data={data}/>;
		if (type === 'TextBox')
			return <TextBox data={data}/>;
		if (type === 'Weapon')
			return <Weapon data={data}/>;
		if (type === 'Encounter')
			return <Encounter data={data}/>;
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
