import React, {Component} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../images/vote-icon.png';
import "./NavBar.css"
import { pages } from "../App"


interface NavBarProps{
  changePage: (page: pages) => void;
}

//in order to have the navbar update the page, we have to update the state of the app
  class NavBar extends Component<NavBarProps> {
    constructor(props: any) {
        super(props);
      }


    handleSelect=(eventKey: string | null, e: any)=> {
      if(eventKey==="Polls") {
        console.log("you pressed quiz")
        this.props.changePage(pages.City)
    }
    if(eventKey=="Quiz") {
      this.props.changePage(pages.PageOne)
    }
    if(eventKey=="Matches") {
      this.props.changePage(pages.ElectionPage)
    }
    if(eventKey=="SignOut") {
      this.props.changePage(pages.SignInPage)
    }
  }

    render() {
        return (
            <div className = "Navigation-Bar">
                {/* NavBar Theming */}
                <Navbar
                className = "navbar"
                expand="lg"
                >

                    {/* NavBar Logo */}
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            />{' '}
                            Poliquick
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav justify-content-end">
                    <Nav
                    className="mr-auto"
                    onSelect={this.handleSelect}
                    >
                        <Nav.Link eventKey="Quiz">Update Quiz</Nav.Link>
                        <Nav.Link eventKey="Polls">Voting Booths</Nav.Link>
                        <Nav.Link eventKey="Matches">Your Matches</Nav.Link>
                        <NavDropdown title="Coming Soon" id="basic-nav-dropdown">
                            <NavDropdown.Item eventKey="disabled" disabled href="">Get Involved</NavDropdown.Item>
                            <NavDropdown.Item eventKey="disabled" disabled href="">News</NavDropdown.Item>
                            <NavDropdown.Item eventKey="disabled" disabled href="">Explore Politicians</NavDropdown.Item>
                            <NavDropdown.Item eventKey="disabled" disabled href="">Anti-Match</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link eventKey="SignOut">Sign Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}


export default NavBar;
