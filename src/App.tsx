import { useEffect, useState } from 'react';
import LocationInfo, { LocationInfoProps } from './components/LocationInfo';
import { api } from './services/axios';

import './styles/geolocation.css';

function App() {
  const [locationResponse, setLocationResponse] = useState<LocationInfoProps>();

  useEffect(() => {
    updateLocationDetails({
      query: '0.0.0.0',
      country: '',
      regionName: '',
      city: '',
      timezone: '',
      lat: '',
      lon: ''
    });
  }, []);

  async function getMyLocation() {
    await api.get('json/').then((response: { data: any; }) => {
      updateLocationDetails(response.data);
    });
  }

  function resetLocationDetails() {
    updateLocationDetails({
      query: '0.0.0.0',
      country: '',
      regionName: '',
      city: '',
      timezone: '',
      lat: '',
      lon: ''
    });
  }

  function updateLocationDetails(data: any){
    setLocationResponse({
      query: data.query,
      country: data.country,
      regionName: data.regionName,
      city: data.city,
      timezone: data.timezone,
      lat: data.lat,
      lon: data.lon,
      isp: data.isp,
    });
  }

  return (
    <div className="container">
      <h1 id="title">GeoLocation Test</h1>
      <hr className="divider"></hr>
      <section id="mainContent"> 
        <section id="geoLocationContainer" className="">
          <LocationInfo {...locationResponse}/>

          <menu>
            <button onClick={getMyLocation} id="btnMyLocation">My location</button>
            <button onClick={resetLocationDetails} id="btnResetLocation">Reset location</button>
          </menu>
        </section>
      </section>
    </div>
  );
}

export default App;
