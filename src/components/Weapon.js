import React, { Component } from 'react';
import Draggable from "react-draggable";

class Weapon extends Component {
	onChange = (data) => {this.props.handleChanges(data);};

	render() {
		return (
			<Draggable>
				<div>
					Weapon
				</div>
			</Draggable>
		);
	}
}

export default Weapon;
