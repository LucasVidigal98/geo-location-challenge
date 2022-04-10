/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import LocationInfo, { LocationInfoProps } from './components/LocationInfo';
import LocationMap, { Location } from './components/LocationMap';
import { api } from './services/axios';

import './styles/geolocation.css';

function App() {
  const [locationResponse, setLocationResponse] = useState<LocationInfoProps>();
  const [locations, setLocations] = useState<Location[]>([]);
  const [urlLocation, setUrlLocation] = useState<Location>();
  const [url, setUrl] = useState('');

  const [showMap, setShowMap] = useState(false);

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
      configMap(response.data);
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

    setLocations([urlLocation as Location]);
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

  async function getUrlLocation() {
    const searchUrl = url;

    await api.get(`json/${searchUrl}`).then((response: any) => {
      if (response.data.status !== 'fail') { 
        configMap(response.data, true);
      } else {
        alert('Please enter a valid URL, Example: www.web-site.com');
      }
    });
  }

  function configMap(loc: Location, url = false) {
    if (showMap) {
      setLocations([...locations, loc]);
    } else {
      setLocations([loc]);
      if(url) setUrlLocation(loc);
      setShowMap(true);
    }
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

            <div className='urlLocaltion'>
              <input type="text"  placeholder='URL' onChange={(event) => setUrl(event.target.value)}/>
              <button onClick={getUrlLocation}>Locate</button>
            </div>

            {showMap && <LocationMap locations={locations}/>}
          </menu>
        </section>
      </section>
    </div>
  );
}

export default App;
