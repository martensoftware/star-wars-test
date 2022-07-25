import React from 'react';
import ApiService from '../services/api.service';
import './planet-list.scss';
import { Navigate } from 'react-router-dom';
import { getPlanetsFromSession } from '../services/planets';

class PlanetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { planets: [], planet: null };
  }

  navigateToPlanet(planet) {

    this.setState({ planet: planet });
    console.log(this.state);
  }

  async componentDidMount(props) {
    let ps = getPlanetsFromSession();
    if (ps == null) {
      ps = await ApiService.GetPlanets();
    }

    this.setState({ planets: [...ps] }, () => {
      this.listPlanets = this.state.planets.map((planet) => {
        return (
          <div onClick={() => this.navigateToPlanet(planet)} className='list-item' key={planet.name.toString()}>
            {planet.name}
          </div>
        )

      });
    });

    this.forceUpdate();
  }

  updateList(event) {
    let text = event.target.value
    let matches = getPlanetsFromSession().filter(a => a.name.toLowerCase().includes(text));
    this.setState({ planets: [...matches] }, () => {

      this.listPlanets = this.state.planets.map((planet) => {
        return (
          <div onClick={() => this.navigateToPlanet(planet)} className='list-item' key={planet.name.toString()}>
            {planet.name}
          </div>
        )
      });
      this.forceUpdate();
    });
  }

  render() {

    let p = this.state.planet;
    return (
      <div>
        <div className='flex-row search-container'>
          <label className='label-margin'>Search:</label>
          <input className='search-box' type={'text'} onChange={(event) => this.updateList(event)} />
        </div>

        {this.listPlanets}
        {p && (<Navigate to={`/planets/${p.name}`} replace={true} state={{planet: p}} />)}
      </div>

    );
  }
}

export default PlanetList;