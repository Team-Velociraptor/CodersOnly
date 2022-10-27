import React from 'react';
import '../stylesheets/FeedItem.css';

const FeedItem = (props) => {
  //the way each user profile will look in the feed
  if (!props.user) {
    return (
      <div>
        <p className="no-users">There's no more users around you...</p>
        <p className="subscribe">Subscribe for $5.99 to get access to more coders in your area</p>
      </div>
    )
  }
  const { username, age, location, comment, proglang, url } = props.user;
  return (
    <div className='feedContainer'>
      <div className='username'>
        <h3 id='userName'>{username}</h3>
      </div>
      <img className='feedImage' src={url} alt='profileImage' />
      <p className='userDetail'>Age: {age}</p>
      <p className='userDetail'>Location: {location}</p>
      <p className='userDetail bio'>Bio: {comment}</p>
      <p className='userDetail'>Programming Language: {proglang}</p>
    </div>
  );
};

export default FeedItem;
