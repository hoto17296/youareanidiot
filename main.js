const { app, BrowserWindow } = require('electron')

const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 480,
    height: 360,
    useContentSize: true,
    resizable: false,
    fullscreen: false,
  })

  win.loadURL('file://' + path.join(__dirname, 'index.html'))
}

app.on('ready', createWindow)
