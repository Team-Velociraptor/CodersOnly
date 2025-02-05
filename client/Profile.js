import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/NavBar';
import './stylesheets/Profile.css';
import UpdateProfile from './components/UpdateProfile';

//need to fetch our profile data from the database to fill in our profile
const Profile = (props) => {
  //deconstructed props object
  const [profileData, setProfileData] = useState({
    username: null,
    age: null,
    location: null,
    comment: null,
    proglang: null,
    url: null,
  });
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    fetch(`/api/users/${props.currUser}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setProfileData(data);
      });
  }, []);

  const { username, age, location, comment, proglang, url } = profileData;

  function update() {
    setShowUpdate(!showUpdate)
  }

  return (
    <div>
      <Navbar removeToken={props.removeToken} />
      <div className='profilePage'>
        <div className='profileContainer'>
          <div className='username'>
            <h1>{username}</h1>
          </div>
          <img className='profileImage' src={url} alt='profileImage' />
          <div className ="ageLocation">
            <p className="userDetail"><span className="infoProperty">Age:</span> {age}</p>
            <p className="userDetail"><span className="infoProperty">Location:</span> {location}</p>
          </div>
          <p className="userDetail bio"><span className="infoProperty">Bio:</span> {comment}</p>
          <p className="userDetail"><span className="infoProperty">Programming Language:</span> {proglang}</p>
          <button className="updateProfile navBtn" onClick={update}>Update My Profile</button>
          {showUpdate ? <UpdateProfile user={profileData} update={setProfileData} hide={setShowUpdate} curr={showUpdate} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
