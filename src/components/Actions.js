import React, { Component } from 'react';
import {Col, Row, Table} from "react-bootstrap";

class Actions extends Component {

	render() {
		return (
			<div>
				<Row>
					<Col>
						<h3>Actions</h3>
					</Col>
				</Row>

				<hr className={'style-seven'}/>
				<Row>
					<Col sm={6}>
						<Row>
							<Col>
								<b>Attack:</b>
							</Col>
						</Row>
						<Row>
							<Col>
								You make a melee or ranged weapon attack.
							</Col>
						</Row>
						<Row>
							<Col>
								<b>Cast a Spell:</b>
							</Col>
						</Row>
						<Row>
							<Col>
								You cast a cantrip or a spell of 1st level or higher. See the spells casting time.
							</Col>
						</Row>
						<Row>
							<Col>
								<b>Dash:</b>
							</Col>
						</Row>
						<Row>
							<Col>
								You gain extra movement equal to your speed (plus any modifiers) for the current turn.
							</Col>
						</Row>
						<Row>
							<Col>
								<b>Disengage:</b>
							</Col>
						</Row>
						<Row>
							<Col>
								Your movement doesn't provoke opportunity attacks for the rest of the turn.
							</Col>
						</Row>
						<Row>
							<Col>
								<b>Dodge:</b>
							</Col>
						</Row>
						<Row>
							<Col>
								Until the start of your next turn, any attack roll made against you has disadvantage if you can see the attacker, and you make Dexterity saving throws with advantage. You lose this benefit if you are incapacitated or if your speed drops to zero.
							</Col>
						</Row>
						<Row>
							<Col>
								<b>Help:</b>
							</Col>
						</Row>
						<Row>
							<Col>
								<p>You help one creature with a task, giving that creature advantage on the next ability check it makes for that task. Or you distract one creature within 5 feet of you, and the next attack roll that an ally of yours makes against that creature has advantage.</p>
								<p>Whichever option you choose, the advantage goes away once used or when your next turn starts.</p>
							</Col>
						</Row>
					</Col>
					<Col sm={6}>
						<Row>
							<Col>
								<b>Hide:</b>
							</Col>
						</Row>
						<Row>
							<Col>
								You make a Dexterity (Stealth) check in an attempt to become hidden&mdash;unseen and unheard.
							</Col>
						</Row>
						<Row>
							<Col>
								<b>Ready:</b>
							</Col>
						</Row>
						<Row>
							<Col>
								<p>You wait for a particular circumstance before you act, which lets you act using your reaction before the start of your next turn. You must decide in advance (a) what perceivable circumstance will trigger your reaction and (b) the action you will take in response to that trigger.</p>
								<p>If you ready a spell, it must have a casting time of 1 action, and you must concentrate on it until you release it.</p>
							</Col>
						</Row>
						<Row>
							<Col>
								<b>Search:</b>
							</Col>
						</Row>
						<Row>
							<Col>
								You make a Wisdom (Perception) check or an Intelligence (Investigation) check to find something.
							</Col>
						</Row>
						<Row>
							<Col>
								<b>Use a Magic Item:</b>
							</Col>
						</Row>
						<Row>
							<Col>
								You use a magic item that requires your action for its use.
							</Col>
						</Row>
						<Row>
							<Col>
								<b>Use an Object:</b>
							</Col>
						</Row>
						<Row>
							<Col>
								You use an object, other than a magic item, that requires your action for its use.
							</Col>
						</Row>
						<Row>
							<Col>
								<b>Use a Special Ability:</b>
							</Col>
						</Row>
						<Row>
							<Col>
								You use a class feature or other special ability that requires your action for its use.
							</Col>
						</Row>
					</Col>
				</Row>

				<hr className={'style-eight'}/>

				<Row>
					<Col>
						<h4>Jumping</h4>
						<Row>
							<Col sm={6}>
								<h6><em>Long Jump</em></h6>
								<p>Move 10+ feet, and jump a number of feet up to your Strength score.</p>
							</Col>
							<Col sm={6}>
								<h6><em>High Jump</em></h6>
								<p>Move 10+ feet, and jump a number of feet up to 3+ your Strength modifier.</p>
							</Col>
						</Row>

						<em>When you make a standing jump, you can jump only half the distance</em>

					</Col>
				</Row>

				<Row>
					<Col>
						<h4>Suffocating</h4>
						<p>
							You can hold your breath for a number of minutes equal to 1 + your Constitution modifier if it is 0 or positive. If it is negative, you can hold your breath for 30 seconds
						</p>
						<p>
							If you run out of breath or you're choking, you can survive for a number of rounds equal to your Constitution modifier with a minimum of 1 round. At the start of your next turn, you drop to 0 hit points and are dying, and you can't regain hit points or be stabilized until you can breathe again.
						</p>
					</Col>
				</Row>

				<Row>
					<Col>
						<h4>Concentration</h4>
						<p>
							If a spell must be maintained with concentration, its description specifies how long you can concentrate on it. You can end concentration at any time (no action required). The following factors can break your concentration:
						</p>
						<ul>
							<li>
								You cast another spell that requires concentration
							</li>
							<li>
								You take damage. Succeed on a Constitution saving throw to maintain your concentration, with a DC equal to 10 or half the damage you take, whichever number is higher
							</li>
							<li>
								You're incapacitated or killed.
							</li>
							<li>
								You're overwhelmed by an enormous distraction, such as a wave crashing into you. Succeed on a DC 10 Constitution saving throw to maintain your concentration
							</li>
						</ul>

					</Col>
				</Row>

			</div>
		);
	}
}

export default Actions;
