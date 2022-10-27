/* eslint-disable */
const roomsContainer = document.querySelector('.rooms')
const serverTitle = document.querySelector('.server-name')
const serverDropdown = document.querySelector('.server-dropdown')
const createCategory = serverDropdown.querySelector('li:first-child') // room === category

serverTitle.addEventListener('click', () => {
  if (serverDropdown.classList.contains('hide')) {
    serverDropdown.classList.remove('hide')
  } else {
    serverDropdown.classList.add('hide')
  }
})

createCategory.addEventListener('click', () => {
  const category = document.createElement('div')
  const roomTitle = document.createElement('div')
  const addChannelButton = document.createElement('span')
  addChannelButton.classList.add('icon-plus')
  roomTitle.insertAdjacentHTML(
    'beforeend',
    `<span class="icon-chevron-down"></span> Some Name`
  )
  roomTitle.classList.add('room-title')
  roomTitle.appendChild(addChannelButton)

  const roomsWrapper = document.createElement('div')
  const channels = document.createElement('div')
  roomsWrapper.classList.add('rooms-wrapper')
  channels.classList.add('channels')
  roomsWrapper.appendChild(channels)
  category.appendChild(roomTitle)
  category.appendChild(roomsWrapper)
  category.classList.add('room')
  document.querySelector('.rooms .upper').appendChild(category)
  // Добавляем слушатели для созданных элементов
  addRoomTitleHandlers()
  createChannelHandlers()
})

function addRoomTitleHandlers() {
  const roomsTitles = document.querySelectorAll('.room-title')
  roomsTitles.forEach((title, index) => {
    title.addEventListener('click', (e) => {
      titleClickHandler(e, index, roomsTitles)
    })
  })
}

addRoomTitleHandlers()

function titleClickHandler(e, index, roomsTitles) {
  const roomsWrappers = document.querySelectorAll('.rooms-wrapper')

  if (e.target.classList.contains('icon-plus')) return false
  if (roomsWrappers[index].classList.contains('hide')) {
    roomsWrappers[index].classList.remove('hide')
    roomsTitles[index].querySelector('span').style.transform = 'rotate(0deg)'
  } else {
    roomsWrappers[index].classList.add('hide')
    roomsTitles[index].querySelector('span').style.transform = 'rotate(-90deg)'
  }
}

const voiceChannelTitles = document.querySelector('.channels')

voiceChannelTitles.forEach((title) => {
  title.addEventListener('click', (e) => {
    voiceChannelHandler(e)
  })
})

const leaveChannel = document.querySelector('.leave-channel')
leaveChannel.addEventListener('click', () => {
  const voiceChannels = document.querySelectorAll('.voice-channel')
  voiceChannels.forEach((channel) => {
    if (channel.querySelector('.you')) {
      channel.querySelector('.you').remove()
    }
  })
  leaveChannel.classList.add('hide')
})

const popup = document.querySelector('.rooms-popup')
popup.addEventListener('click', (e) => {
  if (e.target.classList.contains('rooms-popup')) {
    popup.classList.add('hide')
  }
})

function voiceChannelHandler(e) {
  const voiceChannels = document.querySelectorAll('.channel')
  const currentChannel = e.target.parentNode
  const you = document.createElement('div')
  you.classList.add('you', 'channel-user-name')
  you.textContent = 'Player'
  you.insertAdjacentHTML('afterbegin', '&nbsp;')
  voiceChannels.forEach((channel) => {
    if (channel.querySelector('.you')) {
      channel.querySelector('.you').remove()
    }
  })
  currentChannel.querySelector('.channel-users').appendChild(you)
  // leaveChannel.classList.remove('hide')
}

let roomId
function createChannelHandlers() {
  const createChannelButtons = document.querySelectorAll(
    '.room-title .icon-plus'
  )
  createChannelButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      roomId = index
      popup.classList.remove('hide')
    })
  })
}
createChannelHandlers()

let channelType = 'Voice'
const radioButtons = document.querySelectorAll('.rooms-popup-type')
radioButtons[0].addEventListener('click', (e) => {
  channelType = 'Voice'
  radioButtons[0].classList.add('selected')
  radioButtons[1].classList.remove('selected')
  return false
})
radioButtons[1].addEventListener('click', (e) => {
  channelType = 'Text'
  radioButtons[1].classList.add('selected')
  radioButtons[0].classList.remove('selected')
  return false
})

let channelName = ''
const channelNameInput = document.querySelector('.rooms-popup input')
channelNameInput.addEventListener('change', (e) => {
  channelName = e.target.value
})
channelNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    createChannel(e.target.value, channelType, roomId)
  }
})

const createButton = document.querySelector('.rooms-popup button')
createButton.addEventListener('click', () =>
  createChannel(channelName, channelType, roomId)
)

function createChannel(name = 'Name', type = 'Text', roomId) {
  const channelTitle = document.createElement('div')
  channelTitle.classList.add(
    'channel-title',
    `${type === 'Text' ? 'text-channel-title' : 'voice-channel-title'}`
  )
  channelTitle.innerHTML = `<span class="${
    type === 'Text' ? 'icon-sharp' : 'icon-volume-down'
  }"></span> ${name}`
  const channelUsers = document.createElement('div')
  channelUsers.classList.add('channel-users')

  let channel = document.createElement('div')
  channel.classList.add(
    'channel',
    `${type === 'Text' ? 'text-channel' : 'voice-channel'}`
  )
  if (type === 'Voice') {
    channelTitle.addEventListener('click', (e) => {
      voiceChannelHandler(e)
    })
  }
  channel.appendChild(channelTitle)
  channel.appendChild(channelUsers)
  document
    .querySelectorAll('.room')
    [roomId].querySelector('.channels')
    .appendChild(channel)

  channelNameInput.value = ''
  popup.classList.add('hide')
}
