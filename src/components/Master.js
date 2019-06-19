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
import Encounter from '../components/Encounter';
import {Container, Row, Col} from 'react-bootstrap';

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
		if (type === 'Background')
			return <Background fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Encumbrance')
			return <Encumbrance fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Personality')
			return <Personality fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Portrait')
			return <Portrait fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Statbloc')
			return <Statbloc fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Spellbook')
			return <Spellbook fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'State')
			return <State fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'TextBox')
			return <TextBox fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Weapon')
			return <Weapon fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
		if (type === 'Encounter')
			return <Encounter fields={this.props.fields} handleChanges={this.handleChanges.bind(this)} removeElement={this.removeElement.bind(this)}/>;
	}
	
	render() {
		return (
			<Container>
				<Row>
					<Col md={10}>
						<h4>{this.props.type}</h4>
					</Col>
					<Col md={2} onClick={this.close.bind(this)}>
						&times;
					</Col>
				</Row>

				{this.getType()}
			</Container>
		);
	}
}

export default Master;
