import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUser,
  updateUser,
  deleteUser,
} from "./userSclice";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchUsersStart());
      try {
        const response = await axios.get("/api/users");
        dispatch(fetchUsersSuccess(response.data));
      } catch (err) {
        dispatch(fetchUsersFailure(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddUser = async () => {
    const newUser = { name: "New User", email: "newuser@example.com" }; // Adjust as needed
    try {
      const response = await axios.post("/api/users", newUser);
      dispatch(addUser(response.data));
    } catch (err) {
      console.error("Error adding user:", err.message);
    }
  };

  const handleUpdateUser = async (userId, updatedUserData) => {
    try {
      const response = await axios.put(`/api/users/${userId}`, updatedUserData);
      dispatch(updateUser(response.data));
    } catch (err) {
      console.error("Error updating user:", err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      dispatch(deleteUser(userId));
    } catch (err) {
      console.error("Error deleting user:", err.message);
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary mb-3" onClick={handleAddUser}>
        Add User
      </button>
      {loading && <p className="alert alert-info">Loading...</p>}
      {error && <p className="alert alert-danger">Error: {error}</p>}
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {user.name} - {user.email}
            <div>
              <button
                className="btn btn-warning mx-2"
                onClick={() =>
                  handleUpdateUser(user._id, { name: "Updated User" })
                }
              >
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
