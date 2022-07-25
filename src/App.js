//import logo from './logo.svg';
import './App.scss';
//import apiService from './services/api.service';
//import PlanetListItem from './components/planet-list-item';
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { withRouter } from './services/with-router';

class App extends React.Component {
  constructor(props) {
    super(props)

    console.log(this.props.router.location);
    //this.location = useLocation();
  }

  getBreadcrumbs() {
    let path = this.props.router.location.pathname
    let crumbsArray = path.split("/");
    crumbsArray = crumbsArray.filter(o => o);
    console.log(crumbsArray);
    let links = [(<div></div>)];
    for (let i = 0; i < crumbsArray.length; i++) {
      const element = crumbsArray[i];
      let urlPath = path.substring(0, (path.indexOf(element) + element.length));
      console.log(urlPath);
      let decode = decodeURI(element)
      decode = decode.toUpperCase();
      let slash = ' /';
      if (i === crumbsArray.length - 1) {
        slash = '';
      }
      if (element != null && element) {
        links.push((<Link key={element} className='planets-button' to={urlPath}>{decode}{slash}</Link>))
      }
    }
    return links;
  }

  render() {
    return (
      <div className="App flex-column">
        <div className='top-bar flex-row'>
          <span className='title flex-fill'>Star Wars</span>
        </div>
        <div className='flex-column'>
          <div className='flex-row bread-crumbs'>
            {this.getBreadcrumbs()}
          </div>

          <Outlet />
        </div>
      </div>
    )
  };
}


export default withRouter(App);
