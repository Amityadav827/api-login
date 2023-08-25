import React from "react";
import { NavLink } from "react-router-dom";

const Footercom = () => {
  return (
    <>
      <footer>
        <div className="footer-top">
          <div className="container">
            <div className="footer-day-time">
              <div className="row">
                <div className="col-md-8">
                  <ul>
                    <li>Opening Hours : Mon - Friday : 8AM - 5PM</li>
                    <li>Sunday : 8:00 AM - 12:00 PM</li>
                  </ul>
                </div>
                <div className="col-lg-4">
                  <div className="phone-no">
                    <NavLink className="navbar-brand" to="/tel:+12 34 56 78 90">
                      <i className="fa fa-mobile" aria-hidden="true"></i> Call
                      +12 34 56 78 90
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <h4>About us</h4>
                <p>
                  Lorem Ipsum ist einfach Dummy-Text der Druck- und
                  Satzindustrie. Lorem Ipsum war der Standard der Branche Lorem
                  Ipsum ist einfach Dummy-Text der Druck- und Satzindustrie.
                  Lorem Ipsum war der Standard der Branche{" "}
                </p>
              </div>

              <div className="col-md-4">
                <h4>Information</h4>
                <ul className="address1">
                  <li>
                    <i className="fa fa-map-marker"></i>Lorem Ipsum 132 xyz
                    Lorem Ipsum
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i>
                    <NavLink to="">info@test.com</NavLink>
                  </li>
                  <li>
                    <i className="fa fa-mobile" aria-hidden="true"></i>
                    <NavLink to="/tel:12 34 56 78 90">12 34 56 78 90</NavLink>
                    <a href="tel:12 34 56 78 90">12 34 56 78 90</a>
                  </li>
                </ul>
              </div>

              <div className="col-md-4">
                <h4>Follow us</h4>
                <ul className="social-icon">
                  <li>
                    <NavLink to="">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <p className="copyright text-center">
                  © 2023 Copyright: Amit Yadav
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footercom;
