import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import './person-details.css';

export default class PersonDetails extends Component {
    swapiService = new SwapiService()
    state = {
        person: {}
    }
    constructor() {
        super()
        this.getPersonInfo()
    }
    onPersonLoaded = (person) => {
        this.setState({ person })
    }
    getPersonInfo() {
        const id = Math.floor(Math.random() * 80)
        this.swapiService
            .getPerson(id)
            .then(this.onPersonLoaded)
    }

    render() {
        const { person: { id, name, height, hairColor, gender, eyeColor, birthYear } } = this.state
        return (
            <div className="person-details card">
                <img className="person-image"
                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                    alt={`${name} photo`} />
                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Hair Color</span>
                            <span>{hairColor}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Height</span>
                            <span>{height}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}