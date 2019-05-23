import React, { Component } from 'react';
import Draggable from "react-draggable";

class BigStats extends Component {
	onChange = (data) => {this.props.handleChanges(data);};

	render() {
		return (
			<Draggable>
				<div>
					BigStats
				</div>
			</Draggable>
		);
	}
}

export default BigStats;
