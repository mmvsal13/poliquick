import React from 'react';
import './Marker.css';

const Marker = (props: any) => {
    const { color, name } = props;
    return (
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      >
        <p className="labels"><strong>{props.name}</strong></p>
        </div>
    );
  };

  export default Marker;


  