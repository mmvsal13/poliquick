import React from "react";
import { pages } from "../App";
import {ElectionPage} from "../ElectionsPage/Elections"
import {ResultsTable} from "../ElectionsPage/ResultsTable"
import Jeanette from "../ElectionsPage/pics/politician2.jpg"
import NavBar from "../components/NavBar"
import "./politicianProfile.css"

//bootstrap
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button';
//Vanessa: Lucienne, Anika

//REDUX
import { IPoliquickState, Person } from '../redux/types';
import { connect } from 'react-redux';

export interface Jeanette{
    changePage: (page: pages) => void;
    you: Person;
}

class JeanettePage extends React.Component<Jeanette> {
    render() {
        return (
            <div>
              <NavBar
                changePage={this.props.changePage}/>
                <h1 className="Names"> Jeanette </h1>
                <Button onClick={(e) => this.props.changePage(pages.ElectionPage)} className="BackText" variant="dark">Back</Button>
                <img src={Jeanette} alt="Could Not Display" className="PoliticianPhotos"></img>
                <h4 className="Position">Candidate for City Council</h4>
                <ResultsTable
                questions ={ElectionPage.MiamiQuestions}
                userResults={this.props.you.quiz}
                politicianName={"Jeanette"}
                politicianIndex = {1}
                politicianResults={ElectionPage.quizAnswers}
                >
                </ResultsTable>
                <Footer />
            </div>
        );
    }


}

//REDUX

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
  )(JeanettePage);

  export { connectedComponent as JeanettePage }
