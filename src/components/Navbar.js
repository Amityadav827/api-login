import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [login, setLogin] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setLogin(localStorage.getItem("token"));
    // eslint-disable-next-line
  }, [localStorage]);

  const logOut = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://login-api.web2rise.in/api/logout",
        {},
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Logout successful") {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light nav_fixed">
        <div className="container-fluid">
          <NavLink className="navbar-brand" style={{ cursor: "pointer" }}>
            LOGO
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/Home"
                >
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/User"
                >
                  USER DATA
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/CreateUser"
                >
                  CREATE USER
                </NavLink>
              </li>
              {/* <li className="nav-item" onClick={logOut}>
                <button type="button" className="btn btn-info">
                  LOGOUT
                </button>
              </li> */}

              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="#." onClick={logOut}>
                    LOGOUT
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
