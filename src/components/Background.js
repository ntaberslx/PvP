import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faTimesCircle);


class Background extends Component {
	onChange = (data) => {this.props.handleChanges(data);};

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-8">
						This is a background component.
					</div>
					<div className="col-md-4">
						<FontAwesomeIcon icon="times-circle"/>
					</div>

				</div>
			</div>
		);
	}
}

export default Background;
