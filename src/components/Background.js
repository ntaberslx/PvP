import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faTimesCircle);


class Background extends Component {
	state = {
		fields: {
			traits: this.props.fields.traits ? this.props.fields.traits : '',
			ideals: this.props.fields.ideals ? this.props.fields.ideals : '',
			bonds: this.props.fields.bonds ? this.props.fields.bonds : '',
			flaws: this.props.fields.flaws ? this.props.fields.flaws : ''
		}
	};

	handleChanges = (fields) => {this.props.handleChanges(fields)};

	close = (event) => {
		event.stopPropagation();
		this.props.removeElement(this.props.id);
	};

	handleFieldChange = (event) =>{
		const element = event.target;
		const ext = {...this.state.fields};
		ext[element.title] = element.value;
		this.handleChanges(ext);
		this.setState(prevState => {
				return {
					fields: ext
				};
			}
		);
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
						<input type={'text'} className={"form-control"} placeholder={"Personality Traits"} defaultValue={this.state.fields.traits} title='traits' onChange={(e) => this.handleFieldChange(e)}/>
					</div>
					<div className={"col-md-12"} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"} placeholder={"Ideals"} defaultValue={this.state.fields.ideals} title='ideals' onChange={(e) => this.handleFieldChange(e)}/>
					</div>
					<div className={"col-md-12"} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"} placeholder={"Bonds"} defaultValue={this.state.fields.bonds} title='bonds' onChange={(e) => this.handleFieldChange(e)}/>
					</div>
					<div className={"col-md-12"} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"} placeholder={"Flaws"} defaultValue={this.state.fields.flaws} title='flaws' onChange={(e) => this.handleFieldChange(e)}/>
					</div>
				</div>
			</div>
		);
	}
}

export default Background;
