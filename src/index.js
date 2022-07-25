import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Planet from './components/planet';
import PlanetList from './components/planet-list';
import Resident from './components/resident';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<PlanetList />} />
          <Route path='Planets' element={<PlanetList />} />
          <Route path='Planets/:planet' element={<Planet />} />
          <Route path='Planets/:planet/:resident' element={<Resident />} />

          <Route
            path='*'
            element={
              <main>
                <p>These aren't the droids you're looking for...</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
