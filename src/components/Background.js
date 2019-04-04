import React, { Component } from 'react';
import Draggable from "react-draggable";
import Resizable from "re-resizable";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faTimesCircle);


class Background extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-md-8">

				</div>
				<div className="col-md-4">
					<FontAwesomeIcon icon="times-circle" />
				</div>

			</div>
		);
	}
}

export default Background;
