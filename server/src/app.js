const express = require('express');
const bodyParser = require('body-parser');
const errorHandling = require('./middlewares/errorHandling')
const cors = require('cors');
const http = require('http');

const app = express();
const port = 3001;

console.log(`Api rodando na porta ${port}`);


const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
});
server.listen(port);

const trade = require('./routes/trade');

app.use(cors());
app.use(bodyParser.json());


io.on('connection', (socket) => {
  socket.on('join-room', (room) => socket.join(room))
  socket.on('user', ({user}, room) => {
    socket.to(room).emit('user', user)
  })
  socket.on('userPokemon', (updatedList, room) => {
    socket.to(room).emit('partnerPokemon', updatedList)
  });
  socket.on('readyTrade', ({ready}, room) => socket.to(room).emit('readyTrade', ready));
});




// app.use('/login', login);
app.use('/trade', trade);

app.use(errorHandling);

module.exports = server;
