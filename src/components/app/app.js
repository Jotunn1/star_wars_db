import React, { useState } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import PlanetDetails from '../planet-details';
import StarshipDetails from '../starship-details';


import './app.css';
import SwapiService from '../../services/swapi-service';

const App = () => {
    const swapiService = new SwapiService();
    const [person, setPerson] = useState(1)
    const [planet, setPlanet] = useState(2)
    const [starship, setStarship] = useState(1)
    const onPersonSelected = (id) => {
        setPerson(id)
    };
    const onPlanetSelected = (id) => {
        setPlanet(id)
    };
    const onStarshipSelected = (id) => {
        setStarship(id)
    };
    return (
        <div className='container'>
            <Header />
            <RandomPlanet />
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList
                        getData={swapiService.getAllPeople}
                        onItemSelected={onPersonSelected} />
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={person} />
                </div>
            </div>
            <div className="planet-info row mb2">
                <div className="col-md-6">
                    <ItemList
                        getData={swapiService.getAllPlanets}
                        onItemSelected={onPlanetSelected} />
                </div>
                <div className="col-md-6">
                    <PlanetDetails planetId={planet} />
                </div>
            </div> <div className="planet-info row mb2">
                <div className="col-md-6">
                    <ItemList
                        getData={swapiService.getAllStarships}
                        onItemSelected={onStarshipSelected} />
                </div>
                <div className="col-md-6">
                    <StarshipDetails starshipId={starship} />
                </div>
            </div>
        </div>
    );
};

export default App;