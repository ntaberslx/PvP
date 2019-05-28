import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faTimesCircle);


class Background extends Component {
	onChange = (data) => {this.props.handleChanges(data);};

	state = {

	};

	close = (event) => {
		event.stopPropagation();
		this.props.removeElement(this.props.data.id);
	};

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className={"col-md-10"}>
						<h4>Background</h4>
					</div>
					<div className="col-md-2" onClick={this.close.bind(this)}>
						&times;
					</div>
				</div>
				<div className="row">
					<div className={"col-md-12"} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"} placeholder={"Personality Traits"} />
					</div>
				</div>
			</div>
		);
	}
}

export default Background;
