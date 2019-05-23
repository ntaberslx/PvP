import React, { Component } from 'react';
import Draggable from "react-draggable";

class State extends Component {
	onChange = (data) => {this.props.handleChanges(data);};

	render() {
		return (
			<Draggable>
				<div>
					State
				</div>
			</Draggable>
		);
	}
}

export default State;
