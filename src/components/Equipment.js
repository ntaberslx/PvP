import React, {Component} from 'react';
import {Button, Container, Form, Modal, Row} from "react-bootstrap";
import _ from 'lodash';
import uuid from 'uuid';
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";

class Equipment extends Component {
	state = {
		fields: {
			collections: this.props.fields.collections ? this.props.fields.collections : [
				{
					name: 'On Person',
					things: [
						{
							name: 'Common Clothes',
							weight: 3,
							notes: '',
							count: 1,
							cost: '5 sp',
							isNew: false,
							key: uuid.v4()
						}
					],
					key: uuid.v4()
				},
				{
					name: 'In Rucksack',
					things: [
						{
							name: 'Rations',
							weight: 2,
							notes: 'Daily dry rations. Disgusting, I hate these',
							count: 10,
							cost: '5 cp',
							isNew: false,
							key: uuid.v4()
						}
					],
					key: uuid.v4()
				}
			],
			weight: this.props.fields.weight,
			units: this.props.fields.units ? this.props.fields.units : 'lbs'
		},
		activeThing: {},
		activeCollection: {}
	};

	handleChanges = (fields) => {
		this.props.handleChanges(fields)
	};

	handleCollectionFieldChange = (collectionKey, field, value) => {
		const extFields = this.state.fields;
		extFields.collections.find(collection => collection.key === collectionKey)[field] = value;
		this.handleChanges(extFields);
		this.setState({
				fields: extFields
			}
		);
	};

	handleThingFieldChange = (event) => {
		const element = event.target;
		const ext = {...this.state.activeThing};
		ext[element.title] = element.value;
		this.handleChanges(ext);
		this.setState(prevState => {
				return {
					activeThing: ext
				};
			}
		);
	};

