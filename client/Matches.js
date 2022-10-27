import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MatchesItem from './components/MatchesItem';
import Navbar from './components/NavBar';
import './stylesheets/Matches.css';

import io from 'socket.io-client';

const Matches = props => {
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
              remover = {remover}
            />
          );
        });
        setUserMatches(matchesItemsArr);
      });
  }, []);

  async function remover(e) {
    await axios.put('/api/users/unmatch', {username: props.currUser, clickedUser: props.user.username})

    console.log("firing");
    axios.get(`/api/${props.currUser}`)
    .then(data => {
      const matchesArr = props.allUsers.filter((el) => {
        if (data.data.matches[el.username] === 'yes' && el.matches[props.currUser] === 'yes') return true;
      });
      // console.log(matchesArr)
      const matchesItemsArr = matchesArr.map((el) => {
        return <MatchesItem key={el._id} user={el} remover={remover} />;
      });
      setUserMatches(matchesItemsArr);
    })
  }

  return (
    <div>
      <Navbar removeToken={props.removeToken} />
      <h1 className="MyMatches">My Matches</h1>
      <div className="MainMatchesContainer">{userMatches}</div>
    </div>
  );
};

export default Matches;
