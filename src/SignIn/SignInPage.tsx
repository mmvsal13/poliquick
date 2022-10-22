import React, {Component} from "react";
import { pages } from "../App";
import "./SignInPage.css"

import Footer from '../components/Footer';
import jjImage from '../images/jaden-image.jpg';
import pollyImage from '../images/polly.jpg'

// Bootstrap Components
import logo from '../images/vote-icon.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Carousel from 'react-bootstrap/Carousel';

//Redux
import { createSignInAction } from "../redux/actions"
import { IPoliquickState, Person } from '../redux/types';
import { connect } from 'react-redux';


interface SignInScreenProps {
  changePage: (page: pages) => void;
  saveSignInInfo: (n: string, p: string) => void;
  you: Person;
}


 class SignInPage extends Component<SignInScreenProps> {
  nameRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.nameRef = React.createRef();
    this.passwordRef = React.createRef();

  }
  render() {
  
    return (
      <>
        <div className = "top-container">
        <div className= "Layout">
          <div className="Brand">
          <h1 className="titleSignIn"><strong>Poliquick</strong></h1>
          <img className = "logo_image"src={logo} alt="poliquick-icon"/>
          </div>

          <div className= "Signup">
            <h2><strong>Fast, Reliable, Information on Local Politicians</strong></h2>
            <h3>Sign In</h3>

            <Form.Text className="text-muted">
                  We'll never share your information with anyone else.
                </Form.Text>

            <Form onSubmit = {this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <FormControl
                  type="username"
                  placeholder="Username"
                  ref = {this.nameRef}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref = {this.passwordRef}
                />
              </Form.Group>

              <Button onClick={(e) => this.props.changePage(pages.SignUp)} variant="dark">
                Sign-In
              </Button>{' '}
            </Form>
          </div>

          <div className="pageNav">
            <p className="signUpLink" onClick={(e) => this.props.changePage(pages.SignUp)}>Don't Have an Account? <strong>Sign Up</strong></p>
          </div>
        </div>

      </div>

        {/* App Features */}
      <div className="features-section">
        <section id="features">
          <div className="row">
            <div className="feature-box col-lg-4">
              <i className="icon fas fa-check-circle fa-4x"></i>
              <h3 className="feature-title">Quick and Easy</h3>
              <p className="feature-desc">Whether you're on the go, or staying at home, each quiz will take under 10 minutes.</p>
            </div>
          <div className="feature-box col-lg-4">
            <i className="icon fas fa-bullseye fa-4x"></i>
            <h3 className="feature-title">Get Matched</h3>
            <p className="feature-desc">From our large database of local politicians, we'll help you get informed about local politicians.</p>
          </div>
          <div className="feature-box col-lg-4">
            <i className="icon fas fa-map-marked-alt fa-4x"></i>
            <h3 className="feature-title">Empowering You to Vote</h3>
            <p className="feature-desc">We provide the most up to date information on voting locations, with a list of everything you need to get started.</p>
          </div>
        </div>
        </section>

      {/* Testimonials Section */}
        <div id="testimonials">
            <Carousel>
                <Carousel.Item>
                    <h2 className="testimonial-text">"As a college student with a part time job, I'm always short on time.
                            With Poliquick, I can get matched with politicians I align with, without the hassle of fumbling through biased news."
                    </h2>
                    <img
                    className="testimonial-image"
                    src={jjImage}
                    alt="jj-image"
                    />
                    <em>Jaden (20), Seattle</em>

                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <h2 className="testimonial-text">"An informed vote should not be a luxury, but a necessity"</h2>
                    <img
                    className="testimonial-image"
                    src={pollyImage}
                    alt="polly-testimonial"
                    />
                    <em>Polly (29), Orange</em>

                </Carousel.Item>
            </Carousel>
        </div>


      </div>

      <Footer />


      </>
    );
  }


  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.nameRef.current == null || this.passwordRef.current == null) {
      return;
    }
    this.props.saveSignInInfo(this.nameRef.current.value, this.passwordRef.current.value);
    // this.props.changePage(pages.WelcomePage)
  }
}

// Map redux state to component state
function mapStateToProps(state: IPoliquickState) {
  return {
    you: state.currentUser,
  }
}

// Map redux actions to component props
function mapDispatchToProps(dispatch: any) {
  console.log("test")
  return {
    saveSignInInfo: (n: string, p: string) => dispatch(createSignInAction(n, p))
  }
}

// The Hight Order Component (HOC)
// props need to be recived by the component
const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPage);

export { connectedComponent as SignInPage }
