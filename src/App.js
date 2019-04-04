import React, { Component } from 'react';

import './App.css';
import 'react-widgets/dist/css/react-widgets.css';

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

import uuid from 'uuid';
import DropdownList from 'react-widgets/lib/DropdownList';

let options = [
    'Background', 'BigStats', 'Encumbrance', 'Personality', 'Portrait',
    'SmallStats', 'Spellbook', 'State', 'TextBox', 'Weapon', 'Encounter'
];


class App extends Component {
    state = {
        components: [],
        value: null
    };

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

                <div className="canvas">
                    {this.state.components.map(function(comp, index){
                        return <span key={ index }>{comp.comp}</span>;
                    })}
                </div>


            </div>
        );
    }
}

export default App;
