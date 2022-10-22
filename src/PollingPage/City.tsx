import React from "react";
import FloridaMap from "./Florida/FloridaMap";
import CambridgeMap from "./Cambridge/CambridgeMap";
import ElPasoMap from "./ElPaso/ElPasoMap"
import FloridaLocations from './Florida/FloridaTable'
import CambridgeLocations from './Cambridge/CambridgeTable'
import ElPasoLocations from './ElPaso/ElPasoTable'
import NavBar from '../components/NavBar'
import Confetti from '../components/Confetti'
import '../components/Confetti.css'
import { IPoliquickState, Person } from '../redux/types';
import { connect } from 'react-redux';
import { pages } from "../App";
import "./City.css"
import Button from 'react-bootstrap/Button';

//TODO: ADD YOUR HERE
//TODO: WHEN YOU CLICK ON A DOT IT TAKES YOU TO GOOGLE MAPS

//the react component city is formated by this interface

type myProps = {
    changePage: (page: pages) => void;
    you: Person;
}

type myState = {
    voted: boolean;
}

//layout for the page itself is in this component, place tells us what to render
class City extends React.Component<myProps, myState>{
    constructor(props: any) {
        super(props)
        this.state = {
            voted: false
        }
    }


    //Conditionally renders the map component based on the state of the current obj
    //fix rendering
    options() {
        if(this.props.you.city === "Miami") {
            return <FloridaMap/>
        }
        if(this.props.you.city === "Cambridge") {
            return <CambridgeMap/>
        }
        if(this.props.you.city==="El Paso") {
            return <ElPasoMap/>
        }
    }

    //conditionally renders the list of polling addresses based on the state of curr obj
    optionsTable() {
        if(this.props.you.city === "Miami") {
            return <FloridaLocations/>
        }
        if(this.props.you.city=== "Cambridge") {
            return <CambridgeLocations/>
        }
        if(this.props.you.city==="El Paso") {
            return <ElPasoLocations/>
        }
    }

    documents() {
        if(this.props.you.city === "Miami") {
            return "Remember to bring: A valid government issued photo ID"
        }
        if(this.props.you.city === "Cambridge") {
            return "No documents required to vote in Cambridge, MA"
        }
        if(this.props.you.city ==="El Paso") {
            return "Remember to bring: A valid government issued photo ID"
        }
    }

    handleVote() {
        this.setState({
            voted: true
        })
    }


  render() {
    return (
        <div>
        <NavBar
        changePage={this.props.changePage}></NavBar>
        {this.state.voted ? <Confetti/> : null}
        <div className="City">
            <h1 className="header"><strong>Permanent polling places in {this.props.you.city}</strong></h1>
            <div className="map">
                {this.options()}
            </div>
            <div className="locations">
                {this.optionsTable()}
            </div>
            <p className="docs">{this.documents()}</p>
            <Button className="vote" onClick={(e)=> this.handleVote()} variant="dark">I VOTED!</Button>
            {/* figure out reusable component for confetti */}
            </div>
            </div>
    )
  }
}

function mapStateToProps(state: IPoliquickState) {
    return {
      you: state.currentUser // "currentUser" in Redux state is 'you' on this page
    }
  }

  // Map redux actions to component props
  // This function returns an object with 2 functions that the component can call
  // increase... fires a dispatch with increase... as a type
  function mapDispatchToProps(dispatch: any) {
    return {
      // no actions on this page / screen
    }
  }

    // The Hight Order Component (HOC)
  // props need to be recived by the component
  const connectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(City);

  export { connectedComponent as City }
