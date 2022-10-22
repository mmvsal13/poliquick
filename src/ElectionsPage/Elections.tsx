import React, { TdHTMLAttributes } from "react";
import { pages, filterType } from "../App";
import "./ElectionsPage.css"
import {Poli} from "./Politicians"
import {politician} from "./Politicians";
import Card from './Card';
import NavBar from "../components/NavBar"
import DropDown from "./SortByPositionDropdown"
import Footer from '../components/Footer';

//Trying
import Button from 'react-bootstrap/Button';
import {match} from "./match"
import Confetti from '../components/Confetti'

//Redux
import { IPoliquickState, Person } from '../redux/types';
import { connect } from 'react-redux';

/*
These imports are for the politicians pictures
*/
import politician1 from "./pics/politician1.jpg"
import politician2 from "./pics/politician2.jpg"
import politician3 from "./pics/politician3.jpg"
import politician4 from "./pics/politician4.jpg"
import politician5 from "./pics/politician5.jpg"
import politician6 from "./pics/politician6.jpg"
import politician7 from "./pics/politician7.jpg"
import politician8 from "./pics/politician8.jpg"
import politician9 from "./pics/politician9.jpg"
import politician10 from "./pics/politician10.jpg"
import politician11 from "./pics/politician11.jpg"
import politician12 from "./pics/politician12.jpg"

type ElectionPageProps = {
    //STRECH GOAL: make change filter an action with REDUX
 changePage: (page: pages) => void;
 filter: filterType
 changeFilter: (filter: filterType) => void
 you: Person
}
type myState = {
    userResults: number[];
    confetti: boolean;
}

class ElectionPage extends React.Component<ElectionPageProps, myState> {

    constructor(props: any) {
        super(props)
        this.state = {
            userResults : this.props.you.quiz,
            confetti: true
        }
    }

 render() {
 {/*
 This will check whether the filter is set to house, senate, or all
 filter is by default all to show both cards and is changed in SortByPositionDropdown.tsx
 When the options are clicked on the dropdown, changeFilter is called based on what they selected
 the house card is rendered if filter is of filter type house or filter type all
 the senate card is be rendered if filter is of filter type senate or filter type all
 */}
 const cityCouncil=this.props.filter === filterType.CityCouncil || this.props.filter===filterType.All
 ? <Card election="City Council" date="11/3/2020" >
 <Poli politicianArr={this.politicianArrMayorCandidates()} changePage={this.props.changePage} you= {this.props.you}>
 </Poli>
 </Card>
 :null

 const mayor=this.props.filter === filterType.Mayor || this.props.filter===filterType.All
 ? <Card election="Mayor" date="11/3/2020">
 <Poli politicianArr={this.politicianArrCityCouncilCandidates()} changePage={this.props.changePage} you= {this.props.you}>
 </Poli>
 </Card>
 :null

        return (
            <>
            <div className="election-body">
                <NavBar
                changePage={this.props.changePage}/>
                <h1 className="election-header">
                    <strong>
                    Here are your matches!
                    </strong>
                </h1>
                    <p className="Filter">
                    <DropDown buttonText="Filter by position" item1="Mayor" item2="City Council" item3="Reset" changeFilter={this.props.changeFilter}>
                    </DropDown>

                    </p>

                    <div className="elections-layout">

                    {/*Here the house and senate cards will be rendered together by default
                    Once the filter changes then only one will be displayed*/}
                    {cityCouncil}
                    {mayor}

                    </div>

            </div>
            <Footer />
            </>
        );
    }

