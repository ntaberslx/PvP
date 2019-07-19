import React, { Component } from 'react';
import {Button, Col, Row, Table} from "react-bootstrap";

class Spellcasting extends Component {
	state = {
		fields: {
			spellcastingClass: this.props.fields.spellcastingClass,
			ability: this.props.fields.ability,
			spellSaveDC: this.props.fields.spellSaveDC,
			spellAttackBonus: this.props.fields.spellAttackBonus,
			cantrips: this.props.fields.cantrips,
			levelOne: this.props.fields.levelOne ? this.props.fields.levelOne : 0,
			levelTwo: this.props.fields.levelTwo ? this.props.fields.levelTwo : 0,
			levelThree: this.props.fields.levelThree ? this.props.fields.levelThree : 0,
			levelFour: this.props.fields.levelFour ? this.props.fields.levelFour : 0,
			levelFive: this.props.fields.levelFive ? this.props.fields.levelFive : 0,
			levelSix: this.props.fields.levelSix ? this.props.fields.levelSix : 0,
			levelSeven: this.props.fields.levelSeven ? this.props.fields.levelSeven : 0,
			levelEight: this.props.fields.levelEight ? this.props.fields.levelEight : 0,
			levelNine: this.props.fields.levelNine ? this.props.fields.levelNine : 0,
			levelOneCurrent: this.props.fields.levelOneCurrent ? this.props.fields.levelOneCurrent : 0,
			levelTwoCurrent: this.props.fields.levelTwoCurrent ? this.props.fields.levelTwoCurrent : 0,
			levelThreeCurrent: this.props.fields.levelThreeCurrent ? this.props.fields.levelThreeCurrent : 0,
			levelFourCurrent: this.props.fields.levelFourCurrent ? this.props.fields.levelFourCurrent : 0,
			levelFiveCurrent: this.props.fields.levelFiveCurrent ? this.props.fields.levelFiveCurrent : 0,
			levelSixCurrent: this.props.fields.levelSixCurrent ? this.props.fields.levelSixCurrent : 0,
			levelSevenCurrent: this.props.fields.levelSevenCurrent ? this.props.fields.levelSevenCurrent : 0,
			levelEightCurrent: this.props.fields.levelEightCurrent ? this.props.fields.levelEightCurrent : 0,
			levelNineCurrent: this.props.fields.levelNineCurrent ? this.props.fields.levelNineCurrent : 0,
		}
	};

	handleChanges = (fields) => {this.props.handleChanges(fields)};

