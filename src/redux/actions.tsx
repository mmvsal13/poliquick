// Actions and their types

//an enum to list all the possible actions
export enum actionIdentifier {
    Join,
    SignIn,
    SaveQuiz
    // TODO: Add another item to this list. Don't forget to add a comma on the previous line!
}

export interface JoinAction {
    type: actionIdentifier;  //WARNING: Any new actions MUST have a type: actionIdentifier too!!!!!!!!!!!
    username: string;
    password: string;
    age: string;
    city: string;
}


export function createJoinAction(nam: string, pw: string, ag: string, cty: string): JoinAction {
    return {
        type: actionIdentifier.Join,
        username: nam,
        password: pw,
        age: ag,
        city: cty
    };
};

export interface SignInAction {
    type: actionIdentifier;  //WARNING: Any new actions MUST have a type: actionIdentifier too!!!!!!!!!!!
    username: string;
    password: string;
}

export function createSignInAction(nam: string, pw: string,): SignInAction {
    return {
        type: actionIdentifier.SignIn,
        username: nam,
        password: pw
    };
};

export interface SaveQuizAction {
    type: actionIdentifier; 
    quiz: number[] //quiz array
}

export function createSaveQuizAction(questions: number[]): SaveQuizAction {
    return {
        type: actionIdentifier.SaveQuiz,
        quiz: questions
    };
};


export type PoliquickActions = JoinAction | SignInAction | SaveQuizAction