    //Two politician arrays: one for candidates running for state senate. another for candidates running for the house of representatives for their district
    politicianArrCityCouncilCandidates(): politician[] {
        return [
            {name:"Andrew Hills", match: match(this.state.userResults, ElectionPage.quizAnswers[0]), picture: politician1, city: "Miami", runningFor: "District X House of Representatives", quizResults: ElectionPage.quizAnswers[0], pg:pages.PoliticianPage},
            {name:"Jeanette Lewis", match: match(this.state.userResults, ElectionPage.quizAnswers[1]), picture: politician2, city: "Miami", runningFor : "District X House of Representatives", quizResults: ElectionPage.quizAnswers[1],pg:pages.PoliticianPage},
            {name:"Lucienne Ellis", match: match(this.state.userResults, ElectionPage.quizAnswers[2]), picture: politician5, city: "El Paso", runningFor : "District X House of Representatives", quizResults: ElectionPage.quizAnswers[2],pg:pages.Lucienne},
            {name:"Elise Trevaley", match: match(this.state.userResults, ElectionPage.quizAnswers[3]), picture: politician6, city: "El Paso", runningFor : "District X House of Representatives", quizResults: ElectionPage.quizAnswers[3],pg:pages.Elise},
            {name:"Cabal Perry", match: match(this.state.userResults, ElectionPage.quizAnswers[4]), picture: politician9, city: "Cambridge", runningFor: "District X House of Representatives", quizResults: ElectionPage.quizAnswers[4], pg:pages.PoliticianPage},
            {name:"Lori Graham", match: match(this.state.userResults, ElectionPage.quizAnswers[5]), picture: politician10, city: "Cambridge", runningFor: "District X House of Representatives", quizResults: ElectionPage.quizAnswers[5],pg:pages.PoliticianPage}
        ]
    }
    politicianArrMayorCandidates(): politician[] {
        return [
            {name:"Cristopher Wells", match: match(this.state.userResults, ElectionPage.quizAnswers[6]), picture: politician3, city: "Miami", runningFor : "State Senate", quizResults: ElectionPage.quizAnswers[6],pg:pages.PoliticianPage},
            {name:"Kye Gardener", match: match(this.state.userResults, ElectionPage.quizAnswers[7]), picture: politician4, city: "Miami", runningFor: "State Senate", quizResults: ElectionPage.quizAnswers[7],pg:pages.PoliticianPage},
            {name:"Geronimo Castillo", match: match(this.state.userResults, ElectionPage.quizAnswers[8]), picture: politician7, city:"El Paso", runningFor: "State Senate", quizResults: ElectionPage.quizAnswers[8], pg:pages.Geronimo},
            {name:"Anika Brooks", match: match(this.state.userResults, ElectionPage.quizAnswers[9]), picture: politician8, city: "El Paso", runningFor: "State Senate", quizResults: ElectionPage.quizAnswers[9],pg:pages.Anika},
            {name:"Alan Green", match: match(this.state.userResults, ElectionPage.quizAnswers[10]), picture: politician11, city: "Cambridge", runningFor: "State Senate", quizResults: ElectionPage.quizAnswers[10],pg:pages.PoliticianPage},
            {name: "Willie Evans", match: match(this.state.userResults, ElectionPage.quizAnswers[11]), picture: politician12, city: "Cambridge", runningFor: "State Senate", quizResults: ElectionPage.quizAnswers[11],pg:pages.PoliticianPage}
        ]
    }

    //Cambridge Questions
    static CambridgeQuestions= [
    "The government should be able to determine rent prices ",
    "Government has the responsibility to provide health care to its citizens ",
    "The government should implement a carbon tax ",
    "Abortion should be legal in all circumstances ",
    "Abortion should be legal in some circumstances",
    "Gun purchases should require strict background checks ",
    "Convicted Felons should be able to vote ",
    "Vaccinations, barring medical conditions, should be required for all children ",
    "Government should tax more to balance the budget",
    "Government should spend less to balance the budget ",
    "Stop-and-Frisk is an acceptable way to combat crime ",
    "There should be increased surveillance in public spaces ",
    "Colleges should be required to have their own police force ",
    "Colleges should be responsible for ensuring their students housing ",
    "The city government should be responsible for having enough housing for students",
    "Students should be able to vote in local elections here, even if their permanent address is elsewhere ",
    "The city needs more outreach to engage students in local government  ",
    "The city should collect more monetary payments from the universities  ",
    "Affirmative action is a good system for college ifadmissions ",
    "Tear gas should never be used on unarmed protestors  ",
    "Funding: Condition of Roads/Bridges ",
    "Funding: Public Transportation ",
    "Funding: Police/Security  ",
    "Funding: Building more Affordable Housing ",
    "Funding: Parks and Recreation ",
    "Funding: Public schools ",
    "Funding: Public Health programs (ex: Combatting drug addiction, Mental health resources, Planned parenthood, etc.) ",
    "Funding: Welfare programs"]

    //El Paso Questions
    static ElPasoQuestions = [
        "The government should be able to determine rent prices ",
        "Government has the responsibility to provide health care to its citizens ",
        "The government should implement a carbon tax ",
        "Abortion should be legal in all circumstances",
        "Abortion should be legal in some circumstances",
        "Gun purchases should require strict background checks",
        "Convicted Felons should be able to vote",
        "Vaccinations, barring medical conditions, should be required for all children",
        "Government should tax more to balance the budget",
        "Government should spend less to balance the budget",
        "Stop-and-Frisk is an acceptable way to combat crime",
        "There should be increased surveillance in public spaces",
        "The government should charge peak-hour tolls to combat traffic",
        "The city needs stricter law enforcement on and around the border",
        "I would wait longer to cross the border if it meant that security checks were more thorough",
        "The city should be a haven for undocumented immigrants",
        "Undocumented students and workers should be allowed to remain in the country",
        "We need a physical barrier separating the United States and Mexico",
        "We should accept as many asylum requests from immigrants as possible ",
        "The government should not fund museums that are not profitable ",
        "Funding: Condition of Roads/Bridges ",
        "Funding: Public Transportation ",
        "Funding: Police/Security  ",
        "Funding: Building more Affordable Housing ",
        "Funding: Parks and Recreation ",
        "Funding: Public schools ",
        "Funding: Public Health programs (ex: Combatting drug addiction, Mental health resources, Planned parenthood, etc.) ",
        "Funding: Welfare programs"]


