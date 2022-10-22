import React from "react";
import { pages } from "../App";
import {ElectionPage} from "../ElectionsPage/Elections"
import {ResultsTable} from "../ElectionsPage/ResultsTable"
import Willie from "../ElectionsPage/pics/politician12.jpg"
import "./politicianProfile.css"
import Footer from '../components/Footer';

import NavBar from "../components/NavBar"
//Vanessa: Lucienne, Anika

//REDUX
import { IPoliquickState, Person } from '../redux/types';
import { connect } from 'react-redux';

export interface Willie{
    changePage: (page: pages) => void;
    you: Person;
}

class WilliePage extends React.Component<Willie> {
    render() {
        return (
            <div>
              <NavBar
                changePage={this.props.changePage}/>
                <h1 className="Names"> Anika </h1>
                <img src={Willie} alt="Could Not Display" className="PoliticianPhotos"></img>
                <h4 className="Position">Candidate for Mayor</h4>
                <ResultsTable
                questions ={ElectionPage.CambridgeQuestions}
                userResults={this.props.you.quiz}
                politicianName={"Willie"}
                politicianIndex = {11}
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
  )(WilliePage);

  export { connectedComponent as WilliePage }
