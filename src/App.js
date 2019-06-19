import React, { Component } from 'react';

import './App.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import _ from 'lodash';
import uuid from 'uuid';
import DropdownList from 'react-widgets/lib/DropdownList';
import { Responsive, WidthProvider} from "react-grid-layout";

import Master from './components/Master';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const options = [
    'Background', 'Statbloc', 'Encumbrance', 'Personality', 'Portrait',
	'Spellbook', 'State', 'TextBox', 'Weapon', 'Encounter'
];

class App extends Component {
	constructor(props) {
		super(props);

		const storedData = getFromLS();
		if (storedData.layouts && storedData.dataMap) {
			this.state = {layouts: storedData.layouts, dataMap: storedData.dataMap};
		} else {
			this.state = {layouts: {lg:[]}, dataMap: {lg:[]}};
			saveToLS({layouts: {lg:[]}, dataMap: {lg:[]}});
		}
		this.generateDOM = this.generateDOM.bind(this);
	}

    state = {
        value: null,
        currentBreakpoint: "lg",
        compactType: "vertical",
        mounted: false,
		trash: []
    };

	getLayoutVal = (id) => {
		for (let d of this.state.layouts.lg){
			if (d.i === id) {
				console.log(d);
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
		this.setState({layouts});
		saveToLS({layouts: this.state.layouts, dataMap: this.state.dataMap});
	};

    onChildDataChange = (newData) => {
		const d = [...this.state.dataMap.lg];
		for (let i = 0; i < d.length; i++) {
			const data = d[i];
			console.log(data, newData);
			if (data.id === newData.id) {
				d[i].fields = newData.fields;
			}
		}
		this.setState({
			dataMap: {
				lg : d
			}
		});
	};

	removeElement = (id) => {
    	for (let i = 0; i < this.state.layouts.lg.length; i++) {
    		const item = this.getLayoutVal(id);
    		if (item) {
				this.setState(prevState => {
					return {
						layouts: {
							lg : [...prevState.layouts.lg.filter(({ i }) => i !== item.i)]
						}
					};
				});
			}
		}
	};

    componentDidMount() {
		document.title = "PvP";
	}

	componentDidUpdate() {
		saveToLS({layouts: this.state.layouts, dataMap: this.state.dataMap});
    }

    getNewMaster = (type) => {
    	let x = 0; let y = 0;
    	let w = 20; let h = 20;
    	if (type === 'Background') {
    		w = 20; h = 20;
		} // else if ...
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

    generateDOM(layout) {
		return _.map(this.state.layouts.lg, (l, i) => {
			const data = this.getDataMapVal(l.i);
			return (
				<div key={l.i}>
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

                <header className="app-header">
                    <div className="row">
                        <div className="col-md-6">
                            <h2 className="header">
                                Pencil Variegate Paper (PvP) WIP
                            </h2>
                        </div>
                        <div className="col-md-6">
                            <DropdownList
                                data={options}
                                value={this.state.value}
                                placeholder="Add Components Here"
                                onChange={value => this.addComponent(value)}
                            />
                        </div>
                    </div>
                    <hr/>
                </header>

                <div>
                    <ResponsiveReactGridLayout
                        layouts={this.state.layouts}
						cols={{ lg: 100, md: 10, sm: 6, xs: 4, xxs: 2 }}
						rowHeight={10}
						preventCollision={true}
                        onLayoutChange={this.onChange}
                        compactType={null}>

                        {this.generateDOM("lg")}

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
