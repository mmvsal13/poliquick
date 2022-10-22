import { PoliquickActions, actionIdentifier, JoinAction, SignInAction, SaveQuizAction } from '../actions'
import { IPoliquickState, Person } from '../types';

// NOTE NOTE NOTE:
// There's a "SampleData.json" file in this same folder 
// that will show you something very close to (BUT NOT IDENTICAL TO)
// what the following code will generate

// Initial state of the app:
let SampleData_LoadedProgrammatically = (): IPoliquickState => {
    // 'programmatically' means "done by a program" (as opposed to reading it out of a data file)
    const you = new Person(0, "quan", "password", "20", "Seattle", [])

    const person1 = new Person(1, "snickerz", "iEatCheese", "8", "Long Beach", [])

    const person2 = new Person(3, "jj_fuego", "1234", "20", "Cambridge", [])


    return {
        idCounter: 4, // the next object that we create will be given 5+1 = 6 as it's ID number
        currentUser: you,
        people: [
            person1,
            person2,
            you
        ]
    }
}

// Initial state of the app:
const initialState: IPoliquickState = SampleData_LoadedProgrammatically()

function poliquickReducer(state: IPoliquickState | undefined, action: PoliquickActions): IPoliquickState {
    console.log("start-reducer")
    if (state === undefined) {
        console.log("undefined")
        return initialState;
    }

    const nextId = state.idCounter + 1;
    console.log("switch-start")
    switch (action.type) {
        case actionIdentifier.Join: {
            console.log("enter join case")
            let addAction = action as JoinAction;

            let newState: IPoliquickState = { ...state }; // this will copy the current state

            newState.currentUser = new Person(nextId, addAction.username, addAction.password, addAction.age, addAction.city, []);
            newState.people.push(newState.currentUser); // add the current user to the list of all people
            newState.idCounter = nextId;

            return newState;
        }

        case actionIdentifier.SignIn: {
            console.log("enter signin case")
            let addAction = action as SignInAction;
            // alert('name: ' + addAction.username + ' pass: ' + addAction.password);
            let newState: IPoliquickState = { ...state }; // this will copy the current state
            // newState.currentUser = new Person(nextId, addAction.username, addAction.password, addAction.age, addAction.city);
            return newState;
        }

        case actionIdentifier.SaveQuiz: {
            console.log("entered a quiz question")
            let addAction = action as SaveQuizAction;
            let newState: IPoliquickState = { ...state }; // this will copy the current state
            newState.currentUser.quiz = addAction.quiz;
            // newState.currentUser = this will update the current users quiz array to the passed in array
            return newState;
        }


        // I'd recommend copy-and-pasting the previous case
        // then modifying stuff & deleting whatever you don't need

        default:
            console.log("default state")
            return state;
    }
}

export default poliquickReducer;
