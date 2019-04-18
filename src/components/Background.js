import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faTimesCircle);


class Background extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="row-fluid">
					<div className="col-md-8">
						This is a background component.
					</div>
					<div className="col-md-4">
						<FontAwesomeIcon icon="times-circle" />
					</div>

				</div>
			</div>
		);
	}
}

export default Background;
