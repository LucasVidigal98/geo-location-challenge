import '../styles/geolocation.css';

export interface LocationInfoProps {
  query?: string;
  country?: string;
  regionName?: string;
  city?: string;
  timezone?: string;
  lat?: string;
  lon?: string;
  isp?: string;
}

function LocationInfo({
  query,
  country,
  regionName,
  city,
  timezone,
  lat,
  lon,
  isp,
}: LocationInfoProps) {
  function help(fieldName: string) {
    const now = new Date();


    alert("This is your " + fieldName + " from ISP " + isp + " at " + now);
  }


  return (
    <>
      <h4>Estimated location</h4>

      <table className={country?.length ? '' : 'empty'} style={{margin: "0 auto"}} >
        <tbody>
          <tr>
            <td className="field_name">IP</td>
            <td id="location_query" className="location_value">{ query }</td>
            <td><button onClick={() => help('IP')} className="help">?</button></td>
          </tr>
          <tr>
            <td className="field_name">Country</td>
            <td id="location_country" className="location_value">{country}</td>
            <td><button onClick={() => help('Country')} className="help">?</button></td>
          </tr>
          <tr>
            <td className="field_name">Region</td>
            <td id="location_regionName" className="location_value">{regionName}</td>
            <td><button onClick={() => help('Region')} className="help">?</button></td>
          </tr>
          <tr>
            <td className="field_name">City</td>
            <td id="location_city" className="location_value">{city}</td>
            <td><button onClick={() => help('City')} className="help">?</button></td>
          </tr>
          <tr>
            <td className="field_name">Time Zone</td>
            <td id="location_timezone" className="location_value">{timezone}</td>
            <td><button onClick={() => help('Time Zone')} className="help">?</button></td>
          </tr>
          <tr>
            <td className="field_name">Latitude</td>
            <td id="location_lat" className="location_value">{lat}</td>
            <td><button onClick={() => help('Latitude')} className="help">?</button></td>
          </tr>
          <tr>
            <td className="field_name">Longitude</td>
            <td id="location_lon" className="location_value">{lon}</td>
            <td><button onClick={() => help('Longitude')} className="help">?</button></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default LocationInfo;