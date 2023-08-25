import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import register from "../images/register.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateUser = () => {
  const navigate = useNavigate();

  const [createUser, setCreateUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // eslint-disable-next-line
  const [state, setstate] = useState(false);

  const handleInputChange = (e) => {
    setCreateUser({ ...createUser, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const name = createUser.name;
    const email = createUser.email;
    const password = createUser.password;

    try {
      const resp = await axios.post(
        "https://login-api.web2rise.in/api/create-user",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (resp) {
        toast("Registration Successful");

        // navigate("/Home");
        setTimeout(() => {
          navigate("/User");
        }, 3000);
      }

      setCreateUser({
        name: "",
        email: "",
        password: "",
      });
      console.log(resp);
      if (resp.data.message === "user added successfully") {
        setCreateUser({ username: "", password: "" });
        setstate(true);
        navigationPage();
      }
      setstate(true);
    } catch (error) {
      console.log("error", error);
      toast("Registration failed. Please try again.");
    }
  };

  const navigationPage = () => {
    setTimeout(() => {
      navigate("/User");
      setstate(true);
    }, 2000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section className="signup">
        <div className="container mt-5 box_sdow">
          <div className="signup-contant">
            <div className="signup-form">
              <h2 className="form-tittle">Sign Up</h2>
              <form action="" className="register-form" id="register-form">
                <div className="form-group">
                  <label className="lebal_border" htmlFor="name">
                    <i className="zmdi zmdi-account"></i>
                  </label>
                  <input
                    name="name"
                    value={createUser.name}
                    onChange={handleInputChange}
                    type="text"
                    autoComplete="off"
                    placeholder="Your Name"
                  />
                </div>

                <div className="form-group">
                  <label className="lebal_border" htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input
                    name="email"
                    value={createUser.email}
                    onChange={handleInputChange}
                    type="email"
                    autoComplete="off"
                    placeholder="Your Email"
                  />
                </div>

                <div className="form-group">
                  <label className="lebal_border" htmlFor="password">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    value={createUser.password}
                    onChange={handleInputChange}
                    type="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Your Password"
                  />
                </div>

                <div className="form-froup form-button">
                  <button
                    type="button"
                    onClick={handleCreate}
                    className="btn btn-success"
                  >
                    Registration
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>

            <div className="signup-image">
              <figure>
                <img
                  src={register}
                  className="img-fluid"
                  alt="registration pic"
                />
              </figure>
              <NavLink to="/User" className="signup-image-link">
                {" "}
                I Am Already Register{" "}
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
