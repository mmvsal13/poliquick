import React from 'react';
import { pages } from "../App";
import { IPoliquickState, Person } from '../redux/types';
import { connect } from 'react-redux';

interface WelcomeScreenProps {
  changePage: (page: pages) => void;
  you: Person;
  
}

class WelcomePage extends React.Component<WelcomeScreenProps> {
    render() {
      console.log("Im on the welcome page :)")
      console.log("this is the quiz data for user:", this.props.you.username)
      console.log(this.props.you.quiz)
      return (
        <div>
          <h1>Welcome, {this.props.you.username}</h1>
          <p> Your City: {this.props.you.city}</p>
          <p>Your Age: {this.props.you.age}</p>
          {/* <button onClick={(e) => this.props.changePage(pages.ElectionPage)}>Submit </button> */}
        </div>
      );
    }
  }

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
  )(WelcomePage);
  
  export { connectedComponent as WelcomePage }
  