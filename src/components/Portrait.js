import React, { Component } from 'react';
import Draggable from "react-draggable";

class Portrait extends Component {
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
