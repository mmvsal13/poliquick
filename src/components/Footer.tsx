import React, {Component} from "react";
import './Footer.css';



 class Footer extends React.Component<{}> {

    render() {
        return (
            <>
          {/* Footer */}

          <footer id="footer">
                <a className = "social-media" href="https://twitter.com/explore"><i className="fab fa-twitter"></i></a>
                <a className = "social-media" href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                <a className = "social-media" href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                <a className = "social-media" href=""><i className="fas fa-envelope"></i></a>
                <p className= "copyright">Copyright 2020 Poliquick</p>
        </footer>
            </>
        );
    }
}

export default Footer;