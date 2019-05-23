import React, { Component } from 'react';
import Draggable from "react-draggable";

class Statbloc extends Component {
	onChange = (data) => {this.props.handleChanges(data);};

	render() {
		return (
			<Draggable>
				<div>
					SmallStats
				</div>
			</Draggable>
		);
	}
}

export default Statbloc;
