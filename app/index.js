import io from 'socket.io-client'
import { comp, html, render, update } from 'hypersimple'
import { Messages } from './components/Messages'
import { PaperPlane } from './components/icons/PaperPlane'

const socket = io('http://localhost:3000')




const defaultMessage = [{ message: 'selamat chat :)', author: 'chatme!' }]

document.addEventListener('DOMContentLoaded', () => {

  socket.on('connect', e => {
    let name = localStorage.getItem('name')
    if (name === null) {
      name = prompt(`what's your name?`, `anonymous`)
      name === null || name === '' ? (name = `anonymous`) : null
      localStorage.setItem('name', name)
    }
    let messages = JSON.parse(localStorage.getItem('messages'))
    if (messages === null) {
      localStorage.setItem('messages', JSON.stringify(defaultMessage))
      messages = JSON.parse(localStorage.getItem('messages'))
    }

    console.log('connect', model)
    update(model, {
      name,
      messages
    })
  })
  socket.on('chat message', function(message) {
    message = JSON.parse(message)
    const messages = model.messages
    messages.push(message)
    update(model, {
      messages
    })
    localStorage.setItem('messages', JSON.stringify(messages))
  })

  const model = {
    label: 'type here to send a message',
    onsubmit(event) {
      console.log('message submitted', event, this)
      event.preventDefault()
      let message = JSON.stringify({
        message: document.getElementById('messageInput').value,
        author: localStorage.getItem('name')
      })
      socket.emit('chat message', `${message}`)
      document.getElementById('messageInput').value = ''
    },
    name: 'alice',
    messages: [
      {
        message: defaultMessage.message,
        author: defaultMessage.author
      }
    ]
  }

  const App = comp(
    model => html`
      <ul id="messages">
        ${Messages(model.messages)}
      </ul>
      <form action="" id="form" onsubmit=${() => model.onsubmit(event)}>
      <input id="messageInput" autocomplete="off" placeholder=${model.label} />
      <button>
        ${PaperPlane}
      </button>
      </form>
    `
  )
  render(document.getElementById('app'), () => App(model))
})

