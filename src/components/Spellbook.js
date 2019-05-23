import React, { Component } from 'react';
import Draggable from "react-draggable";

class Spellbook extends Component {
	onChange = (data) => {this.props.handleChanges(data);};

	render() {
		return (
			<Draggable>
				<div>
					Spellbook
				</div>
			</Draggable>
		);
	}
}

export default Spellbook;
