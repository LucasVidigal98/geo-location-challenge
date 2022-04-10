/* eslint-disable react-hooks/exhaustive-deps */
import { Marker, Map } from "pigeon-maps";
import { useEffect, useState } from "react";

export interface LocationMapProps {
  locations: Location[]
}

export interface Location {
  lat?: number;
  lon?: number;
  city?: string;
  country?: string;
}

function LocationMap({
  locations,
}: LocationMapProps) {
  const [PigeonMarkers, setPigeonMarkers] = useState<any[]>([]);

  useEffect(() => {
    const locs = locations.map((location) => {
      return <Marker key={`${location.city}_${location.country}`} anchor={[location.lat || 0, location.lon || 0]} payload={`${location.city} ${location.country}`} />;
    });

    setPigeonMarkers(locs);
  }, [locations]);

  const mapConfig = {
    center: [52.499219, 13.425416],
    zoom: 1
  };
 
  return (
    <>
      <Map
        width={400}
        height={400}
        defaultCenter={[mapConfig.center[0], mapConfig.center[1]]}
        defaultZoom={mapConfig.zoom}
      >
        {PigeonMarkers}
      </Map>
    </>
  )
}

export default LocationMap;