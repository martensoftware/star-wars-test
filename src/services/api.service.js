import { getPlanetsFromSession, setPlanetsInSession } from "./planets";

const ApiService = {
  GetPlanets: async() => {

    // let sessionPlanets = getPlanetsFromSession();
    // if (sessionPlanets != null) {
    //   console.log('getting planets from memory')
    //   console.log(sessionPlanets);
    //   return sessionPlanets;
    // }

    let url = 'https://swapi.dev/api/planets';
    let data = await fetch(url);
    let json = await data.json();
    let all = [...json.results];

    let nextUrl = json.next;

    while (nextUrl != null) {
      let temp = await fetch(nextUrl);
      let tempJson = await temp.json();
      all.push(...tempJson.results);
      nextUrl = tempJson.next;
    }

    setPlanetsInSession(all);

    return all;
  },

  GetPlanet: (planet) => {
    let planets = getPlanetsFromSession();
    let planetInfo = planets.find(a => a.name === planet);
    return planetInfo;
  },

  GetInhabitants: async (planet) => {
    let inhabitants = [];
    for (let index = 0; index < planet.residents.length; index++) {
      const element = planet.residents[index];
      let data = await fetch(element);
      let json = await data.json();
      inhabitants.push(json);
    }

    return inhabitants;
  }
}

export default ApiService;
  
