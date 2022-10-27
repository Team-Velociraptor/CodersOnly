import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MatchesItem from './components/MatchesItem';
import Navbar from './components/NavBar';
import './stylesheets/Matches.css';

import io from 'socket.io-client';

const Matches = props => {
  const a_socket = io.connect('ws://localhost:3000');
  const [socket, changeSocket] = useState(a_socket);

  const [userMatches, setUserMatches] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${props.currUser}`)
      .then(data => data.json())
      .then(data => {
        return data;
      })
      .then(data => {
        //props.allUser contains all user profiles, el is another users profile
        const matchesArr = props.allUsers.filter(el => {
          if (
            data.matches[el.username] === 'yes' &&
            el.matches[props.currUser] === 'yes'
          )
            return true;
        });

        const matchesItemsArr = matchesArr.map(el => {
          const roomId = `${el._id}${data._id}`.split('').sort().join('');

          return (
            <MatchesItem
              chatId={roomId}
              socket={io.connect('ws://localhost:3000')}
              key={el._id}
              user={el}
            />
          );
        });

        setUserMatches(matchesItemsArr);
      });
  }, []);

  return (
    <div>
      <Navbar removeToken={props.removeToken} />
      <h1 className="MyMatches">My Matches</h1>
      <div className="MainMatchesContainer">{userMatches}</div>
    </div>
  );
};

export default Matches;
