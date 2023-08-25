import React, { useEffect, useState } from "react";
// import students from "../images/students.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [state, setstate] = useState(false);

  const navigate = useNavigate();

  const getUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://login-api.web2rise.in/api/users",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        if (response.data.data) {
          setstate(true);
        }
      } else {
        console.log("Server returned an error:");
      }
    } catch (error) {
      if (error.message) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getUsers();
  });

  return (
    <>
      {state ? (
        <section className="showcase">
          {/* <img src={students} classNameName="img-fluid" alt="Picture" /> */}
          <div className="overlay">
            <h2>STUDENTS DETAILS</h2>
            <p>
              The Information About a Student That Identifies And Provides
              Information Specific to Them.
            </p>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
