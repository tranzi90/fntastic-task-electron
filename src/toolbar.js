const { getCurrentWindow } = require('@electron/remote')
const wnd = getCurrentWindow()

const minimize = document.querySelector('.minimize-window')
const resize = document.querySelector('.resize-window')
const close = document.querySelector('.close-window')

document.addEventListener('DOMContentLoaded', () => {
  minimize.addEventListener('click', () => {
    wnd.minimize()
  })

  close.addEventListener('click', () => {
    wnd.close()
  })

  resize.addEventListener('click', () => {
    if (!wnd.isMaximized()) {
      wnd.maximize()
      resize.classList.remove('icon-resize')
      resize.classList.add('icon-window-restore')
    } else {
      wnd.unmaximize()
      resize.classList.add('icon-resize')
      resize.classList.remove('icon-window-restore')
    }
  })
})

window.addEventListener('resize', () => {
  if (wnd.isMaximized()) {
    wnd.maximize()
    resize.classList.remove('icon-resize')
    resize.classList.add('icon-window-restore')
  } else {
    wnd.unmaximize()
    resize.classList.add('icon-resize')
    resize.classList.remove('icon-window-restore')
  }
})
