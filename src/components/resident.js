import { useLocation } from 'react-router-dom';
import './resident.scss';

export default function Resident() {
  const location = useLocation();
  let resident = location.state.resident;
  console.log(resident);

  return (
    <div className='flex-row align-center'>
      <div className='flex-column resident-card'>
        <div className='flex-row resident-card-title'>
          <span>{resident.name}</span>
        </div>
        <div className='flex-row'>
          <div className='flex-column resident-card-content'>
            <span>Birth Year: {resident.birth_year}</span>
            <span>Gender: {resident.gender}</span>
            <span>Height: {resident.height}</span>
            <span>Mass: {resident.height}</span>
          </div>
        </div>

      </div>
    </div>
  )
}