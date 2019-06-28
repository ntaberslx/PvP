import React, { Component } from 'react';

import './App.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import _ from 'lodash';
import uuid from 'uuid';
import {Navbar, Nav, Dropdown} from 'react-bootstrap';
import { Responsive, WidthProvider} from "react-grid-layout";
import ReactModal from 'react-modal';
import { SwatchesPicker } from 'react-color'
import {Col, Row, Container} from 'react-bootstrap';

import Master from './components/Master';
import Button from "react-bootstrap/Button";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const options = [
    'Basics', 'Statblock', 'Personality', 'Portrait', 'Companion Statblock',
	'Spellbook', 'State', 'Text Box', 'Coin Pouch', 'Weapon', 'Encounter'
];

class App extends Component {
	constructor(props) {
		super(props);

		const storedData = getFromLS();
		if (storedData.layouts && storedData.dataMap && storedData.primaryColor) {
			this.state = {
				layouts: storedData.layouts,
				dataMap: storedData.dataMap,
				primaryColor: storedData.primaryColor,
			};
		} else {
			this.state = {
				layouts: {lg:[]},
				dataMap: {lg:[]},
				primaryColor: '#969696'
			};
			saveToLS({
				layouts: {lg:[]},
				dataMap: {lg:[]},
				primaryColor: '#969696'
			});
		}
		this.generateDOM = this.generateDOM.bind(this);
	}

    state = {
        value: null,
        currentBreakpoint: "lg",
        compactType: "vertical",
        mounted: false,
		showModal: false
    };

	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

	getLayoutVal = (id) => {
		for (let d of this.state.layouts.lg){
			if (d.i === id) {
				return d;
			}
		}
	};

    getDataMapVal = (id) => {
		for (let d of this.state.dataMap.lg){
			if (d.id === id) {
				return d;
			}
		}
	};

    onChange = (layout, layouts) => {
		this.setState({layouts}, () => {
			saveToLS({
				layouts: this.state.layouts,
				dataMap: this.state.dataMap,
				primaryColor: this.state.primaryColor
			});
		});
	};

    onChildDataChange = (newData) => {
		const d = [...this.state.dataMap.lg];
		for (let i = 0; i < d.length; i++) {
			const data = d[i];
			if (data.id === newData.id) {
				d[i].fields = newData.fields;
			}
		}
		let update = this.state.dataMap;
		update.lg = d;
		this.setState({
			dataMap: update
		});
	};

	removeElement = (id) => {
		let removedItem = this.state.layouts.lg.filter(i=>i.i !== id);
		this.setState({
			layouts: {
				lg : removedItem
			}
		});
	};

    componentDidMount() {
		document.title = "PvP";
	}

	componentDidUpdate() {
		saveToLS({
			layouts: this.state.layouts,
			dataMap: this.state.dataMap,
			primaryColor: this.state.primaryColor
		});
    }

    getNewMaster = (type) => {
    	let x = 0; let y = 0;
    	let w = 20; let h = 20;
    	if (type === 'Basics') {
    		w = 78; h = 9;
		} else if (type === 'Statblock') {
    		w = 22; h = 45;
		} else if (type === 'Personality') {
			w = 20; h = 11;
		} else if (type === 'State') {
			w= 23; h = 22;
		} else if (type === 'Text Box') {
    		w = 25; h = 16;
		} else if (type === 'Weapon') {
    		w = 48; h = 5;
		} else if (type === 'Encounter'){
    		w = 31; h = 10;
		} else if (type === 'Companion Statblock'){
			w = 25; h = 30;
		} else if (type === 'Coin Pouch') {
    		w = 18; h = 13;
		}

        return {
            i: uuid.v4(),
            x: x, y: y,
            w: w, h: h
        };
    };

	addComponent(value) {
		const master = this.getNewMaster(value);
		this.setState({
			layouts: {
				lg: [...this.state.layouts.lg, master]
			},
			dataMap: {
				lg: [...this.state.dataMap.lg, {
					fields: {},
					type: value,
					id: master.i
				}]
			}}
		);
	}

	reviveComponent = (comp) => {
		const master = this.getNewMaster(comp.type);
		master.i = comp.id;
		this.setState({
			layouts: {
				'Main Layout': [...this.state.layouts.lg, master]
			}
		})
	};

	killComponent = (id)=>{
		let removedItem = this.state.dataMap.lg.filter(i=>i.id !== id);
		this.setState({
			dataMap: {
				'Main Layout' : removedItem
			}
		});
	};

