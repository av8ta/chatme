const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const bundler = require('./parcel.config')
const path = require('path')

// app uses bundler middleware if production mode
const isProd = process.env.NODE_ENV === 'production'
if (isProd) {
  app.use(bundler.middleware())
}

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'dist')))

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

// initialize router
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

let port = process.env.PORT
if (port == null || port == "") {
  port = 3000
}

http.listen(port, () => {
  console.log(`listening on *:${port}`)  
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
