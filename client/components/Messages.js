import React from 'react';
import '../stylesheets/ModalContainer.css';

const Messages = props => {
  return (
    <div className="mSent">
      <p className="sb1">{props.message}</p>
      <div className="underPic">
        <img alt='img' src={props.pic} />
        <p>{props.username}</p>
      </div>
    </div>
  );
};

export default Messages;