	handleColorChange = (color) => {
		this.setState({
			primaryColor: color.hex
		}, () => {

		});
	};

	getTrashCan = () => {
		return _.map(this.state.dataMap.lg, (v)=>{
			if (!this.state.layouts.lg.some((x)=> {return x.i === v.id;})){
				return <Dropdown.Item value={v.type} key={v.id} onClick={e => this.reviveComponent(v)}>
					{v.type}
					<button onMouseDown={(e) => e.stopPropagation()} type="button" className="btn close" aria-label="Close" onClick={(e)=>{e.stopPropagation();this.killComponent(v.id);}}>
						<span aria-hidden="true">&times;</span>
					</button>
				</Dropdown.Item>
			}
		});
	};

    generateDOM(layout) {
		return _.map(this.state.layouts.lg, (l, i) => {
			const data = this.getDataMapVal(l.i);
			return (
				<div key={l.i} style={{background: this.state.primaryColor}}>
					<Master type={data.type} fields={data.fields} id={data.id} handleChanges={this.onChildDataChange.bind(this)} removeElement={this.removeElement.bind(this)}/>
				</div>
			);
		});
    }

    render() {
        return (
            <div className="App">
				<link rel="stylesheet"
					  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
					  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
					  crossOrigin="anonymous"/>
				<link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png"/>
				<link rel="icon" type="image/png" sizes="32x32" href="/public/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/public/favicon-16x16.png"/>
				<link rel="manifest" href="/public/site.webmanifest"/>
				<link rel="mask-icon" href="/public/safari-pinned-tab.svg" color="#5bbad5"/>
				<meta name="msapplication-TileColor" content="#da532c"/>
				<meta name="theme-color" content="#ffffff"/>

				<Navbar bg={'dark'} variant={"dark"} expand="lg">
					<Navbar.Brand href="#home">PvP (Don't Waste Paper)</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse  className="justify-content-end">
						<Nav className="mr-auto">
							<div className={'four-padding'}>

								<Dropdown>
									<Dropdown.Toggle variant="success">
										Add
									</Dropdown.Toggle>

									<Dropdown.Menu  onChange={e => this.addComponent(e.target.value)}>
										{options.map(i=>{
											return <Dropdown.Item value={i} key={i} onClick={e => this.addComponent(i)}>{i}</Dropdown.Item>
										})}
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<div className={'four-padding'}>
								<Dropdown>
									<Dropdown.Toggle variant="success">
										Restore
									</Dropdown.Toggle>

									<Dropdown.Menu  onChange={e => this.addComponent(e.target.value)}>
										{this.getTrashCan()}
									</Dropdown.Menu>
								</Dropdown>

							</div>
						</Nav>
						<Button variant={"dark"} onClick={this.handleOpenModal} className={'dot-menu-holder'}><div className={'dot-menu'}/> </Button>
					</Navbar.Collapse>
				</Navbar>

				<ReactModal
					isOpen={this.state.showModal}
					contentLabel='...'
					style={{content : {
							top                   : '50%',
							left                  : '50%',
							right                 : 'auto',
							bottom                : 'auto',
							marginRight           : '-50%',
							transform             : 'translate(-50%, -50%)'
						}}}>
					<Container>
						<Row><Col>
								<h2>System Color</h2>
						</Col></Row>
						<Row>
							<SwatchesPicker
								color={this.state.primaryColor}
								onChangeComplete={ this.handleColorChange }/>
						</Row>
						<Row><Col>
							<h2>Layout</h2>
						</Col></Row>
						<Row>
							<button onClick={this.handleCloseModal}>Close</button>
						</Row>
					</Container>
				</ReactModal>

                <div>
                    <ResponsiveReactGridLayout
                        layouts={this.state.layouts}
						cols={{ lg: 100, md: 10, sm: 6, xs: 4, xxs: 2 }}
						rowHeight={10}
						preventCollision={true}
                        onLayoutChange={this.onChange}
                        compactType={null}>

                        {this.generateDOM('lg')}

                    </ResponsiveReactGridLayout>
                </div>
            </div>
        );
    }
}

function getFromLS() {
	let ls = {};
	if (global.localStorage) {
		try {
			ls = JSON.parse(global.localStorage.getItem("PvP")) || {};
		} catch (e) {
			/*Ignore*/
		}
	}
	return ls;
}

function saveToLS(values) {
	if (global.localStorage) {
		global.localStorage.setItem(
			"PvP",
			JSON.stringify(values)
		);
	}
}

export default App;
