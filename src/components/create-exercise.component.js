import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateExercises = () => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    const body = JSON.stringify({
      username,
      description,
      duration,
      date,
    });

    fetch(`http://localhost:5000/exercises/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    console.log(body);
    window.location = "/";
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            // ref="userInput"
            required
            className="form-control"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          >
            <option>Users</option>
            {users.map((user) => {
              return (
                <option key={user._id} value={user.username}>
                  {user.username}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label> Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label> Duration (in minutes): </label>
          <input
            type="text"
            required
            className="form-control"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={setDate} />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercises;
