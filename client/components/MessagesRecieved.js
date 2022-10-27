import React from 'react';
import '../stylesheets/ModalContainer.css';

const MessagesRecieved = props => {
  console.log(props.pic);
  return (

    <div className="mRecieved">
      <div className="underPicRec">
        <img alt='img' src={props.pic} />
        <p className='recUser'>{props.username}</p>
      </div>
        <p>{props.message}</p>
      </div>

  );
};

export default MessagesRecieved;
