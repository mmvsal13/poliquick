import React from 'react';
import { pages } from "../App";
import logo from '../images/vote-icon.png';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "./signup.css"
import { MyFirebase } from '../myFirebase';

//Redux
import { createJoinAction } from "../redux/actions"
import { IPoliquickState, Person } from '../redux/types';
import { connect } from 'react-redux';

interface SignUpProps {
    changePage: (page: pages) => void;
    // userInfo: (InUser: string, InPass:string) => void;
    saveJoinInfo: (n: string, p: string, age: string, city: string) => void;
  }
interface IUser {
  username: string;
  password: string,
  city: string,
  age: string
}
interface IAppState {
  user1: IUser,
  allUsers: Array<any>
}

class SignUp extends React.Component<SignUpProps>{
  usernameRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  ageRef: React.RefObject<HTMLInputElement>;
  cityRef: React.RefObject<HTMLInputElement>;
  updateNameRef: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.ageRef = React.createRef();
    this.cityRef = React.createRef();
    this.updateNameRef = React.createRef();

    this.state = {
      user1: {
        username: "No Username",
        password: "No Password",
        ageRef: "No Age",
        cityRef: "No City"
      },
      allUsers: []
    }
  }
  submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // !. means "I personally know that current will NOT be null"
    // Note: this will crash if it turns out that it's not true
    console.log("Name: " + this.usernameRef.current!.value );

    let db = new MyFirebase();
    db.createANOTHERUser(this.usernameRef.current!.value, this.passwordRef.current!.value, this.ageRef.current!.value, this.cityRef.current!.value);
  }

  updateSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // !. means "I personally know that current will NOT be null"
    // Note: this will crash if it turns out that it's not true
    console.log("Name: " + this.usernameRef.current!.value);

    let db = new MyFirebase();
    db.updateObject("/users/1", { username: this.updateNameRef.current!.value }, this.displayUserUpdate);
  }
  displayUserUpdate = (err: Error | null): void => {
    if (err === null) {
      this.setState(
        (prevState: IAppState, props: any) => {
          let newState = { ...prevState };
          newState.user1.username = this.updateNameRef.current!.value;
          return newState;
        }
      )
    }
  }
  displayUserListOnPage = (users: Array<any>): void => {
    if (users.length == 0) {
      return;
    }

    users = Object.values(users);
    console.log("Users: " + users);
    for (var iUser in users) {

      const user = users[iUser];
      console.log("User: " + user);
      for (var iAttr in user) {
        const attr = user[iAttr];
        console.log("\t " + iAttr + ": " + attr);
      }

    }

    this.setState((state: IAppState, props: any) => {
      return {
        ...state,
        allUsers: users
      }
    })
  };

        render() {
          let db = new MyFirebase();

          return (
            <div className = "SignUpPage">
        
        <div className= "Layout">
          
          <div className="Brand">
          <h1><strong>Poliquick</strong></h1>
          <img className = "logo_image"src={logo} alt="icon-img"/>
          </div>

          <div className= "signup">
          <h2><strong>Create Your Account</strong></h2>
            <h3><strong>Your vote matters.</strong></h3>
            <h4>Quickly get informed about local politicians you align with </h4>
            <Form onSubmit = {this.handleSubmit}>
              <Form.Group controlId="signupUser">
                <Form.Control 
                type="username" 
                placeholder="Username" 
                ref = {this.usernameRef}
              />
              </Form.Group>

              <Form.Group controlId="signupPass">
                <Form.Control 
                type="password" 
                placeholder="Password" 
                ref = {this.passwordRef}
              />
              </Form.Group>
              
              <Form.Group controlId="signupAge">
                <Form.Control 
                type="age" 
                placeholder="Age: " 
                ref = {this.ageRef}
              />
              </Form.Group>

              <Form.Group controlId="signupCity">
                <Form.Control 
                type="city" 
                placeholder="City: (Input Miami, Cambridge, El Paso)" 
                ref = {this.cityRef}
              />
              </Form.Group>

              <div className = "privPolicy">
              <Form.Label>By Creating an account you agree to our</Form.Label>
              <div></div>
              <a href = "https://docdro.id/dKxxQvs">
              <Form.Label>Privacy Policy</Form.Label>
              </a>
              </div>

              <Button type="submit" variant="dark">
                Get Started
              </Button>
            </Form>
          </div>
        </div>
      </div>
          );
        }

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.submitHandler(event)
    if (this.usernameRef.current == null || this.passwordRef.current == null || this.ageRef.current == null|| this.cityRef.current == null) {
      return;
    }
    //added this here so that the user formats city correctly
    if(this.cityRef.current.value !== "Miami" && this.cityRef.current.value !== "Cambridge" && this.cityRef.current.value !== "El Paso") {
      alert("The city must be either: Miami, Cambridge or El Paso")
      return;
    }
    this.props.saveJoinInfo(this.usernameRef.current.value, this.passwordRef.current.value, this.ageRef.current.value, this.cityRef.current.value);
    console.log("successful so far")
    this.props.changePage(pages.PageOne)
  }

}

// Map redux state to component state
function mapStateToProps(state: IPoliquickState) {
  return {
    // you: state.currentUser
  }
}

// Map redux actions to component props
function mapDispatchToProps(dispatch: any) {
console.log("test-sign-up-mapDispatch")
  return {
    saveJoinInfo: (n: string, p: string, ag: string, city: string) => dispatch(createJoinAction(n, p, ag, city))
  }
}

// The Hight Order Component (HOC)
// props need to be recived by the component
const connectedComponent = connect(
mapStateToProps,
mapDispatchToProps
)(SignUp);



export { connectedComponent as SignUp }
