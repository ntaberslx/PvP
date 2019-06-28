import React, { Component } from 'react';
import {Col, Row, Table} from "react-bootstrap";

class Skills extends Component {

	render() {
		return (
			<div>
				<Row>
					<Col>
						<h3>Conditions</h3>
					</Col>
				</Row>

				<hr className={'style-seven'}/>
				<Row>
					<Col sm={6}>
						<h4>
							Blinded
						</h4>
						<ul>
							<li>
								A blinded creature can't see and automatically fails any ability check that requires sight.
							</li>
							<li>
								Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.
							</li>
						</ul>

						<h4>
							Deafened
						</h4>
						<ul>
							<li>
								A deafened creature can't hear and automatically fails any ability check that requires hearing.
							</li>
						</ul>

						<h4>
							Grappled
						</h4>
						<ul>
							<li>
								A grappled creature's speed becomes 0, and it's can't benefit from any bonus to its speed.
							</li>
							<li>
								The condition ends if the grappler is incapacitated (see "incapacitated" condition).
							</li>
							<li>
								The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the <em>thunderwave</em> spell.
							</li>
						</ul>
						<h4>
							Invisible
						</h4>
						<ul>
							<li>
								An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured. The creature's location can be detected by any noise, odor, or tracks it leaves.
							</li>
							<li>
								Attack rolls against the creature have disadvantage, and the creature's attack rolls have advantage.
							</li>
						</ul>
						<h4>
							Petrified
						</h4>
						<ul>
							<li>
								A petrified creature is transformed, along with any non-magical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging.
							</li>
							<li>
								The creature is incapacitated (see "incapacitated" condition), can't move or speak, and is unaware of its surroundings.
							</li>
							<li>
								Attack rolls against the creature have advantage.
							</li>
							<li>
								The creature automatically fails Strength and Dexterity saving throws.
							</li>
							<li>
								The creature has resistance to all damage.
							</li>
							<li>
								The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized.
							</li>
						</ul>
						<h4>Exhaustion</h4>
						<Table>
							<thead>
								<th>
									Level
								</th>
								<th>
									Effect
								</th>
							</thead>
							<tbody>
								<tr>
									<td>
										1
									</td>
									<td>
										Disadvantage on ability checks.
									</td>
								</tr>
								<tr>
									<td>
										2
									</td>
									<td>
										Speed halved.
									</td>
								</tr>
								<tr>
									<td>
										3
									</td>
									<td>
										Disadvantage on attack rolls and saving throws.
									</td>
								</tr>
								<tr>
									<td>
										4
									</td>
									<td>
										Hit point maximum halved.
									</td>
								</tr>
								<tr>
									<td>
										5
									</td>
									<td>
										Speed reduced to 0.
									</td>
								</tr>
								<tr>
									<td>
										6
									</td>
									<td>
										Death.
									</td>
								</tr>
							</tbody>
						</Table>
					</Col>

					<Col sm={6}>
						<h4>
							Charmed
						</h4>
						<ul>
							<li>
								A charmed creature can't attack the charmer or target the charmer with harmful abilities or magical effects.
							</li>
							<li>
								The charmer has advantage on any ability check to interact socially with the creature.
							</li>
						</ul>

						<h4>
							Frightened
						</h4>
						<ul>
							<li>
								A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.
							</li>
							<li>
								The creature can't willingly move closer to the source of its fear.
							</li>
						</ul>
						<h4>
							Incapacitated
						</h4>
						<ul>
							<li>
								An incapacitated creature can't take actions, bonus actions, or reactions.
							</li>
						</ul>
						<h4>
							Paralyzed
						</h4>
						<ul>
							<li>
								A paralyzed creature is incapacitated (see "incapacitated" condition) and can't move or speak.
							</li>
							<li>
								The creature automatically fails Strength and Dexterity saving throws.
							</li>
							<li>
								Attack rolls against the creature have advantage.
							</li>
							<li>
								Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.
							</li>
						</ul>
						<h4>
							Poisoned
						</h4>
						<ul>
							<li>
								A poisoned creature has disadvantage on attack rolls and ability checks.
							</li>
						</ul>
						<h4>
							Prone
						</h4>
						<ul>
							<li>
								A prone creature's only movement option is to crawl, unless it stands up, thereby ending the condition.
							</li>
							<li>
								The creature has disadvantage on attack rolls.
							</li>
							<li>
								An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage.
							</li>
						</ul>
						<h4>
							Restrained
						</h4>
						<ul>
							<li>
								A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed.
							</li>
							<li>
								Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.
							</li>
							<li>
								The creature has disadvantage on Dexterity saving throws
							</li>
						</ul>
						<h4>
							Stunned
						</h4>
						<ul>
							<li>
								A stunned creature is incapacitated (see "incapacitated" condition), can't move, and can speak only falteringly.
							</li>
							<li>
								The creature automatically fails Strength and Dexterity saving throws.
							</li>
							<li>
								Attack rolls against the creature have advantage.
							</li>
						</ul>
						<h4>
							Unconscious
						</h4>
						<ul>
							<li>
								An unconscious creature is incapacitated (see "incapacitated" condition), can't move or speak, and is unaware of its surroundings.
							</li>
							<li>
								The creature drops whatever it is holding and falls prone.
							</li>
							<li>
								The creature automatically fails Strength and Dexterity saving throws.
							</li>
							<li>
								Attack rolls against the creature have advantage.
							</li>
							<li>
								Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.
							</li>
						</ul>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Skills;
