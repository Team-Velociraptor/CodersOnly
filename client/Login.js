import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './stylesheets/Login.css';
import SignUp from './SignUp.js';
import Mole from './assets/Star-nosed-mole.png';
import { useNavigate } from 'react-router-dom';

const Login = props => {
  //is this state used?
  const [toggleSignUp, setToggleSignUp] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [invalidLogin, setInvalidLogin] = useState();
  const navigate = useNavigate();

  const loginHandler = () => {
    // const id = document.getElementById('loginUsername').value;
    // const pw = document.getElementById('password').value;
    // console.log('id ' + id);
    // console.log('pw ' + pw);

    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then(data => {
        console.log("data ", data)
        if (!data.ok) {
          console.log("Unvalid Username");
          setInvalidLogin("true");
        } else {
          props.setCurrUser(username);
          props.setToken(username);
          setInvalidLogin(false);
          navigate('/Feed');
          
        }
        return data.json();
      })
      
  };

  if (toggleSignUp) {
    return <SignUp setToggleSignUp={setToggleSignUp} />;
  }
  return (
    <div className="LoginInDiv">
      <div className="LoginBox">
        <div className="LoginTitle">
          <img className="loginImage" src={Mole} alt="starmole" />
          <h1 className="title">CodersOnly</h1>
          
        </div>
        {invalidLogin && <p className="redText">Invalid login</p>}
        <input
          className="id"
          name="username"
          type="text"
          placeholder="Username"
          id="loginUsername"
          onChange={e => setUsername(e.target.value)}
        ></input>
        <input
          className="password"
          name="password"
          type="password"
          placeholder="Password"
          id="password"
          onChange={e => setPassword(e.target.value)}
        ></input>
        <div className="LoginScreenButtons">
          <button className="loginButtons" onClick={loginHandler}>
            Login
          </button>
          {props.currUser && <Navigate to="/feed" />}
          <button
            className="loginButtons"
            onClick={() => setToggleSignUp(!toggleSignUp)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

{
  /* created route to feed...will need to make a conditional route so it will only route when verified user logs in*/
}
/*
<Route exact path="/">
  {currUser !== '' && <Redirect to="/" /> : <Feed />}
</Route>
*/
