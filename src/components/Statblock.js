import React, {Component} from 'react';
import {Col, Row, InputGroup, Form} from "react-bootstrap";
import _ from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faCheckDouble} from "@fortawesome/free-solid-svg-icons";

class Statblock extends Component {
    state = {
        fields: {
            proficiencyBonus: this.props.fields.proficiencyBonus ? this.props.fields.proficiencyBonus : 2,

            str: this.props.fields.str ? this.props.fields.str : 10,
            str_saving_throws: this.props.fields.str_saving_throws ? this.props.fields.str_saving_throws : 0,
            athletics: this.props.fields.athletics ? this.props.fields.athletics : 0,

            dex: this.props.fields.dex ? this.props.fields.dex : 10,
            dex_saving_throws: this.props.fields.dex_saving_throws ? this.props.fields.dex_saving_throws : 0,
            acrobatics: this.props.fields.acrobatics ? this.props.fields.acrobatics : 0,
            sleight_of_hand: this.props.fields.sleight_of_hand ? this.props.fields.sleight_of_hand : 0,
            stealth: this.props.fields.stealth ? this.props.fields.stealth : 0,

            con: this.props.fields.con ? this.props.fields.con : 10,
            con_saving_throws: this.props.fields.con_saving_throws ? this.props.fields.con_saving_throws : 0,

            int: this.props.fields.int ? this.props.fields.int : 10,
            int_saving_throws: this.props.fields.int_saving_throws ? this.props.fields.int_saving_throws : 0,
            arcana: this.props.fields.arcana ? this.props.fields.arcana : 0,
            history: this.props.fields.history ? this.props.fields.history : 0,
            investigation: this.props.fields.investigation ? this.props.fields.investigation : 0,
            nature: this.props.fields.nature ? this.props.fields.nature : 0,
            religion: this.props.fields.religion ? this.props.fields.religion : 0,

            wis: this.props.fields.wis ? this.props.fields.wis : 10,
            wis_saving_throws: this.props.fields.wis_saving_throws ? this.props.fields.wis_saving_throws : 0,
            animal_handling: this.props.fields.animal_handling ? this.props.fields.animal_handling : 0,
            insight: this.props.fields.insight ? this.props.fields.insight : 0,
            medicine: this.props.fields.medicine ? this.props.fields.medicine : 0,
            perception: this.props.fields.perception ? this.props.fields.perception : 0,
            survival: this.props.fields.survival ? this.props.fields.survival : 0,

            cha: this.props.fields.cha ? this.props.fields.cha : 10,
            cha_saving_throws: this.props.fields.cha_saving_throws ? this.props.fields.cha_saving_throws : 0,
            deception: this.props.fields.deception ? this.props.fields.deception : 0,
            intimidation: this.props.fields.intimidation ? this.props.fields.intimidation : 0,
            performance: this.props.fields.performance ? this.props.fields.performance : 0,
            persuasion: this.props.fields.persuasion ? this.props.fields.persuasion : 0,
        }
    };

    handleChanges = (fields) => {
        this.props.handleChanges(fields)
    };

    handleCheckbox = (box) => {
        const event = {
            target: {
                title: box,
                value: this.cycleProficiency(this.state.fields[box])
            }
        };
        this.handleFieldChange(event);
    };

    cycleProficiency = (value) => {
        return (value + 1) % 3;
    };

    handleFieldChange = (event) => {
        const element = event.target;
        const ext = {...this.state.fields};
        ext[element.title] = element.value;
        this.handleChanges(ext);
        this.setState({
            fields: ext
        });
    };

