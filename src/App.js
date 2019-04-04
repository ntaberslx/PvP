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

let options = [
    'Background', 'BigStats', 'Encumbrance', 'Personality', 'Portrait',
    'SmallStats', 'Spellbook', 'State', 'TextBox', 'Weapon', 'Encounter'
];

function generateLayout() {
    return _.map(_.range(0, 25), function(item, i) {
        const y = Math.ceil(Math.random() * 4) + 1;
        return {
            x: (_.random(0, 5) * 2) % 12,
            y: Math.floor(i / 6) * y,
            w: 2,
            h: y,
            i: i.toString(),
            static: Math.random() < 0.05
        };
    });
}

class App extends Component {
    static defaultProps = {
        className: "layout",
        rowHeight: 30,
        onLayoutChange: function() {},
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        initialLayout: generateLayout()
    };

    state = {
        components: [],
        value: null,
        currentBreakpoint: "lg",
        compactType: "vertical",
        mounted: false,
        layouts: { lg: this.props.initialLayout }
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

    onNewLayout = () => {
        this.setState({
            layouts: { lg: generateLayout() }
        });
    };

    componentDidMount() {
        this.setState({ mounted: true });
    }

    getType = (Type) => {
        console.log(Type);
        if (Type === 'Background') return {id: uuid.v4(), comp: <Background/>};
        if (Type === 'BigStats') return {id: uuid.v4(), comp: <BigStats/>};
        if (Type === 'Encumbrance') return {id: uuid.v4(), comp: <Encumbrance/>};
        if (Type === 'Personality') return {id: uuid.v4(), comp: <Personality/>};
        if (Type === 'Portrait') return {id: uuid.v4(), comp: <Portrait/>};
        if (Type === 'SmallStats') return {id: uuid.v4(), comp: <SmallStats/>};
        if (Type === 'Spellbook') return {id: uuid.v4(), comp: <Spellbook/>};
        if (Type === 'State') return {id: uuid.v4(), comp: <State/>};
        if (Type === 'TextBox') return {id: uuid.v4(), comp: <TextBox/>};
        if (Type === 'Weapon') return {id: uuid.v4(), comp: <Weapon/>};
        if (Type === 'Encounter') return {id: uuid.v4(), comp: <Encounter/>};
    };

    generateDOM() {
        return _.map(this.state.layouts.lg, function(l, i) {
            return (
                <div key={i} className={l.static ? "static" : ""}>
                    {l.static ? (
                        <span
                            className="text"
                            title="This item is static and cannot be removed or resized."
                        >
                            Static - {i}
                        </span>
                    ) : (
                        <span className="text">{i}</span>
                    )}
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


                <header className="App-header">
                    <h1>
                        Pencil Variegate Paper (PvP) WIP
                    </h1>
                    <DropdownList
                        data={options}
                        value={this.state.value}
                        onChange={value => this.setState({
                            components: [...this.state.components, this.getType(value)]
                        })}
                    />
                </header>

                <div>
                    <ResponsiveReactGridLayout
                        {...this.props}
                        layouts={this.state.layouts}
                        onBreakpointChange={this.onBreakpointChange}
                        onLayoutChange={this.onLayoutChange}
                        // WidthProvider option
                        measureBeforeMount={false}
                        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                        // and set `measureBeforeMount={true}`.
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
