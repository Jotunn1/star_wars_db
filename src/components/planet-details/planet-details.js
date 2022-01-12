import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
export default class PlanetDetails extends Component {
    swapiService = new SwapiService()
    state = {
        planet: null
    };
    componentDidMount() {
        this.updatePlanet();
    }
    componentDidUpdate(prevProps) {
        if (this.props.planetId !== prevProps.planetId) {
            this.updatePlanet();
        }
    }
    updatePlanet() {
        const { planetId } = this.props;
        if (!planetId) {
            return;
        }
        this.swapiService
            .getPlanet(planetId)
            .then((planet) => {
                this.setState({ planet });
            });
    }
    render() {
        if (!this.state.planet) {
            return <p> 🠐Select a planet from a link</p>
        }
        const { id, name, rotationPeriod, population, diameter } = this.state.planet;
        return (
            <div className="person-details card">
                <img className="person-image"
                    src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                    alt={`Planet ${name} `} />
                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">

                        <li className="list-group-item">
                            <span className="term">Diameter</span>
                            <span>{diameter} </span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Rotation Period</span>
                            <span>{rotationPeriod}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Population</span>
                            <span>{population / 1000000} M</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}