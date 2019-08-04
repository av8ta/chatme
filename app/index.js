import io from 'socket.io-client'
const socket = io('http://localhost:3000')
import { comp, html, render, update } from 'hypersimple'
import { Message, Messages } from './components/Messages'

document.addEventListener('DOMContentLoaded', () => {
  // localStorage.setItem('name', 'av8ta')
  // let messages = [{ message: 'message 3' }, { message: 'message 4' }]
  // localStorage.setItem('messages', JSON.stringify(messages))
  let msgs = JSON.parse(localStorage.getItem('messages'))
  window.msgs = msgs

  socket.on('chat message', function(message) {
    const messages = model.messages
    messages.push({ message })
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
      socket.emit(
        'chat message',
        `${this.name()} - ${document.getElementById('messageInput').value}`
      )
      document.getElementById('messageInput').value = ''
    },
    name() {
      return localStorage.getItem('name')
    },
    messages: [{ message: 'selamat chat :)' }]
  }

  const App = comp(
    model => html`
      <ul id="messages">
        ${Message({ message: 'chatme!' })} ${Messages(model.messages)}
      </ul>
      <form action="" id="form" onsubmit=${() => model.onsubmit(event)}>
        <input
          id="messageInput"
          autocomplete="off"
          placeholder=${model.label}
        /><button>
          Send
        </button>
      </form>
    `
  )
  render(document.getElementById('app'), () => App(model))
})
