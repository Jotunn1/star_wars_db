import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import './starship-details.css';

export default class StarshipDetails extends Component {
    swapiService = new SwapiService()
    state = {
        starship: null
    };
    componentDidMount() {
        this.updateStarship();
    }
    componentDidUpdate(prevProps) {
        if (this.props.starshipId !== prevProps.starshipId) {
            this.updateStarship();
        }
    }
    updateStarship() {
        const { starshipId } = this.props;
        if (!starshipId) {
            return;
        }
        this.swapiService
            .getStarship(starshipId)
            .then((starship) => {
                this.setState({ starship });
            });
    }
    render() {
        if (!this.state.starship) {
            return <p> 🠐Select a starship from a link</p>
        }
        console.log(this.state.starship);
        const { id, name, model, manufacturer, crew, costInCredit } = this.state.starship;
        return (
            <div className="person-details card">
                <img className="person-image"
                    src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
                    alt={`${name} photo`} />
                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Model</span>
                            <span>{model}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Manufacturer</span>
                            <span>{manufacturer}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Crew</span>
                            <span>{crew}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Cost In Credits</span>
                            <span>{costInCredit} </span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}