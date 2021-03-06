
export default class SwapiService {
    _apiBase = "https://swapi.dev/api"
    async getResources(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch${this._apiBase}${url},` +
                `received ${res.status}}`)
        }
        const body = await res.json();
        return body;
    }
    getAllPeople = async () => {
        const res = await this.getResources("/people/")
        return res.results.map(this._transformPerson)
    }
    async getPerson(id) {
        const person = await this.getResources(`/people/${id}/`)
        return this._transformPerson(person)
    }
    getAllPlanets = async () => {
        const res = await this.getResources("/planets/")
        return res.results.map(this._transformPlanet)
    }
    async getPlanet(id) {
        const planet = await this.getResources(`/planets/${id}/`);
        return this._transformPlanet(planet)
    }
    getAllStarships = async () => {
        const res = await this.getResources("/starships/")
        return res.results.map(this._transformStarship)
    }
    async getStarship(id) {
        const starship = await this.getResources(`/starships/${id}/`);
        return this._transformStarship(starship)
    }
    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }
    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }
    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            height: person.height,
            hairColor: person.hair_color.toUpperCase(),
            gender: person.gender.toUpperCase(),
            eyeColor: person.eye_color.toUpperCase(),
            birthYear: person.birth_year
        }
    }
    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            crew: starship.crew,
            costInCredit: starship.cost_in_credits,
            length: starship.length,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity
        }
    }
}

