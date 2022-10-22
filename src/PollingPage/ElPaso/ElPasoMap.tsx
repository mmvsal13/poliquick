import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';
import data from '../Locations.json'

//Function that creates a map in Miami, Florida
const ElPasoMap = (props: any) => {
    // coordinates for miami florida
    const [center, setCenter] = useState({lat: 31.669543, lng: -106.510953 });
    //TODO: find out what this does lol. What does 11 mean?
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
      data.elPaso.map( row =>
          <Marker
            name={row.id}
            lat={row.lat}
            lng={row.long}
          />
          )
  )
}

export default ElPasoMap;
