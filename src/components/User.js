import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
      setAllUsers(response.data.data);
      setFilteredUsers(response.data.data);

      if (response.status >= 200 && response.status < 300) {
        if (response.data.data) {
          setAllUsers(response.data.data);
          setIsDeleting(false);
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

  const deleteData = async (email) => {
    const token = localStorage.getItem("token");
    try {
      setIsButtonDisabled(true); // Disable the button
      setIsDeleting(true); // Set the state to indicate delete request in progress
      const resp = await axios.post(
        "https://login-api.web2rise.in/api/delete-user",
        { email: email },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.data.message === "user deleted successfully") {
        toast("Delete Successful");
        // navigate("/Home");
        setTimeout(() => {
          // navigate("/Home");
        }, 3000);
        getUsers();
      }
    } catch (error) {
      console.log("error", error);
      toast("Delete failed. Please try again.");
    } finally {
      setIsButtonDisabled(false); // Re-enable the button
      setIsDeleting(false); // Set the state back to indicate delete request completed
      console.log("Deleted.");
    }
  };

  const handleFilter = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredData = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery)
    );
    setFilteredUsers(filteredData); // Update the filtered users state
  };

  const handleEdit = (data) => {
    try {
      console.log(data, "data");
      navigate("/edit", { state: { data } });
    } catch (error) {
      console.error("Error navigating to /edit:", error);
    }
  };

  useEffect(() => {
    getUsers();
    // console.log(getUsers)
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container py-4">
        <h1 className="text-center">USER DATA</h1>

        <form className="d-flex pb-5">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            onChange={handleFilter}
            aria-label="Search"
          />
        </form>
        <table className="table border-1 table-bordered shadow text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">SR.NO</th>
              <th scope="col">NAME</th>
              <th className="dis_none" scope="col">
                G-MAIL
              </th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td className="dis_none">{user.email}</td>
                <td>
                  <NavLink
                    className={`btn btn-primary ${
                      isButtonDisabled ? "disabled-button" : ""
                    }`}
                    onClick={() => deleteData(user.email)}
                    // className="btn btn-primary"
                    // className={`submit ${ isButtonDisabled ? "disabled-button" : ""}`}
                    disabled={
                      isDeleting || allUsers.some((u) => u.email === user.email)
                    } // Disable the button when deleting is in progress or if the user email matches
                    // eslint-disable-next-line
                    // disabled={isButtonDisabled} // Disable the button using the 'disabled' attribute
                  >
                    Delete
                  </NavLink>
                  <button
                    onClick={() => handleEdit(user)}
                    className="btn btn-warning mr"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );
};

export default User;
