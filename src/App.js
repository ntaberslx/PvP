import React, { Component } from 'react';

import './App.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import _ from 'lodash';
import uuid from 'uuid';
import DropdownList from 'react-widgets/lib/DropdownList';
import { Responsive, WidthProvider } from "react-grid-layout";

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
		}
		this.generateDOM = this.generateDOM.bind(this);
	}

    state = {
        value: null,
        currentBreakpoint: "lg",
        compactType: "vertical",
        mounted: false
    };

    /* is this for vert/hori changes? */
    onCompactTypeChange = () => {
        const { compactType: oldCompactType } = this.state;
        const compactType =
            oldCompactType === "horizontal"
                ? "vertical"
                : oldCompactType === "vertical" ? null : "horizontal";
        this.setState({ compactType });
    };

    getDataMapVal = (id) => {
    	// this is real ugly. want an easier way to get it.
		for (let d of this.state.dataMap.lg){
			if (d.i === id) {
				return d;
			}
		}
	};

    onChange = (layout, layouts) => {
		this.setState({layouts});
		saveToLS({layouts: this.state.layouts, dataMap: this.state.dataMap});
	};

    onChildDataChange = (data) => {
    	console.log(data);
		for (let d of this.state.dataMap.lg) {
			if (d.i === data.i) {
				d = data;
			}
		}
	};

    componentDidUpdate() {
		saveToLS({layouts: this.state.layouts, dataMap: this.state.dataMap});
    }

    getNewMaster = () => {
        return {
            i: uuid.v4(),
            x: 0, y: 0,
            w: 3, h: 2
        };
    };

	addComponent(value) {
		const master = this.getNewMaster();
		this.setState({
			layouts: {
				lg: [...this.state.layouts.lg, master]
			},
			dataMap: {
				lg: [...this.state.dataMap.lg, {
					data: {},
					type: value,
					i: master.i
				}]
			}}
		);
	}

    generateDOM(layout) {
        return _.map(this.state.layouts.lg, (l, i) => {
			let data = this.getDataMapVal(l.i);
			console.log(l.i, data);
            return (
                <div key={l.i}>
                    <Master type={data.type} data={data.data} handleChanges={this.onChildDataChange.bind(this)}/>
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
						cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
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
