import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [inputField, setInputField] = useState({
    username: "",
    password: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handlelogin = async (e) => {
    setIsButtonDisabled(true); // Disable the button
    e.preventDefault();
    const username = inputField.username;
    const password = inputField.password;
    try {
      const admin = await axios.post(
        "https://login-api.web2rise.in/api/login",
        { username, password }
      );
      const token = admin.data.token;
      // console.log(token)
      if (token) {
        toast("Login Successful");
        // navigate("/Home");
        setTimeout(() => {
          navigate("/Home");
        }, 3000);
      }
      localStorage.setItem("token", token);
    } catch (error) {
      console.log("error", error);
      toast("Login failed. Please try again.");
    } finally {
      setIsButtonDisabled(false); // Re-enable the button
    }
  };

  // const notify = () => toast("Wow so easy!");

  return (
    <>
      <section className="login login_z">
        <div className="login_box">
          <div className="left">
            <div className="top_link"></div>
            <div className="contact">
              <form action="">
                <h3>LOG IN PAGE</h3>
                <input
                  type="text"
                  name="username"
                  value={inputField.username}
                  onChange={handleChange}
                  placeholder="USERNAME"
                />
                <input
                  type="password"
                  name="password"
                  value={inputField.password}
                  onChange={handleChange}
                  placeholder="PASSWORD"
                />

                <button
                  className={`submit ${
                    isButtonDisabled ? "disabled-button" : ""
                  }`}
                  // className="submit"
                  onClick={handlelogin}
                  disabled={isButtonDisabled} // Disable the button using the 'disabled' attribute
                >
                  LET'S GO
                </button>

                {/* <div>
                  <button onClick={notify}>Notify!</button>
                  <ToastContainer />
                </div> */}
              </form>
              <ToastContainer />
            </div>
          </div>
          <div className="right">
            <div className="right-text">
              <h2>WEB2RISE</h2>
              <h5>A UX BASED CREATIVE AGENCEY</h5>
            </div>
            <div className="right-inductor">
              <img
                src="https://lh3.googleusercontent.com/fife/ABSRlIoGiXn2r0SBm7bjFHea6iCUOyY0N2SrvhNUT-orJfyGNRSMO2vfqar3R-xs5Z4xbeqYwrEMq2FXKGXm-l_H6QAlwCBk9uceKBfG-FjacfftM0WM_aoUC_oxRSXXYspQE3tCMHGvMBlb2K1NAdU6qWv3VAQAPdCo8VwTgdnyWv08CmeZ8hX_6Ty8FzetXYKnfXb0CTEFQOVF4p3R58LksVUd73FU6564OsrJt918LPEwqIPAPQ4dMgiH73sgLXnDndUDCdLSDHMSirr4uUaqbiWQq-X1SNdkh-3jzjhW4keeNt1TgQHSrzW3maYO3ryueQzYoMEhts8MP8HH5gs2NkCar9cr_guunglU7Zqaede4cLFhsCZWBLVHY4cKHgk8SzfH_0Rn3St2AQen9MaiT38L5QXsaq6zFMuGiT8M2Md50eS0JdRTdlWLJApbgAUqI3zltUXce-MaCrDtp_UiI6x3IR4fEZiCo0XDyoAesFjXZg9cIuSsLTiKkSAGzzledJU3crgSHjAIycQN2PH2_dBIa3ibAJLphqq6zLh0qiQn_dHh83ru2y7MgxRU85ithgjdIk3PgplREbW9_PLv5j9juYc1WXFNW9ML80UlTaC9D2rP3i80zESJJY56faKsA5GVCIFiUtc3EewSM_C0bkJSMiobIWiXFz7pMcadgZlweUdjBcjvaepHBe8wou0ZtDM9TKom0hs_nx_AKy0dnXGNWI1qftTjAg=w1920-h979-ft"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
