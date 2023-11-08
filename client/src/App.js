import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(false);

  const getUser = () => {
    const userEmail = prompt("Enter user email")
    fetch(`http://localhost:8000/api/users/${userEmail}`)
    .then(response => {
      return response.text();
    })
    .then(data => {
      setUser(data);
    })
  };

  const addUser = () => {
    const email = prompt("enter email");
    const username = prompt("enter username");
    const hashedPassword = prompt("create password");
    const fullName = prompt("enter full name");
    const profilePicture = null;
    const timeJoined = "2023-11-08 00:47:51";
    const bio = "";
    const dateOfBirth = null;
    const location = "";
    fetch("http://localhost:8000/api/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, username, profilePicture, fullName, hashedPassword, timeJoined, bio, dateOfBirth, location})
    })
    .then(response => {
      return response.text();
    })
    .then(data => {
      alert(data);
    })

  }

  return (
    <div>
      {user ? user: "No user has been queried"}
      <br/>
      <button onClick={getUser}>Get User</button>
      <br/>
      <button onClick={addUser}>Add User</button>
    </div>
  );
}

export default App;
