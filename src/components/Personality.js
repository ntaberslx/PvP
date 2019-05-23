import React, { Component } from 'react';
import Draggable from "react-draggable";

class Personality extends Component {
	onChange = (data) => {this.props.handleChanges(data);};

	render() {
		return (
			<Draggable>
				<div>
					Personality
				</div>
			</Draggable>
		);
	}
}

export default Personality;
