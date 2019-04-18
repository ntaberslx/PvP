import React, { Component } from 'react';

import './App.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import _ from 'lodash';
import uuid from 'uuid';
import DropdownList from 'react-widgets/lib/DropdownList';
import { Responsive, WidthProvider } from "react-grid-layout";

import Background from './components/Background';
import BigStats from './components/BigStats';
import Encumbrance from './components/Encumbrance';
import Personality from './components/Personality';
import Portrait from './components/Portrait';
import SmallStats from './components/SmallStats';
import Spellbook from './components/Spellbook';
import State from './components/State';
import TextBox from './components/TextBox';
import Weapon from './components/Weapon';
import Encounter from './components/Encounter'

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
    }

    getType = (Type) => {
        console.log(Type);
        if (Type === 'Background') return {
            i: uuid.v4(),
            comp: <Background/>,
            x: 0, y: 0,
            w: 3, h: 2
        };
        if (Type === 'BigStats') return {
            i: uuid.v4(),
            comp: <BigStats/>,
            x: 0, y: 0,
            w: 3, h: 2
        };
        if (Type === 'Encumbrance') return {
            i: uuid.v4(),
            comp: <Encumbrance/>,
            x: 0, y: 0,
            w: 3, h: 2
        };
        if (Type === 'Personality') return {
            i: uuid.v4(),
            comp: <Personality/>,
            x: 0, y: 0,
            w: 3, h: 2
        };
        if (Type === 'Portrait') return {
            i: uuid.v4(),
            comp: <Portrait/>,
            x: 0, y: 0,
            w: 2, h: 5
        };
        if (Type === 'SmallStats') return {
            i: uuid.v4(),
            comp: <SmallStats/>,
            x: 0, y: 0,
            w: 3, h: 2
        };
        if (Type === 'Spellbook') return {
            i: uuid.v4(),
            comp: <Spellbook/>,
            x: 0, y: 0,
            w: 3, h: 2
        };
        if (Type === 'State') return {
            i: uuid.v4(),
            comp: <State/>,
            x: 0, y: 0,
            w: 3, h: 2
        };
        if (Type === 'TextBox') return {
            i: uuid.v4(),
            comp: <TextBox/>,
            x: 0, y: 0,
            w: 3, h: 2
        };
        if (Type === 'Weapon') return {
            i: uuid.v4(),
            comp: <Weapon/>,
            x: 0, y: 0,
            w: 3, h: 2
        };
        if (Type === 'Encounter') return {
            i: uuid.v4(),
            comp: <Encounter/>,
            x: 0, y: 0,
            w: 3, h: 2
        };
    };

    generateDOM() {
        return _.map(this.state.layouts.lg, (l, i) => {
            return (
                <div key={l.i}>
                    {l.comp}
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

    componentDidUpdate() {
        localStorage.setItem('PvPLayouts', JSON.stringify(this.state.layouts));
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
