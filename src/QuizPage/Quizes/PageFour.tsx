import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { pages } from "../../App";
import React from "react";
import './Quizes.css'
import  ProgressBar  from "../progress-ba";


//JSON files with questions for each city
import Miamidata from "../JSONsurveys/PagesMiami.json"
import CambridgeData from "../JSONsurveys/PagesCambridge.json"
import ElPasoData from "../JSONsurveys/PagesElPaso.json"

//REDUX
import { createSaveQuizAction } from "../../redux/actions"
import { IPoliquickState, Person } from '../../redux/types';
import { connect } from 'react-redux';

//Bootstrap
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Button from 'react-bootstrap/Button'


//questions holds the users input, city can be [Miami, Cambridge or El Paso]
type MyState = {
    question: number[],
    city: String,
    q21: String | undefined,
    q22: String | undefined,
    q23: String | undefined,
    q24: String | undefined,
    q25: String | undefined,
    q26: String | undefined,
    q27: String | undefined,
    q28: String | undefined,
}

//save quiz is an action taken everytime the user moves to the next page
//you is the current user. Any variable can be used.
type MyProps = {
    changePage: (page: pages) => void;
    you: Person
    saveQuiz: (quiz: number[]) => void;
}

//this.props.[current_user_variable].quiz is accessible from any page
//For a new user this.props.you.quiz would be empty
class PageFour extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props)
        this.state = {
            question: this.props.you.quiz,
            city: this.props.you.city,
            q21: this.findResponse(21),
            q22: this.findResponse(22),
            q23: this.findResponse(23),
            q24: this.findResponse(24),
            q25: this.findResponse(25),
            q26: this.findResponse(26),
            q27: this.findResponse(27),
            q28: this.findResponse(28)
        }
    }

    findResponse(question: number) {
        if(typeof this.props.you.quiz[question-1] != 'undefined') {
            return this.getStance(this.props.you.quiz[question-1])
        }
        return "Rating"
    }

    changeState(number: number, stance: string | undefined) {
        if (number == 21 && typeof stance != 'undefined') {
            this.setState({
                q21: stance
            })
        }
        if (number == 22 && typeof stance != 'undefined') {
            this.setState({
                q22: stance
            })
        }
        if (number == 23 && typeof stance != 'undefined') {
            this.setState({
                q23: stance
            })
        }
        if (number == 24 && typeof stance != 'undefined') {
            this.setState({
                q24: stance
            })
        }
        if (number == 25 && typeof stance != 'undefined') {
            this.setState({
                q25: stance
            })
        }
        if (number == 26 && typeof stance != 'undefined') {
            this.setState({
                q26: stance
            })
        }
        if (number == 27 && typeof stance != 'undefined') {
            this.setState({
                q27: stance
            })
        }
        if (number == 28 && typeof stance != 'undefined') {
            this.setState({
                q28: stance
            })
        }
    }

    getStance(stance: number) {
        if(stance == 1) {
            return "1"
        }
        if(stance == 2) {
            return "2"
        }
        if(stance == 3) {
            return "3"
        }
        if(stance == 4) {
            return "4"
        }
        if(stance == 5) {
            return "5"
        }
        if(stance == 0) {
            return "0"
        }
    }

    getTitle(ID: string) {
        if (ID == "21" ) {
            return this.state.q21
        }
        if (ID == "22" ) {
            return this.state.q22
        }
        if (ID == "23" ) {
            return this.state.q23
        }
        if (ID == "24" ) {
            return this.state.q24
        }
        if (ID == "25" ) {
            return this.state.q25
        }
        if (ID == "26" ) {
            return this.state.q26
        }
        if (ID == "27" ) {
            return this.state.q27
        }
        if (ID == "28" ) {
            return this.state.q28
        }
    }

    //anytime the user inputs a response this function parses the input and places it into an array
    //the eventKey is a string formated like so: "[question#].[userResponse]"
    //For questions 1-20 user response will be converted to a number 1-4
    //For questions 21-28 user response will be converted to a number 1-5
    handleChange=(eventKey: string | null, e: any)=> {
        //for simplicity I assigned a variable to the current response array
        let userArray = this.state.question
        //number= question number & stance = user response (THESE ARE STRINGS)
        let [number, stance] = this.parseEventKey(eventKey)
        //convert above to actual numbers
        const q = parseInt(number)
        const a = parseInt(stance)
        //place the stance in the corresponding index(ex question 1 response --> index 0 on array)
        userArray[q-1] = a
        var stringStance = this.getStance(a)
        this.changeState(q, stringStance)
        //update the classes state with any change made
        this.setState({
            question: userArray
        })
        //update the users state with any changes made
        this.props.saveQuiz(this.state.question);
        //TODO: REMOVE THIS LINE AFTER DEVELOPMENT PHASE
        console.log(this.props.you.quiz)
    }

    //this function is here to handle strings and changes them into numbers
    //key is a string of the format "[question#].[userResponse]"
    parseEventKey(key: string | null) {
        let num = ""
        let stance = ""
        if (key != null) {
            for(let i = 0; i < key.length; i++) {
                //seperates question and number from format
                if (key.charAt(i)==='.') {
                    stance = key.substring(i+1)
                    break
                } else {
                    num = num + key.charAt(i)
                }
            }
        }
        return([num, stance])
    }

    //This renders question 20-28
    //Default is El Paso. Conditionally render quiz based on city
    questions() {
        var data = ElPasoData;
        if(this.state.city=="Cambridge") {
            data = CambridgeData
        }
        if(this.state.city=="Miami") {
            data = Miamidata
        }
        return (
            data.PageFour.map( r =>
                <div className="together">
                <p className="quest">{r.ID}. {r.text}</p>
                <DropdownButton
                className="rating"
                //Styling for the button itself
                title= {this.getTitle(r.ID)}
                id="Qdropdown"
                size="sm"
                // this handles the change in state once an item is clicked
                onSelect={this.handleChange}
                        >
                {/* eventKey is formated "<question #>.<stance>" */}
                <Dropdown.Item eventKey={r.option6}>0</Dropdown.Item>
                <Dropdown.Item eventKey={r.option1}>1</Dropdown.Item>
                <Dropdown.Item eventKey={r.option2}>2</Dropdown.Item>
                <Dropdown.Item eventKey={r.option3}>3</Dropdown.Item>
                <Dropdown.Item eventKey={r.option4}>4</Dropdown.Item>
                <Dropdown.Item eventKey={r.option5}>5</Dropdown.Item>
                </DropdownButton>
                </div>
        )
        )
    }

    //this function takes you the next page if you filled in all the questions in the page
    //otherwise you get an alert telling you which questions are missing a response
    handleNext(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        let arr = this.props.you.quiz
        let incomplete = []
        //checks if any of the spots in the array are empty
        for(var i= 20; i < 28; i++ ) {
            if(typeof arr[i]==='undefined') {
                incomplete.push(i+1)
            }
        }
        if (incomplete.length !== 0) {
            alert('You have yet to submit a response for questions: '+ incomplete);
            return;
        }
        this.props.changePage(pages.ElectionPage)
    }

    getPercent() {
        let arr = this.props.you.quiz
        let complete = []
        for(var i= 0; i<28; i++ ) {
            if(typeof arr[i] !=='undefined') {
                complete.push(i+1)
            }
        }
        return (complete.length / 28) * 100
    }

    render() {
        return (
            <div className="Quiz">
                <h1 className="title">Almost there!</h1>
                <h3 className="title">Rate the following based on their importance of being funded by the local government: </h3>
                <h4 className="title">0 being shouldn’t be funded, 1, should be severely cut, 2. Should be cut a small amount, 3.  Funding should stay the same 4. Funding should increase a small amount 5. Funding should be severely increased</h4>
                {this.questions()}
                <br/>
                <ProgressBar className="progress-bar" bgcolor={"#D2F6FF"} completed={Math.floor(this.getPercent())}/>
                <br />
                <div className="Navigation">
                    <button className="prev" onClick={(e)=>this.props.changePage(pages.PageThree)}>Previous Page</button>
                    <button className="next" onClick={(e)=>this.handleNext(e)}>Submit</button>
                </div>
            </div>
        )
    }
}

//maps you to the current user
function mapStateToProps(state: IPoliquickState) {
    return {
      you: state.currentUser // "currentUser" in Redux state is 'you' on this page
    }
  }

  //maps the prop to actual action
  function mapDispatchToProps(dispatch: any) {
        console.log("test-quiz-dispacth")
        return {
          saveQuiz: (quiz: number[]) => dispatch(createSaveQuizAction(quiz))
        }
    }

  const connectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageFour);

  export { connectedComponent as PageFour }
