/* eslint-disable */
const chatField = document.querySelector('.textarea:not(.editing)')
const pinnedMessages = document.querySelector('.pinned-messages')

chatField.addEventListener('keypress', (e) => {
  if (
    !e.shiftKey &&
    e.key === 'Enter' &&
    !e.target.classList.contains('editing')
  ) {
    e.preventDefault()
    pushMessage(e.target.innerHTML)

    addListeners()
    e.target.innerHTML = ''
  } else if (
    !e.shiftKey &&
    e.key === 'Enter' &&
    e.target.classList.contains('editing')
  ) {
    e.preventDefault()
    const id = e.target.dataset.id
    const message = document.querySelectorAll('.chat-message')[id]
    const messageContent = message.querySelector('.message-content')
    messageContent.textContent = e.target.textContent
    e.target.classList.remove('editing')
    messageContent.classList.add('edited')
    delete e.target.dataset.id
    e.target.textContent = ''
  }
})

function pushMessage(value) {
  const messages = document.querySelector('.chat-messages')
  const total = document.querySelectorAll('.chat-message').length
  const author = 'Player'
  const date = new Date().toDateString()
  const messageHTML = document.createElement('div')
  messageHTML.classList.add('chat-message', 'message')
  messageHTML.innerHTML = `
    <div class="message-inner">
      <div class="message-avatar"><img src="player.png" alt="avatar"></div>
      <div class="message-info">
        <span class="message-author">${author}</span>
        <span class="message-time">
          ${date}
          <span class="icon-gear">
            <ul data-id="${total + 1}">
              <li class="pin-message">Pin</li>
              <li class="delete-message">Delete</li>
              <li class="edit-message">Edit</li>
            </ul>
          </span>
        </span>
        <div class="message-content">
          ${value}
        </div>
      </div>
    </div>
  `
  messages.appendChild(messageHTML)
}

function addListeners() {
  const messages = document.querySelectorAll('.chat-message')
  messages.forEach((message, index) => {
    message.addEventListener('click', (e) => {
      const messageContent = message.querySelector('.message-content')
      // @ts-ignore
      if (e.target.classList.contains('delete-message')) {
        message.remove()
        // @ts-ignore
      } else if (e.target.classList.contains('pin-message')) {
        pinnedMessages.querySelector('.content div:last-child').innerHTML =
          messageContent.textContent
        // @ts-ignore
      }
    })
  })
  const editButtons = document.querySelectorAll('.edit-message')
  editButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const message = document.querySelectorAll('.chat-message')[index]
      const messageContent = message.querySelector('.message-content')
      chatField.textContent = messageContent.textContent
      chatField.classList.add('editing')
      chatField.dataset.id = index
    })
  })
}

addListeners()

pinnedMessages.addEventListener('click', () => {
  const overlay = document.querySelector('.pinned-messages-overlay')
  const pinnedMessageContent = document.querySelector(
    '.pinned-messages .content'
  )
  pinnedMessageContent.style.display = 'block'
  overlay.style.display = 'block'
  overlay.addEventListener('click', () => {
    pinnedMessageContent.style.display = 'none'
    overlay.style.display = 'none'
  })
  overlay.removeEventListener('click', () => {})
})
