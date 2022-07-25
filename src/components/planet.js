import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ApiService from '../services/api.service';

export default function Planet() {
  let { planet } = useParams();
  console.log(planet);
  const location = useLocation();

  let [residents, setResidents] = useState(<div></div>);

  let [loading, setLoading] = useState(<span>Loading...</span>);


  let planetInfo = location.state?.planet;
  console.log(planetInfo);
  if (!planetInfo) {
    planetInfo = ApiService.GetPlanet(planet);
  }

  let gotPlanetInfo = planetInfo != null;

  let navigate = useNavigate();

  const cb = useCallback(() => {
    return gotPlanetInfo;
  }, [gotPlanetInfo])

  useEffect(() => {
    ApiService.GetInhabitants(planetInfo).then(result => {
      console.log('getinhabitants');
      console.log(result);
      let res = result.map((resident) => {
        return (
          <div className='list-item' onClick={() => { navigate(resident.name, { state: { resident: resident } }) }} key={resident.name.toString()}>
            {resident.name}
          </div>
        )
      })
      setLoading((<div></div>));
      setResidents(res);
    })
  }, [navigate, cb])


  // ApiService.GetInhabitants(planetInfo).then(result => {
  //   console.log(result)
  //   let res = result.map((resident) => {
  //     return (
  //       <div className='list-item' key={resident.name.toString()}>
  //         {resident.name}
  //       </div>
  //     )
  //   })
  //   console.log('setting residents state');
  //   setResidents(res);
  // });


  return (
    <div className='flex-column'>
      <span>Planet Name: {planetInfo.name}</span>
      <span>Climate: {planetInfo.climate}</span>
      <span>Number of Resdients: {planetInfo.residents.length}</span>
      {residents}
      {loading}
    </div>
  )
}
