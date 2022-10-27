<template>
  <div class="toolbar">
    <div class="logo">Fntastic</div>
    <div class="toolbar-btns">
      <div class="icon-window-minimize minimize-window"></div>
      <div class="icon-window-maximize resize-window"></div>
      <div class="icon-times close-window"></div>
    </div>
  </div>
  <div class="app">
    <div class="rooms-popup hide">
      <div class="rooms-popup-inner">
        <h2>Create a new channel</h2>
        <div class="rooms-popup-types">
          <div class="rooms-popup-type selected">
            <div class="custom-radio">
              <div class="custom-radio-inner"></div>
            </div>
            Voice channel
          </div>
          <div class="rooms-popup-type">
            <div class="custom-radio">
              <div class="custom-radio-inner"></div>
            </div>
            Text channel
          </div>
        </div>
        <input type="text" placeholder="Channel name" />
        <button>Create a channel</button>
      </div>
    </div>
    <div class="servers">
      <div class="items">
        <div class="server">
          <img src="discord.png" alt="" />
        </div>
      </div>
      <span class="icon-plus"></span>
    </div>
    <div class="rooms">
      <div class="upper">
        <div class="server-name">
          <div>Server 1</div>
          <span class="icon-chevron-down"></span>
          <div class="server-dropdown hide">
            <ul>
              <li class="create-category">Create a new category</li>
            </ul>
          </div>
        </div>
        <div
            class="room"
            v-for="room in rooms"
            :key="room.name"
        >
          <div class="room-title">
            <span class="icon-chevron-down"></span> {{ room.name }}
            <span class="icon-plus"></span>
          </div>
          <div class="rooms-wrapper">
            <div class="channels">
              <div
                  class="channel"
                  v-for="channel in room.channels"
                  :key="channel"
                  @click="addUser($event)"
              >
                <div class="channel-title">
                  <span class="icon-sharp"></span> {{ channel }}
                </div>
                <div class="channel-users">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="leave-channel hide">
          <div><span class="icon-wifi"></span>Connection established</div>
          <span class="leave-button">Click to leave the channel</span>
        </div>
        <div class="rooms-user">
          <div>
            <div class="user-avatar">
              <img src="player.png" alt="avatar">
            </div>
            <div class="user-info">
              <div class="user-name">Player</div>
              <div class="user-id">#3212</div>
            </div>
          </div>

          <div class="user-settings">
            <div class="icon-microphone"></div>
            <div class="icon-headphones"></div>
            <div class="icon-gear"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat">
      <div class="chat-topbar">
        <div class="chat-channel-name">
          <span class="icon-sharp"></span>&nbsp; Channel
        </div>
        <div class="top-bar-btns">
          <div class="icon-bell-o notification"></div>
          <div class="pinned-messages-overlay"></div>
          <div class="pinned-messages">
            <div class="content">
              <div class="pinned-message-title">Pinned message</div>
              <div></div>
            </div>
          </div>
          <div class="icon-users users"></div>
        </div>
      </div>

      <div class="chat-content">
        <div class="chat-messages">
          <div class="chat-message message">
            <div class="message-inner">
              <div class="message-avatar">
                <img src="player.png" alt="avatar">
              </div>
              <div class="message-info">
                <span class="message-author">Player</span>
                <span class="message-time"
                > {{new Date().toDateString()}}
                    <span class="icon-gear">
                      <ul>
                        <li class="pin-message">Pin</li>
                        <li class="edit-message">Edit</li>
                        <li class="delete-message">Delete</li>
                      </ul></span
                    ></span
                >
                <div class="message-content">
                  just dummy chat message
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-field">
        <div class="icon-plus-circle chat-add"></div>
        <div
            contenteditable="true"
            type="text"
            class="chat-input textarea"
            placeholder="message #room1"
        ></div>
        <div class="icon-gift chat-gift"></div>
        <div class="icon-smile-o chat-smiles"></div>
      </div>
    </div>
    <div class="users-list">
      <div class="users-list-topbar">
        <div class="search">
          <input type="text" placeholder="Search" />
          <button class="icon-search"></button>
        </div>
      </div>
      <div class="groups">
        <div class="group">
          <div class="group-name">
            B.O.T. - <span class="users-quantity">5</span>
          </div>
          <div class="users">
            <div
                class="user"
                v-for="user in users.slice(0, 5)"
                :key="user.username"
            >
              <div class="user-avatar">
                <img :src="user.avatar" alt="avatar">
              </div>
              <div>
                <div class="user-name">{{ user.username }}</div>
                <div class="user-status">{{ user.status }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="group">
          <div class="group-name">
            THE MEMBERS - <span class="users-quantity">5</span>
          </div>
          <div class="users members">
            <div
                class="user"
                v-for="user in users.slice(-5)"
                :key="user.username"
            >
              <div class="user-avatar">
                <img :src="user.avatar" alt="avatar">
              </div>
              <div>
                <div class="user-name">{{ user.username }}</div>
                <div class="user-status">{{ user.status }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, } from "vue"
import { collection, getDocs } from "firebase/firestore"
import { db } from '@/firebase'

const users = ref([])
const rooms = ref([])

onBeforeMount(async () => {
  const querySnapshot = await getDocs(collection(db, "users"))
  let fetchedUsers = []
  querySnapshot.forEach((doc) => {
    const user = {
      username: doc.data().username,
      status: doc.data().status,
      avatar: doc.data().avatar
    }
    fetchedUsers.push(user)
  })
  users.value = fetchedUsers

  const queryRooms = await getDocs(collection(db, "rooms"))

  queryRooms.forEach((doc) => {
    const room = {
      name: doc.data().name,
      channels: doc.data().channels
    }
    rooms.value.push(room)
  })
})

const addUser = (e) => {
  const exists = document.querySelector('.you')
  if (exists)
    exists.remove()
  const you = document.createElement('div')
  you.classList.add('you', 'channel-user-name')
  you.textContent = 'Player'
  e.target.appendChild(you)
}

</script>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
