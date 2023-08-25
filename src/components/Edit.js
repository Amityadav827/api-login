import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import register from "../images/register.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const location = useLocation();
  const AllData = location.state.data;
  console.log(AllData, "alldata");

  const [input, setInput] = useState({
    name: AllData.name,
    email: AllData.email,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, email } = input;
    const token = localStorage.getItem("token");

    try {
      const updateResponse = await axios.post(
        "https://login-api.web2rise.in/api/update-user",
        { name, email },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("User updated successfully:", updateResponse.data);

      if (updateResponse.data.message === "user updated successfully") {
        toast("Update Successful");
        // navigate("/User");
        setTimeout(() => {
          navigate("/User");
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
      toast("Delete failed. Please try again.");
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container mt-5 box_sdow">
          <div className="signup-contant">
            <div className="signup-form">
              <h2 className="form-tittle">Update Data</h2>
              <form action="" className="register-form" id="register-form">
                <div className="form-group">
                  <label className="lebal_border" htmlFor="name">
                    <i className="zmdi zmdi-account"></i>
                  </label>
                  <input
                    name="name"
                    value={input.name}
                    onChange={(e) => handleChange(e)}
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
                    value={input.email}
                    onChange={(e) => handleChange(e)}
                    type="email"
                    autoComplete="off"
                    placeholder="Your Email"
                    disabled
                  />
                </div>

                <div className="form-froup form-button">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleUpdate}
                  >
                    UPDATE
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Edit;
