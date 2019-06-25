import React, { Component } from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ReactModal from 'react-modal';
import {SwatchesPicker} from "react-color";
import Button from "react-bootstrap/Button";

class CoinPouch extends Component {
	state = {
		fields: {
			copper: this.props.fields.copper,
			silver: this.props.fields.silver,
			electrum: this.props.fields.electrum,
			gold: this.props.fields.gold,
			platinum: this.props.fields.platinum
		}
	};

	handleChanges = (fields) => {this.props.handleChanges(fields)};

	handleCurrencyChange = (event) => {
		this.handleFieldChange(event);
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

	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

	render() {
		return (
			<Row>
				<Col md={12} onMouseDown={(e) => e.stopPropagation()}>
					<input type={'number'} className={"form-control"} placeholder={"Copper"}
						   defaultValue={this.state.fields.copper} title='copper'
						   onChange={(e) => this.handleCurrencyChange(e)}/>
				</Col>
				<Col md={12} onMouseDown={(e) => e.stopPropagation()}>
					<input type={'number'} className={"form-control"} placeholder={"Silver"}
						   defaultValue={this.state.fields.silver} title='silver'
						   onChange={(e) => this.handleCurrencyChange(e)}/>
				</Col>
				<Col md={12} onMouseDown={(e) => e.stopPropagation()}>
					<input type={'number'} className={"form-control"} placeholder={"Electrum"}
						   defaultValue={this.state.fields.electrum} title='electrum'
						   onChange={(e) => this.handleCurrencyChange(e)}/>
				</Col>
				<Col md={12} onMouseDown={(e) => e.stopPropagation()}>
					<input type={'number'} className={"form-control"} placeholder={"Gold"}
						   defaultValue={this.state.fields.gold} title='gold'
						   onChange={(e) => this.handleCurrencyChange(e)}/>
				</Col>
				<Col md={12} onMouseDown={(e) => e.stopPropagation()}>
					<input type={'number'} className={"form-control"} placeholder={"Platinum"}
						   defaultValue={this.state.fields.platinum} title='platinum'
						   onChange={(e) => this.handleCurrencyChange(e)}/>
				</Col>
				<Col>
					<Button variant={"dark"} onClick={this.handleOpenModal}>Exchange Rates</Button>
				</Col>

				<ReactModal
					isOpen={this.state.showModal}
					contentLabel="Settings"
					style={{content : {
							top                   : '50%',
							left                  : '50%',
							right                 : 'auto',
							bottom                : 'auto',
							marginRight           : '-50%',
							transform             : 'translate(-50%, -50%)'
						}}}>
					<Container>
						<Row>
							<button onClick={this.handleCloseModal}>Close Modal</button>
						</Row>
						<Row>
							<table className="table table-bordered table-striped table-responsive-xs">
								<thead>
								<tr>
									<th>Coin</th>
									<th>cp</th>
									<th>sp</th>
									<th>ep</th>
									<th>gp</th>
									<th>pp</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>Copper (cp)</td>
									<td>1</td>
									<td>1/10</td>
									<td>1/50</td>
									<td>1/100</td>
									<td>1/1,000</td>
								</tr>
								<tr>
									<td>Silver (sp)</td>
									<td>10</td>
									<td>1</td>
									<td>1/5</td>
									<td>1/10</td>
									<td>1/100</td>
								</tr>
								<tr>
									<td>Electrum (ep)</td>
									<td>50</td>
									<td>5</td>
									<td>1</td>
									<td>1/2</td>
									<td>1/20</td>
								</tr>
								<tr>
									<td>Gold (gp)</td>
									<td>100</td>
									<td>10</td>
									<td>2</td>
									<td>1</td>
									<td>1/10</td>
								</tr>
								<tr>
									<td>Platinum (pp)</td>
									<td>1,000</td>
									<td>100</td>
									<td>20</td>
									<td>10</td>
									<td>1</td>
								</tr>
								</tbody>
							</table>
						</Row>
					</Container>
				</ReactModal>
			</Row>
		);
	}
}

export default CoinPouch;
