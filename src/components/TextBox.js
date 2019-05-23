import React, { Component } from 'react';
import Draggable from "react-draggable";

class TextBox extends Component {
	onChange = (data) => {this.props.handleChanges(data);};

	render() {
		return (
			<Draggable>
				<div>
					Textbox
				</div>
			</Draggable>
		);
	}
}

export default TextBox;
