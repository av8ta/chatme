const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

http.listen(3000, () => {
  console.log('listening on *:3000')  
})

io.on('connection', socket => {
  console.log('a user has connected')
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  })
  socket.on('chat message', message => {
    console.log('message: ', message);
    io.emit('chat message', message)
  })
  
})