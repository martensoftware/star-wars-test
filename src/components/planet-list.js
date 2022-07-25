import React from 'react';
import ApiService from '../services/api.service';
import './planet-list.scss';
import { Navigate } from 'react-router-dom';
import { getPlanetsFromSession } from '../services/planets';

class PlanetList extends React.Component {
  constructor(props) {
    super(props);
    //this.planets = [];
    this.state = { planets: [], planet: null };
  }

  // async getPlanets() {
  //   this.planets = await ApiService.getPlanets();
  //   console.log(this.planets);
  // }

  navigateToPlanet(planet) {

    this.setState({ planet: planet });
    console.log(this.state);
  }

  async componentDidMount(props) {
    let ps = getPlanetsFromSession();
    if (ps == null) {
      ps = await ApiService.GetPlanets();
    }

    //let array = [...ps];
    console.log(ps);
    this.setState({ planets: [...ps] }, () => {
      console.log(this.state)
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

  // componentWillUnmount() {
  //   this.setState({ planets: [], planet: null })
  // }

  updateList(event) {
    let text = event.target.value
    console.log(text);
    let matches = getPlanetsFromSession().filter(a => a.name.toLowerCase().includes(text));
    console.log(matches);
    this.setState({ planets: [...matches] }, () => {
      console.log(this.state);

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