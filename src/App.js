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
    'Background', 'BigStats', 'Encumbrance', 'Personality', 'Portrait',
    'SmallStats', 'Spellbook', 'State', 'TextBox', 'Weapon', 'Encounter'
];

class App extends Component {
    static defaultProps = {
        className: "layout",
        rowHeight: 30,
        onLayoutChange: function() {},
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
    };

    state = {
        value: null,
        currentBreakpoint: "lg",
        compactType: "vertical",
        mounted: false,
        layouts: {
            lg: []
        }
    };

    onBreakpointChange = breakpoint => {
        this.setState({
            currentBreakpoint: breakpoint
        });
    };

    onCompactTypeChange = () => {
        const { compactType: oldCompactType } = this.state;
        const compactType =
            oldCompactType === "horizontal"
                ? "vertical"
                : oldCompactType === "vertical" ? null : "horizontal";
        this.setState({ compactType });
    };

    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
    };

    componentDidMount() {
        this.setState({ mounted: true });
        const storage = localStorage.getItem('PvPLayouts');
        console.log(JSON.parse(storage));
        if (storage) {
            this.setState({layouts: JSON.parse(storage)});
        }
    }

    componentDidUpdate() {
        localStorage.setItem('PvPLayouts', JSON.stringify(this.state.layouts));
    }

    getType = (Type) => {
        console.log(Type);
        return {
            i: uuid.v4(),
            data: {},
            type: Type,
            x: 0, y: 0,
            w: 3, h: 2
        };
    };

    generateDOM() {
        return _.map(this.state.layouts.lg, (l, i) => {
            return (
                <div key={l.i}>
                    <Master type={l.type} data={l.data}/>
                </div>
            );
        });
    }

    addComponent(value) {
        this.setState({
            layouts: {
                lg: [...this.state.layouts.lg, this.getType(value)]
            }});
        value = null;
    }

    render() {
        return (
            <div className="App">

                <link rel="stylesheet"
                      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                      crossOrigin="anonymous"/>


                <header className="App-header">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>
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
                        {...this.props}
                        layouts={this.state.layouts}
                        onBreakpointChange={this.onBreakpointChange}
                        onLayoutChange={this.onLayoutChange}
                        measureBeforeMount={false}
                        useCSSTransforms={this.state.mounted}
                        compactType={this.state.compactType}
                        preventCollision={!this.state.compactType}>

                        {this.generateDOM()}

                    </ResponsiveReactGridLayout>
                </div>
            </div>
        );
    }
}

export default App;
