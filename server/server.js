const express = require('express');
const app = express();
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');
const port = 3000;
const authRouter = require('./routes/auth');
const functionRouter = require('./routes/functions');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const apiRouter = require('./api');
const cors = require('cors');
app.use(cors());

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

//added this bc axios issues
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.status(200);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO: Turn on once backend has been refactored
app.use('/api/functions', functionRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);

app.use('/api', apiRouter);

io.on('connection', socket => {
  console.log(`Client connected: ${socket.id}`);

  console.log('CLIENTS CONNECTED', socket.client());

  socket.on('joinChat', chatId => {
    console.log('JOINED CHAT', chatId);

    console.log(socket.join(chatId));
  });

  socket.on('chatMessages', data => {
    console.log('CHAT FROM BACKEND', data);

    io.to(data.chatId).emit('recieveMessage', data);
  });
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

server.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
