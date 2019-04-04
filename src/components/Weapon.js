import React, { Component } from 'react';
import Draggable from "react-draggable";

class Weapon extends Component {
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
