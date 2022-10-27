import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../stylesheets/MatchesItem.css';
import ChatBoxModal from './ChatBoxModal';

const MatchesItem = props => {
  const [modal, showModal] = useState(false);
  const [messages, setMessages] = useState();

  // The way each user profile will look in the feed
  if (!props.user) {
    return <p>You have no matches xD</p>;
  }
  //each props.user is currently a unique user object
  useEffect(() => {
    //console.log(props.user);
  }, []);

  const modalDisplay = (e, chatId) => {
    showModal(!modal);
    joinChat(chatId);
  };

  const joinChat = async chatId => {
    await props.socket.emit('joinChat', chatId);
  };

  const { username, age, location, comment, proglang, url } = props.user;
  return (
    <div className="matchesContainer">
      <div className="username">
        <h3 id="userName">{username}</h3>
      </div>
      <img className="matchesImage" src={url} alt="profileImage" />
      <div className="ageLocation">
        <p className="userDetail">
          <span className="infoProperty">Age:</span> {age}
        </p>
        <p className="userDetail">
          <span className="infoProperty">Location:</span> {location}
        </p>
      </div>
      <p className="userDetail bio">
        <span className="infoProperty">Bio:</span> {comment}
      </p>
      <p className="userDetail">
        <span className="infoProperty">Programming Language:</span> {proglang}
      </p>
      <div className="chatBtnDiv">
        <button className="navBtn" onClick={e => modalDisplay(e, props.chatId)}>
          Chat With {username}!
        </button>
        <ChatBoxModal
          chatId={props.chatId}
          socket={props.socket}
          show={modal}
          close={modalDisplay}
          name={username}
          pic={url}
        />
        <button className="navBtn log-out" onClick={e => props.remover(e, username)}>
          Unmatch!
        </button>
      </div>
    </div>
  );
};

export default MatchesItem;

// const MatchesItem = (props) => {
//   //the way each user profile will look in the feed
//   if (!props.user) {
//     return <p>No matches yet. Check back later!</p>;
//   }
//   const { username, age, location, comment, proglang, url } = props.user;
//   return (
//     <div>
//       <div className='feedContainer'>
//         <h3 id='userName'>{username}</h3>
//       </div>
//       <ul className='userProfile'>
//         <img src={url} alt='profileImage' />
//         <li className='userDetail'>Age: {age}</li>
//         <li className='userDetail'>Location: {location}</li>
//         <li className='userDetail'>Bio: {comment}</li>
//         <li className='userDetail'>Programming Language: {proglang}</li>
//       </ul>
//     </div>
//   );
// };

// export default MatchesItem;import React from 'react';
