import React, { Component } from 'react';
import {Col, Row, Table} from "react-bootstrap";

class Skills extends Component {

	render() {
		return (
			<div>
				<Row>
					<Col>
						<h3>Skills</h3>
					</Col>
				</Row>

				<hr className={'style-seven'}/>
				<Row>
					<Col sm={6}>
						<Table size={'sm'} striped  onMouseDown={(e) => e.stopPropagation()}>
							<thead>
								<tr>
									<th>Default Ability</th>
									<th>Skill</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Strength</td>
									<td>Athletics</td>
								</tr>
								<tr>
									<td rowSpan={'3'}>Dexterity</td>
									<td>Acrobatics</td>
								</tr>
								<tr>
									<td>Sleight of Hand</td>
								</tr>
								<tr>
									<td>Stealth</td>
								</tr>
								<tr>
									<td rowSpan={'5'}>Intelligence</td>
									<td>Arcana</td>
								</tr>
								<tr>
									<td>History</td>
								</tr>
								<tr>
									<td>Investigation</td>
								</tr>
								<tr>
									<td>Nature</td>
								</tr>
								<tr>
									<td>Religion</td>
								</tr>
							</tbody>
						</Table>
					</Col>
					<Col sm={6}>
						<Table size={'sm'} striped  onMouseDown={(e) => e.stopPropagation()}>
							<thead>
								<tr>
									<th>Default Ability</th>
									<th>Skill</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td rowSpan={'5'}>Wisdom</td>
									<td>Animal Handling</td>
								</tr>
								<tr>
									<td>Insight</td>
								</tr>
								<tr>
									<td>Medicine</td>
								</tr>
								<tr>
									<td>Perception</td>
								</tr>
								<tr>
									<td>Survival</td>
								</tr>
								<tr>
									<td rowSpan={'4'}>Charisma</td>
									<td>Deception</td>
								</tr>
								<tr>
									<td>Intimidation</td>
								</tr>
								<tr>
									<td>Performance</td>
								</tr>
								<tr>
									<td>Persuasion</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col>
						<b>Passive Check:</b> 10 + all modifiers that normally apply to the check.
					</Col>
				</Row>
				<Row>
					<Col>
						<em>If the character has advantage on the check, add 5. For disadvantage, subtract 5.</em>
					</Col>
				</Row>


			</div>
		);
	}
}

export default Skills;