    static MiamiQuestions = [
        "The government should be able to determine rent prices ",
        "Government has the responsibility to provide health care to its citizens ",
        "The government should implement a carbon tax ",
        "Abortion should be legal in all circumstances",
        "There should be more restrictions on legal abortion",
        "Gun purchases should require strict background checks",
        "Convicted Felons should be able to vote",
        "Vaccinations, barring medical conditions, should be required for all children",
        "Government should tax more to balance the budget",
        "Government should spend less to balance the budget",
        "Stop-and-Frisk is an acceptable way to combat crime",
        "There should be increased surveillance in public spaces",
        "The government should charge peak-hour tolls to combat traffic",
        "City government should rely on volunteer work to clean the beaches",
        "The city should allow alcohol on the beach",
        "The city should allow smoking on the beach",
        "The city needs more law enforcement at the beach",
        "Our city should fund tourism marketing",
        "The government should not fund museums that are not profitable",
        "The city should do more to prepare for sea level rising",
        "Funding: Condition of Roads/Bridges ",
        "Funding: Public Transportation ",
        "Funding: Police/Security  ",
        "Funding: Building more Affordable Housing ",
        "Funding: Parks and Recreation ",
        "Funding: Public schools ",
        "Funding: Public Health programs (ex: Combatting drug addiction, Mental health resources, Planned parenthood, etc.) ",
        "Funding: Welfare programs"
    ]

    static quizAnswers= [
        //Andrew Hills
        [3, 4, 3, 4, 2, 4, 4, 4, 4, 2, 1, 1, 1, 1, 2, 3, 2, 1, 1, 4, 3, 4, 1, 5, 3, 5, 4, 5],
        //Jeanette
        [1, 2, 1, 1, 4, 2, 2, 2, 1, 4, 3, 3, 3, 1, 3, 1, 1, 3, 4, 1, 4, 3, 3, 1, 3, 4, 2, 2],
        //Lucienne
        [3, 4, 3, 4, 2, 4, 4, 4, 4, 2, 1, 1, 1, 1, 2, 3, 4, 2, 3, 1, 3, 4, 1, 5, 3, 5, 4, 5],
        //Elise
        [1, 2, 1, 1, 4, 2, 2, 2, 1, 4, 3, 3, 3, 4, 3, 1, 2, 4, 2, 4, 4, 3, 3, 1, 3, 4, 2, 2],
        //Cabal
        [3, 4, 3, 4, 2, 4, 4, 4, 4, 2, 1, 1, 2, 4, 3, 4, 3, 3, 4, 4, 3, 4, 1, 5, 3, 5, 4, 5],
        //Lori
        [1, 2, 1, 1, 4, 2, 2, 2, 1, 4, 3, 3, 3, 4, 3, 2, 2, 3, 2, 2, 4, 3, 3, 1, 3, 4, 2, 2],
        //Cristopher
        [4, 4, 4, 4, 1, 4, 4, 4, 4, 1, 1, 1, 1, 4, 1, 4, 4, 1, 1, 4, 3, 4, 0, 5, 3, 5, 5, 5],
        //Kye
        [1, 1, 1, 4, 1, 1, 4, 1, 1, 4, 1, 1, 1, 1, 4, 4, 4, 1, 4, 1, 3, 3, 3, 1, 2, 3, 2, 2],
        //Geronimo
        [4, 4, 4, 4, 1, 4, 4, 4, 4, 1, 1, 1, 1, 4, 1, 4, 4, 4, 1, 1, 3, 4, 0, 5, 3, 5, 5, 5],
        //Anika
        [1, 1, 1, 4, 1, 1, 4, 1, 1, 4, 1, 1, 1, 1, 4, 4, 3, 4, 1, 4, 3, 3, 3, 1, 2, 3, 2, 2],
        //Alan
        [4, 4, 4, 4, 1, 4, 4, 4, 4, 1, 1, 1, 1, 4, 1, 4, 4, 4, 4, 4, 3, 4, 0, 5, 3, 5, 5, 5],
        //Willie
        [1, 1, 1, 4, 1, 1, 4, 1, 1, 4, 1, 1, 3, 4, 1, 4, 1, 2, 1, 3, 3, 3, 3, 1, 2, 3, 2, 2],
    ];

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
  )(ElectionPage);

  export { connectedComponent as ElectionPage }
