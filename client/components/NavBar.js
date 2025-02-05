import React from 'react';
import '../stylesheets/NavBar.css';
import { Link } from 'react-router-dom';
import Mole from '../assets/Star-nosed-mole.png';
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  //the way each user profile will look in the feed
  const navigate = useNavigate();

  const handleClick = () => {
    props.removeToken();
    //props.setCurrUser("a");
    //console.log(props.currUser)
    window.location = '/';
    //navigate('/Profile');
  }

  return (
    <header>
      <nav className='navBar'>
        <Link to='/Profile'>
          <button className='navBtn'>My Profile</button>
        </Link>
        <div className='mascot'>
          <img className='navBarImage' src={Mole} alt='starmole' />
          <h1>CodersOnly</h1>
        </div>
        <div className='navBtnDiv'>
          <Link to='/Feed'>
            <button className='navBtn'>Find Coders!</button>
          </Link>
          <Link to='/Matches'>
            <button className='navBtn'>Check My Matches</button>
          </Link>
          <Link>
          <button onClick={handleClick} className='navBtn log-out'>Log Out</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
