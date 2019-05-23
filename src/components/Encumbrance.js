import React, { Component } from 'react';
import Draggable from "react-draggable";

class Encumbrance extends Component {
	onChange = (data) => {this.props.handleChanges(data);};

	render() {
		return (
			<Draggable>
				<div>
					Encumbrance
				</div>
			</Draggable>
		);
	}
}

export default Encumbrance;