	handleSlots = (field, iterator) => {
		const ext = {...this.state.fields};
		ext[field] += iterator;
		this.handleChanges(ext);
		this.setState({
			fields: ext
		});
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

	rest = () => {
		const ext = {
			...this.state.fields,
			levelOneCurrent: this.state.fields.levelOne,
			levelTwoCurrent: this.state.fields.levelTwo,
			levelThreeCurrent: this.state.fields.levelThree,
			levelFourCurrent: this.state.fields.levelFour,
			levelFiveCurrent: this.state.fields.levelFive,
			levelSixCurrent: this.state.fields.levelSix,
			levelSevenCurrent: this.state.fields.levelSeven,
			levelEightCurrent: this.state.fields.levelEight,
			levelNineCurrent: this.state.fields.levelNine,
		};
		this.handleChanges(ext);
		this.setState({
			fields: ext
		});
	};

	decrement = (field) => {
		if (this.state.fields[field] !== 0){
			const ext = {...this.state.fields};
			ext[field] = +this.state.fields[field] - 1;
			this.handleChanges(ext);
			this.setState({
				fields: ext
			});
		}
	};

	render() {
		return (
			<div>
				<Row>
					<Col md={6} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"} placeholder={"Class"}
							   defaultValue={this.state.fields.spellcastingClass} title='spellcastingClass'
							   onChange={(e) => this.handleFieldChange(e)}/>
					</Col>
					<Col md={6} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"} placeholder={"Ability"}
							   defaultValue={this.state.fields.ability} title='ability'
							   onChange={(e) => this.handleFieldChange(e)}/>
					</Col>
				</Row>
				<Row>
					<Col md={4} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"} placeholder={"Save DC"}
							   defaultValue={this.state.fields.spellSaveDC} title='spellSaveDC'
							   onChange={(e) => this.handleFieldChange(e)}/>
					</Col>
					<Col md={4} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"} placeholder={"Bonus"}
							   defaultValue={this.state.fields.spellAttackBonus} title='spellAttackBonus'
							   onChange={(e) => this.handleFieldChange(e)}/>
					</Col>
					<Col md={4} onMouseDown={(e) => e.stopPropagation()}>
						<input type={'text'} className={"form-control"} placeholder={"Cantrips"}
							   defaultValue={this.state.fields.cantrips} title='cantrips'
							   onChange={(e) => this.handleFieldChange(e)}/>
					</Col>
				</Row>
				<Row>
					<Table size={'sm'} striped>
						<thead>
						<tr>
							<th>Spell Level</th>
							<th>Current</th>
							<th>Max</th>
							<th>Edit</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>First</td>
							<td>
								<button onClick={(e)=>this.decrement('levelOneCurrent')} onMouseDown={(e) => e.stopPropagation()} id={'levelOneCurrent'}>
									{this.state.fields.levelOneCurrent}
								</button>
							</td>
							<td>{this.state.fields.levelOne}</td>
							<td onMouseDown={(e) => e.stopPropagation()}>
								<button onClick={(e) => this.handleSlots('levelOne', 1)}>
									/\
								</button>
								<button onClick={(e) => this.handleSlots('levelOne', -1)} >
									\/
								</button>
							</td>
						</tr>
						<tr>
							<td>Second</td>
							<td>
								<button onClick={(e)=>this.decrement('levelTwoCurrent')} onMouseDown={(e) => e.stopPropagation()} id={'levelTwoCurrent'}>
									{this.state.fields.levelTwoCurrent}
								</button>
							</td>
							<td>{this.state.fields.levelTwo}</td>
							<td onMouseDown={(e) => e.stopPropagation()}>
								<button onClick={(e) => this.handleSlots('levelTwo', 1)}>
									/\
								</button>
								<button onClick={(e) => this.handleSlots('levelTwo', -1)} >
									\/
								</button>
							</td>
						</tr>
						<tr>
							<td>Third</td>
							<td>
								<button onClick={(e)=>this.decrement('levelThreeCurrent')} onMouseDown={(e) => e.stopPropagation()} id={'levelThreeCurrent'}>
									{this.state.fields.levelThreeCurrent}
								</button>
							</td>
							<td>{this.state.fields.levelThree}</td>
							<td onMouseDown={(e) => e.stopPropagation()}>
								<button onClick={(e) => this.handleSlots('levelThree', 1)}>
									/\
								</button>
								<button onClick={(e) => this.handleSlots('levelThree', -1)} >
									\/
								</button>
							</td>
						</tr>
						<tr>
							<td>Fourth</td>
							<td>
								<button onClick={(e)=>this.decrement('levelFourCurrent')} onMouseDown={(e) => e.stopPropagation()} id={'levelFourCurrent'}>
									{this.state.fields.levelFourCurrent}
								</button>
							</td>
							<td>{this.state.fields.levelFour}</td>
							<td onMouseDown={(e) => e.stopPropagation()}>
								<button onClick={(e) => this.handleSlots('levelFour', 1)}>
									/\
								</button>
								<button onClick={(e) => this.handleSlots('levelFour', -1)} >
									\/
								</button>
							</td>
						</tr>
						<tr>
							<td>Fifth</td>
							<td>
								<button onClick={(e)=>this.decrement('levelFiveCurrent')} onMouseDown={(e) => e.stopPropagation()} id={'levelFiveCurrent'}>
									{this.state.fields.levelFiveCurrent}
								</button>
							</td>
							<td>{this.state.fields.levelFive}</td>
							<td onMouseDown={(e) => e.stopPropagation()}>
								<button onClick={(e) => this.handleSlots('levelFive', 1)}>
									/\
								</button>
								<button onClick={(e) => this.handleSlots('levelFive', -1)} >
									\/
								</button>
							</td>
						</tr>
						<tr>
							<td>Sixth</td>
							<td>
								<button onClick={(e)=>this.decrement('levelSixCurrent')} onMouseDown={(e) => e.stopPropagation()} id={'levelSixCurrent'}>
									{this.state.fields.levelSixCurrent}
								</button>
							</td>
							<td>{this.state.fields.levelSix}</td>
							<td onMouseDown={(e) => e.stopPropagation()}>
								<button onClick={(e) => this.handleSlots('levelSix', 1)}>
									/\
								</button>
								<button onClick={(e) => this.handleSlots('levelSix', -1)} >
									\/
								</button>
							</td>
						</tr>
						<tr>
							<td>Seventh</td>
							<td>
								<button onClick={(e)=>this.decrement('levelSevenCurrent')} onMouseDown={(e) => e.stopPropagation()} id={'levelSevenCurrent'}>
									{this.state.fields.levelSevenCurrent}
								</button>
							</td>
							<td>{this.state.fields.levelSeven}</td>
							<td onMouseDown={(e) => e.stopPropagation()}>
								<button onClick={(e) => this.handleSlots('levelSeven', 1)}>
									/\
								</button>
								<button onClick={(e) => this.handleSlots('levelSeven', -1)} >
									\/
								</button>
							</td>
						</tr>
						<tr>
							<td>Eighth</td>
							<td>
								<button onClick={(e)=>this.decrement('levelEightCurrent')} onMouseDown={(e) => e.stopPropagation()} id={'levelEightCurrent'}>
									{this.state.fields.levelEightCurrent}
								</button>
							</td>
							<td>{this.state.fields.levelEight}</td>
							<td onMouseDown={(e) => e.stopPropagation()}>
								<button onClick={(e) => this.handleSlots('levelEight', 1)}>
									/\
								</button>
								<button onClick={(e) => this.handleSlots('levelEight', -1)} >
									\/
								</button>
							</td>
						</tr>
						<tr>
							<td>Ninth</td>
							<td>
								<button onClick={(e)=>this.decrement('levelNineCurrent')} onMouseDown={(e) => e.stopPropagation()} id={'levelNineCurrent'}>
									{this.state.fields.levelNineCurrent}
								</button>
							</td>
							<td>{this.state.fields.levelNine}</td>
							<td onMouseDown={(e) => e.stopPropagation()}>
								<button onClick={(e) => this.handleSlots('levelNine', 1)}>
									/\
								</button>
								<button onClick={(e) => this.handleSlots('levelNine', -1)} >
									\/
								</button>
							</td>
						</tr>
						</tbody>
					</Table>
				</Row>
				<Row>
					<Col className={"text-center"} onMouseDown={(e) => e.stopPropagation()}>
						<Button variant="dark" onClick={this.rest}>Reset</Button>
					</Col>
				</Row>
			</div>

		);
	}
}

export default Spellcasting;
