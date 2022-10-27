const createServer = document.querySelector('.servers .icon-plus')
const servers = document.querySelector('.servers .items')

createServer.addEventListener('click', () => {
  servers.insertAdjacentHTML(
    'beforeend',
    `<div class="server">
  <img src="./src/discord.png" alt="" />
</div>`
  )
})
