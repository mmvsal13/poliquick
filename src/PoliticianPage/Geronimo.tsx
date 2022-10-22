import React from "react";
import { pages } from "../App";
import {ElectionPage} from "../ElectionsPage/Elections"
import {ResultsTable} from "../ElectionsPage/ResultsTable"
import Geronimo from "../ElectionsPage/pics/politician7.jpg"
import NavBar from "../components/NavBar"
import "./politicianProfile.css"

//bootstrap
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button';
//Hein: Gernomio LMAO

//REDUX
import { IPoliquickState, Person } from '../redux/types';
import { connect } from 'react-redux';

interface GeronimoProps{
    changePage: (page: pages) => void;
    you: Person;
}


class GeronimoPage extends React.Component<GeronimoProps> {
    render() {
        return (
            <div>
              <NavBar
                changePage={this.props.changePage}/>
                <h1 className="Names"> Geronimo</h1>
                <Button onClick={(e) => this.props.changePage(pages.ElectionPage)} className="BackText" variant="dark">Back</Button>
                <img src={Geronimo} alt="Could Not Display" className="PoliticianPhotos"></img>
                <h4 className="Position">
                    Candidate for Mayor
                    </h4>
                <ResultsTable
                questions ={ElectionPage.ElPasoQuestions}
                userResults={this.props.you.quiz}
                politicianName={"Geronimo"}
                politicianIndex = {8}
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
  )(GeronimoPage);

  export { connectedComponent as GeronimoPage }