    stats = [
        {
            name: "Strength",
            field: "str",
            skills: [
                {name: "Saving Throws", field: "str_saving_throws"},
                {name: "Athletics", field: "athletics"}
            ]
        },
        {
            name: "Dexterity",
            field: "dex",
            skills: [
                {name: "Saving Throws", field: "dex_saving_throws"},
                {name: "Acrobatics", field: "acrobatics"},
                {name: "Sleight Of Hand", field: "sleight_of_hand"},
                {name: "Stealth", field: "stealth"}
            ]
        },
        {
            name: "Constitution",
            field: "con",
            skills: [
                {name: "Saving Throws", field: "con_saving_throws"},
            ]
        },
        {
            name: "Intelligence",
            field: "int",
            skills: [
                {name: "Saving Throws", field: "int_saving_throws"},
                {name: "Arcana", field: "arcana"},
                {name: "History", field: "history"},
                {name: "Investigation", field: "investigation"},
                {name: "Nature", field: "nature"},
                {name: "Religion", field: "religion"}
            ]
        },
        {
            name: "Wisdom",
            field: "wis",
            skills: [
                {name: "Saving Throws", field: "wis_saving_throws"},
                {name: "Animal Handling", field: "animal_handling"},
                {name: "Insight", field: "insight"},
                {name: "Medicine", field: "medicine"},
                {name: "Perception", field: "perception"},
                {name: "Survival", field: "survival"},
            ]
        },
        {
            name: "Charisma",
            field: "cha",
            skills: [
                {name: "Saving Throws", field: "cha_saving_throws"},
                {name: "Deception", field: "deception"},
                {name: "Intimidation", field: "intimidation"},
                {name: "Performance", field: "performance"},
                {name: "Persuasion", field: "persuasion"}
            ]
        }
    ];

    getModifier = (stat) => {
        return Math.floor((stat - 10) / 2) > 0 ? '+' + Math.floor((stat - 10) / 2) : Math.floor((stat - 10) / 2);
    };

    getStats = () => {
        return _.map(this.stats, (statistic, index, collection) => {
            const stat = +this.getModifier(this.state.fields[statistic.field]);
            return (
                <div key={index}>
                    <Row>
                        <Col sm={4} onMouseDown={(e) => e.stopPropagation()}>
                            <input type={'number'} className={"form-control"}
                                   defaultValue={this.state.fields[statistic.field]} title={statistic.field}
                                   onChange={(e) => this.handleFieldChange(e)}/>
                            <div className={"center"}><h1 className={"marginless"}>{stat}</h1></div>
                            <Form.Label className={"center"}><em>{statistic.name}</em></Form.Label>
                        </Col>

                        <Col sm={8} onMouseDown={(e) => e.stopPropagation()}>
                            {this.getSkills(statistic, stat)}
                        </Col>
                    </Row>
                    <hr className={"style-seven"} hidden={index === collection.length - 1}/>
                </div>
            );
        });
    };

    getSkills = (statistic, mod) => {
        return _.map(statistic.skills, (skill) => {
            let skillValue = mod;
            if (this.state.fields[skill.field] === 1) {
                skillValue += +this.state.fields.proficiencyBonus;
            } else if (this.state.fields[skill.field] === 2) {
                skillValue += 2 * +this.state.fields.proficiencyBonus;
            }
            return (
                <Row key={statistic.name + '/' + skill.name}>
                    <Col sm={8}>
                        <Row>
                            <Col sm={2} style={{"padding": "0px"}}>
                                <div className="pretty p-icon p-smooth"
                                     style={{"fontSize": "1.1em", "marginRight": "10px"}}>
                                    <input type="checkbox" checked={this.state.fields[skill.field] !== 0}
                                           onChange={(e) => this.handleCheckbox(skill.field)}/>
                                    <div className="state">
                                        <div>
                                            <i className="icon">
                                                <FontAwesomeIcon
                                                    icon={this.state.fields[skill.field] === 2 ? faCheckDouble : faCheck}
                                                    size={"sm"} transform={"up-2.5"} color={"#ffffff"}/>
                                            </i>
                                        </div>
                                        <label style={{"margin" : "0px"}}></label>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={10} style={{"padding": "0px"}}>
                                <label style={{"margin" : "0px"}}>{skill.name}</label>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={4}>
                        {skillValue}
                    </Col>
                </Row>
            );
        });
    };

    render() {
        return (
            <div>
                <Row className={"proficiency-bonus"}>
                    <Col md={12} onMouseDown={(e) => e.stopPropagation()}>
                        <InputGroup size='sm'>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    proficiency Bonus
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="number" onChange={(e) => this.handleFieldChange(e)}
                                          title="proficiencyBonus" defaultValue={this.state.fields.proficiencyBonus}/>
                        </InputGroup>
                    </Col>
                </Row>
                <hr className={"style-seven"}/>

                {this.getStats()}

            </div>
        );
    }
}

export default Statblock;
