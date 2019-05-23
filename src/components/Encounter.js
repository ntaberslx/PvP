import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Encounter extends Component {
	onChange = (data) => {this.props.handleChanges(data);};

	render() {
		return (
			<Draggable>
				<div>
					Encounter
				</div>
			</Draggable>
		);
	}
}

export default Encounter;
