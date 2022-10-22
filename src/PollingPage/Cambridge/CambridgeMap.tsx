import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';
import data from '../Locations.json'

//Function that creates a map in Miami, Florida
const CambridgeMap = (props: any) => {
    // coordinates for cambridge
    const [center, setCenter] = useState({lat: 42.373611, lng: -71.110558 });
    const [zoom, setZoom] = useState(11);
    return (
      //TODO: Format map container
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAyycgRz0zPN3HGahb-G2reyBi_iVjNdkA' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
        {/* function that creates markers for diff poll locations */}
        {populateMap()}
        </GoogleMapReact>
      </div>
    );
}

//Uses Locations.json latitude and longitude attributes to place markers
function populateMap() {
  return(
      data.cambridge.map( row =>
          <Marker
            name={row.id}
            lat={row.lat}
            lng={row.long}
          />
          )
  )
}

export default CambridgeMap;
