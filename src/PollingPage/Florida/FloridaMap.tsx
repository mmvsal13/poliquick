import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';
import data from '../Locations.json'

//Function that creates a map in Miami, Florida
const FloridaMap = (props: any) => {
    // coordinates for miami florida, Screen renders at these coordinates
    const [center, setCenter] = useState({lat: 25.5217, lng: -80.3018 });
    //Controls the sensitivity of the zoom function
    const [zoom, setZoom] = useState(10.5);
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

//Uses Locations.json latitude and longitude attributåes to place markers
function populateMap() {
  return(
    //TODO: ADD LEGEND
      data.miami.map( row =>
          <Marker
            name={row.id}
            lat={row.lat}
            lng={row.long}
          />
          )
  )
}

//TODO: FOR FUTURE USE FIND OUT HOW TO TAKE USER TO GOOGLE MAPS PAGE WHEN THEY CLICK ON
//MARKER
function showInMapClicked(lat: number, long: number) {
  window.open("https://maps.google.com?q="+ lat+","+ long)
}

export default FloridaMap;



