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


//questions holds the users input, city can be [Miami, Cambridge or El Paso]
type MyState = {
    question: number[],
    city: String,
    q8: String | undefined,
    q9: String | undefined,
    q10: String | undefined,
    q11: String | undefined,
    q12: String | undefined,
    q13: String | undefined,
    q14: String | undefined
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
class PageTwo extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props)
        this.state = {
            question: this.props.you.quiz,
            city: this.props.you.city,
            q8: this.findResponse(8),
            q9: this.findResponse(9),
            q10: this.findResponse(10),
            q11: this.findResponse(11),
            q12: this.findResponse(12),
            q13: this.findResponse(13),
            q14: this.findResponse(14)
        }

    }

    findResponse(question: number) {
        if(typeof this.props.you.quiz[question-1] != 'undefined') {
            return this.getStance(this.props.you.quiz[question-1])
        }
        return " Select a Stance "
    }

    changeState(number: number, stance: string | undefined) {
        if (number == 8 && typeof stance != 'undefined') {
            this.setState({
                q8: stance
            })
        }
        if (number == 9 && typeof stance != 'undefined') {
            this.setState({
                q9: stance
            })
        }
        if (number == 10 && typeof stance != 'undefined') {
            this.setState({
                q10: stance
            })
        }
        if (number == 11 && typeof stance != 'undefined') {
            this.setState({
                q11: stance
            })
        }
        if (number == 12 && typeof stance != 'undefined') {
            this.setState({
                q12: stance
            })
        }
        if (number == 13 && typeof stance != 'undefined') {
            this.setState({
                q13: stance
            })
        }
        if (number == 14 && typeof stance != 'undefined') {
            this.setState({
                q14: stance
            })
        }
    }

    getStance(stance: number) {
        if(stance == 1) {
            return "Strongly Disagree"
        }
        if(stance == 2) {
            return "Disagree"
        }
        if(stance == 3) {
            return "Agree"
        }
        if(stance == 4) {
            return "Strongly Agree"
        }
        if(stance == -1) {
            return "Skip"
        }
    }

    getTitle(ID: string) {
        if (ID == "8" ) {
            return this.state.q8
        }
        if (ID == "9" ) {
            return this.state.q9
        }
        if (ID == "10" ) {
            return this.state.q10
        }
        if (ID == "11" ) {
            return this.state.q11
        }
        if (ID == "12" ) {
            return this.state.q12
        }
        if (ID == "13" ) {
            return this.state.q13
        }
        if (ID == "14" ) {
            return this.state.q14
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

    //This renders question 7-14
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
            data.PageTwo.map( q =>
                <div className="together">
                    <p className="quest">{q.ID}. {q.text}</p>
                <DropdownButton
                className="dropdownQuestions"
                //Styling for the button itself
                title= {this.getTitle(q.ID)}
                id="Qdropdown"
                size="sm"
                // this handles the change in state once an item is clicked
                onSelect={this.handleChange}
                        >
                {/* eventKey is formated "<question #>.<stance>" */}
                <Dropdown.Item eventKey={q.option1}>Strongly Disagree</Dropdown.Item>
                <Dropdown.Item eventKey={q.option2}>Disagree</Dropdown.Item>
                <Dropdown.Item eventKey={q.option3}>Agree</Dropdown.Item>
                <Dropdown.Item eventKey={q.option4}>Strongly Agree</Dropdown.Item>
                <Dropdown.Item eventKey={q.option5}>Skip</Dropdown.Item>
                </DropdownButton>
                <br/>
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
        for(var i= 7; i<14; i++ ) {
            if(typeof arr[i]==='undefined') {
                incomplete.push(i+1)
            }
        }
        if (incomplete.length !== 0) {
            alert('You have yet to submit a response for questions: '+ incomplete);
            return;
        }
        this.props.changePage(pages.PageThree)
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
                <h1 className="title">Get matched with local politicians in {this.props.you.city}</h1>
                {this.questions()}
                <ProgressBar className="progress-bar" bgcolor={"#D2F6FF"} completed={Math.floor(this.getPercent())}/>
                <br />
                <div className="Navigation">
                    <button className="prev" onClick={(e)=>this.props.changePage(pages.PageOne)}>Previous Page</button>
                    <button className="next" onClick={(e)=>this.handleNext(e)}>Next Page</button>
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
  )(PageTwo);

  export { connectedComponent as PageTwo }