	handleFieldChange = (event) => {
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

	handleSaveModal = () => {
		const collectionPackage = this.state.fields.collections.slice();
		collectionPackage.forEach((collection, i) => {
			if (this.state.activeCollection && collection.key === this.state.activeCollection.key) {
				if (this.state.activeThing.isNew) {
					this.state.activeThing.isNew = false;
					collection.things.push(this.state.activeThing);
				} else {
					collection.things.forEach((thing, j) => {
						if (thing.key === this.state.activeThing.key) {
							collection.things[j] = this.state.activeThing;
						}
					});
				}
			}
		});
		let extFields = this.state.fields;
		extFields.collections = collectionPackage;
		this.handleChanges(extFields);
		this.setState({
			fields: extFields
		});
		this.handleCloseModal();
	};

	handleCloseModal = () => {
		this.setState({
			showModal: false,
			activeThing: {}
		});
	};

	handleOpenModal = (thing, collection) => {
		this.setState({
			showModal: true,
			activeThing: thing,
			activeCollection: collection
		});
	};

	addCollection = () => {
		let extFields = this.state.fields;
		extFields.collections.push({
			name: '',
			things: [],
			key: uuid.v4()
		});
		this.handleChanges(extFields);
		this.setState({
			fields: extFields
		});
	};

	newThing = () => {
		return {
			name: '',
			weight: 0,
			notes: '',
			count: 1,
			cost: '',
			isNew: true,
			key: uuid.v4()
		}
	};

	removeCollection = (collectionId) => {
		const extFields = {...this.state.fields};
		extFields.collections = this.state.fields.collections.filter(collection => collection.key !== collectionId);
		this.handleChanges(extFields);
		this.setState({
			fields: extFields
		});
	};

	removeThing = (collectionKey, thingKey) => {
		const extFields = {...this.state.fields};
		extFields.collections.forEach(col => {
			if (col.key === collectionKey) {
				col.things = col.things.filter(thing =>
					thing.key !== thingKey
				);
			}
		});
		this.handleChanges(extFields);
		this.setState({
			fields: extFields
		});
		this.handleCloseModal();
	};

	getCollections = () => {
		return _.map(this.state.fields.collections, (collection, i) => {
			return (
				<div key={collection.key} onMouseDown={(e) => {
					e.stopPropagation()
				}}>
					<Row style={{'paddingBottom': '5px'}}>
						<Col sm={9}>
							<input type={'text'} className={"form-control"} placeholder={"Name"}
								   defaultValue={collection.name} title='name'
								   onChange={(e) => this.handleCollectionFieldChange(collection.key, 'name', e.target.value)}/>
						</Col>
						<div className={'pull-right'}>
							<Button variant={'dark'} size={"sm"} style={{'marginRight': '2px'}}
									onClick={(e) => this.removeCollection(collection.key)}>
								<FontAwesomeIcon icon={faTrash} size={"sm"} transform={"up-2.5"} color={"#fff"}/>
							</Button>
							<Button variant={"dark"} size={"sm"} onClick={(e) => {
								this.handleOpenModal(this.newThing(), collection)
							}}>
								<FontAwesomeIcon icon={faPlus} size={"sm"} transform={"up-2.5"} color={"#fff"}/>
							</Button>
						</div>
					</Row>
					{this.getThings(collection)}
					{i !== this.state.fields.collections.length - 1 ? <hr className={'style-eight'}/> : ''}
				</div>
			)
		});
	};

	getThings = (collection) => {
		return _.map(collection.things, (thing, i) => {
			return (
				<Card key={thing.key} style={{'marginBottom': '2px'}}>
					<Container>
						<Row>
							<Col sm={10}>

								{
									thing.name +
									(thing.count > 1 ? ' x ' + thing.count : '')
								}

							</Col>
							<Col sm={2} classNam={'pullRight'}>
								<Button variant={"dark"} size={"sm"} onClick={(e) => {
									this.handleOpenModal(thing, collection)
								}}>
									<FontAwesomeIcon icon={faPen} size={"sm"} transform={"up-2.5"}
													 color={"#fff"}/>
								</Button>
							</Col>
						</Row>
					</Container>
				</Card>
			)
		});
	};

	render() {
		return (
			<div>
				<Modal show={this.state.showModal} onHide={this.handleCloseModal}>
					<Modal.Header closeButton>
						<Modal.Title>
							{!this.state.activeThing || this.state.activeThing.isNew ? "New Thing" : this.state.activeThing.name}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Container>
							<Row>
								<Col md={12} onMouseDown={(e) => e.stopPropagation()}>
									<label>Name</label>
									<Container>
										<input type={'text'} className={"form-control"}
											   defaultValue={this.state.activeThing.name} title='name'
											   onChange={(e) => this.handleThingFieldChange(e)}/>
									</Container>
								</Col>
							</Row><Row>
							<Col md={12} onMouseDown={(e) => e.stopPropagation()}>
								<label>Item Count</label>
								<Container>
									<input type={'number'} className={"form-control"}
										   defaultValue={this.state.activeThing.count} title='count'
										   onChange={(e) => this.handleThingFieldChange(e)}/>

								</Container>
							</Col>
						</Row><Row>
							<Col md={12} onMouseDown={(e) => e.stopPropagation()}>
								<label>Cost</label>
								<Container>
									<input type={'text'} className={"form-control"}
										   defaultValue={this.state.activeThing.cost} title='cost'
										   onChange={(e) => this.handleThingFieldChange(e)}/>
								</Container>
							</Col>
						</Row><Row>
							<Col md={12} onMouseDown={(e) => e.stopPropagation()}>
								<label>Item Weight (
									{this.state.fields.units})</label>
								<Container>
									<input type={'number'} className={"form-control"}
										   defaultValue={this.state.activeThing.weight} title='weight'
										   onChange={(e) => this.handleThingFieldChange(e)}/>
								</Container>
							</Col>
						</Row>
							<hr className={'style-eight'}/>
							<Row>
								<Col md={12} onMouseDown={(e) => e.stopPropagation()}>
									<label>Notes</label>
									<Container>
										<Form.Control as="textarea" rows="10" title='notes' placeholder={"Notes"}
													  defaultValue={this.state.activeThing.notes}
													  onChange={(e) => this.handleThingFieldChange(e)}/>
									</Container>
								</Col>
							</Row>
						</Container>
					</Modal.Body>

					<Modal.Footer>
						{
							this.state.activeThing &&
							this.state.activeCollection &&
							!this.state.activeThing.isNew &&
							<Button variant="danger"
									onClick={e => this.removeThing(this.state.activeCollection.key, this.state.activeThing.key)}>
								Delete
							</Button>
						}
						<Button variant="dark" onClick={this.handleCloseModal}>
							Cancel
						</Button>
						<Button variant="dark" onClick={this.handleSaveModal}>
							Save
						</Button>
					</Modal.Footer>
				</Modal>

				<Container>
					<Button variant={"dark"} onClick={(e) => this.addCollection()} size={"sm"}>
						New Collection
					</Button>
				</Container>
				<hr/>
				{this.getCollections()}
			</div>
		);
	}
}

export default Equipment;
