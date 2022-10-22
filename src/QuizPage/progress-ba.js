import React from 'react'
import ReactDOM from 'react-dom'

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;

    const containerStyles = {
      height: 20,
      width: '80%',
      backgroundColor: "#ebebeb",
      borderRadius: 50,
      margin: 'auto',
      position: 'sticky'
    }

    const fillerStyles = {
      height: '100%',
      transition: 'width 1s ease-in-out',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }

    const labelStyles = {
      padding: 5,
      color: 'gray',
      fontWeight: 'bold'
    }

    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    );
  };

  export default ProgressBar;
