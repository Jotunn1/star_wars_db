import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './random-planet.css';

export default class RandomPlanet extends Component {
    swapiService = new SwapiService();
    state = {
        planet: {},
        loading: true,
        isError: false
    }
    constructor() {
        super()
        this.updatePlanet()
    }
    onError = (err) => {
        console.log(err);
        this.setState({
            isError: true
        })
    }
    onPlanetLoaded = (planet) => {
        this.setState({ planet, loading: false })
    }
    updatePlanet() {
        const id = Math.floor(Math.random() * 15)
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    }
    render() {

        const { planet, loading, isError } = this.state
        const spinner = loading && !isError ? <Spinner /> : null
        const content = !loading && !isError ? <ViewPlanet planet={planet} /> : null
        const errorMessage = isError ? <ErrorIndicator /> : null;
        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}
const ViewPlanet = ({ planet }) => {
    const { id, population, rotationPeriod, diameter, name } = planet;
    return (
        <React.Fragment>
            <img className="planet-image"
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                alt={name} />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}