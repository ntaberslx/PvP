import React, { Component } from 'react';
import Draggable from "react-draggable";

class Portrait extends Component {
	onChange = (data) => {this.props.handleChanges(data);};

	render() {
		return (
			<Draggable>
				<div>
					Portrait
				</div>
			</Draggable>
		);
	}
}

export default Portrait;
