import React, { Component } from 'react';
import Draggable from "react-draggable";
import Resizable from "re-resizable";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowsAlt);


class Background extends Component {
	render() {
		return (
			<Draggable handle=".handle" defaultPosition={{x: 0, y: 0}} bounds=".canvas">
				<Resizable className="card" defaultSize={{width:'320px', height:'200px'}}>

					<div className="row">
						<div className="col-md-9">
							<h3>Background</h3>
						</div>
						<div className="col-md-3">
							<div id='.handle' className='handle btn btn-link'>
								<FontAwesomeIcon icon="arrows-alt" />
							</div>
						</div>
					</div>

				</Resizable>
			</Draggable>
		);
	}
}

export default Background;
