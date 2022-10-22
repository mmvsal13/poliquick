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
    q15: String | undefined,
    q16: String | undefined,
    q17: String | undefined,
    q18: String | undefined,
    q19: String | undefined,
    q20: String | undefined,
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
class PageThree extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props)
        this.state = {
            question: this.props.you.quiz,
            city: this.props.you.city,
            q15: this.findResponse(15),
            q16: this.findResponse(16),
            q17: this.findResponse(17),
            q18: this.findResponse(18),
            q19: this.findResponse(19),
            q20: this.findResponse(20),

        }

    }

    findResponse(question: number) {
        if(typeof this.props.you.quiz[question-1] != 'undefined') {
            return this.getStance(this.props.you.quiz[question-1])
        }
        return " Select a Stance "
    }

    changeState(number: number, stance: string | undefined) {
        if (number == 15 && typeof stance != 'undefined') {
            this.setState({
                q15: stance
            })
        }
        if (number == 16 && typeof stance != 'undefined') {
            this.setState({
                q16: stance
            })
        }
        if (number == 17 && typeof stance != 'undefined') {
            this.setState({
                q17: stance
            })
        }
        if (number == 18 && typeof stance != 'undefined') {
            this.setState({
                q18: stance
            })
        }
        if (number == 19 && typeof stance != 'undefined') {
            this.setState({
                q19: stance
            })
        }
        if (number == 20 && typeof stance != 'undefined') {
            this.setState({
                q20: stance
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
        if (ID == "15" ) {
            return this.state.q15
        }
        if (ID == "16" ) {
            return this.state.q16
        }
        if (ID == "17" ) {
            return this.state.q17
        }
        if (ID == "18" ) {
            return this.state.q18
        }
        if (ID == "19" ) {
            return this.state.q19
        }
        if (ID == "20" ) {
            return this.state.q20
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

    //This renders question 14-20
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
            data.PageThree.map( q =>
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
        for(var i= 14; i < 20; i++ ) {
            if(typeof arr[i]==='undefined') {
                incomplete.push(i+1)
            }
        }
        if (incomplete.length !== 0) {
            alert('You have yet to submit a response for questions: '+ incomplete);
            return;
        }
        this.props.changePage(pages.PageFour)
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
                <h1 className="title" >Get matched with local politicians in {this.props.you.city}</h1>
                {this.questions()}
                <br/>
                <ProgressBar className="progress-bar" bgcolor={"#D2F6FF"} completed={Math.floor(this.getPercent())}/>
                <br />
                <div className="Navigation">
                    <button className= "prev" onClick={(e)=>this.props.changePage(pages.PageTwo)}>Previous Page</button>
                    <button className = "next" onClick={(e)=>this.handleNext(e)}>Next Page</button>
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
  )(PageThree);

  export { connectedComponent as PageThree }
