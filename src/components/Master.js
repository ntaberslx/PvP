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
		console.log(this.props);
		if (this.props.type === 'Background') return <Background/>;
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
