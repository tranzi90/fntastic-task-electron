/* eslint-disable */
const users = document.querySelectorAll('.users .user')
// const userOverlay = document.querySelector('.user-hidden-overlay')

users.forEach((user, index) => {
  user.addEventListener('click', () => {
    userOverlay.classList.remove('hide')
    const currentContent = user.querySelector('.user-hidden')
    const hiddenContent = document.querySelectorAll('.users .user-hidden')
    hiddenContent.forEach((content) => {
      if (
        !content.classList.contains('hide') &&
        !(content === currentContent)
      ) {
        content.classList.add('hide')
      }
    })
    if (currentContent.classList.contains('hide')) {
      currentContent.classList.remove('hide')
    } else {
      currentContent.classList.add('hide')
    }
  })
})

// userOverlay.addEventListener('click', () => {
//   const hiddenContent = document.querySelectorAll('.users .user-hidden')
//   hiddenContent.forEach((content) => {
//     content.classList.add('hide')
//   })
//   userOverlay.classList.add('hide')
// })
