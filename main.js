const { app, BrowserWindow } = require('electron')

const path = require('path')

let quit = false

function createWindow () {
  const win = new BrowserWindow({
    width: 480,
    height: 360,
    useContentSize: true,
    resizable: false,
    fullscreen: false,
  })

  win.loadURL('file://' + path.join(__dirname, 'index.html'))

  win.on('close', (event) => {
    if (!quit) {
      event.preventDefault()
      createWindow()
    }
  })
}

app.on('ready', createWindow)

app.on('before-quit', () => quit = true)
