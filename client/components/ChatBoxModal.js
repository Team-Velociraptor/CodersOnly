import React, { useEffect, useState } from 'react';
import '../stylesheets/ModalContainer.css';
import Messages from './Messages';
import axios from 'axios';
import MessagesRecieved from './MessagesRecieved';

const ChatBoxModal = props => {
  const [msgs, setMsgs] = useState([]);
  const [pfp, setPfp] = useState();
  const [messageBody, setMessageBody] = useState('');
  const [currentChatId, setChatId] = useState();
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    async function getMsgs() {
      // will be making await calls using axios to backend - passing down to model as messages prop
      const user1 = await axios.get(`/api/${token}`);
      axios
        .get(`/api/messages?user_1=${user1.data.username}&user_2=${props.name}`)

        .then(response => {
          console.log('CHAT_ID', response.data[0].chat_id);

          const newArr = response.data.map((el, i) => {
            if (el.owner_name === user1.data.username) {
              return (
                <Messages
                  username={el.owner_name}
                  message={el.message_text}
                  pic={user1.data.url}
                  key={`unique-${i}`}
                />
              );
            } else {
              return (
                <MessagesRecieved
                  username={el.owner_name}
                  message={el.message_text}
                  pic={props.pic}
                />
              );
            }
          });
          console.log('INIT ARR', newArr);
          setMsgs(newArr);
        });
    }
    getMsgs().catch(err => console.log('yo'));
    // changeSocket();
  }, []);

  useEffect(() => {
    props.socket.on('recieveMessage', data => {
      console.log('STATE', msgs);
      console.log('DATA', data);

      setMsgs(oldMsgs => {
        return [
          ...oldMsgs,
          <Messages username={'RAMA'} message={data.message} pic={''} />,
        ];
      });
    });
  }, [props.socket]);

  const changeMsgs = newMsg => {
    console.log('BEFORE STATE CHANGE', msgs);
    console.log('argument newMSG', newMsg);
    setMsgs(oldValue => {
      const array = [
        ...oldValue,
        <Messages username={'test'} message={newMsg} pic={'user1.data.url'} />,
      ];
      console.log(array);
      return array;
    });
  };

  async function sendMsgs() {
    const user1 = await axios.get(`/api/${token}`);
    await axios.post('api/messages', {
      user_1: user1.data.username,
      user_2: props.name,
      messageText: document.querySelector('.forMsg').value,
    });
    document.querySelector('.forMsg').value = '';
    // console.log(document.querySelector('.forMsg').value)
  }
  //==========================================
  const sendMessage = async () => {
    if (messageBody) {
      console.log('SEND CHAT CHATID', props.chatId);

      sendMsgs();

      await props.socket.emit('chatMessages', {
        message: messageBody,
        chatId: props.chatId,
      });

      setMessageBody('');
    }
  };

  if (!props.show) return null;
  return (
    <div className="ModalContainer">
      <h1 className="chatWith">Your chat with {props.name}</h1>
      <div className="msgDisplay">{msgs}</div>
      <input
        name="forChat"
        onChange={e => setMessageBody(e.target.value)}
        type="text"
        placeholder="Send Your Message..."
        className="forMsg"
      ></input>
      <button onClick={props.close} className="closeButton">
        X
      </button>
      <button onClick={sendMessage} className="sendButton">
        <span className="sendButtonSpan">Send</span>
      </button>
    </div>
  );
};

export default ChatBoxModal;
