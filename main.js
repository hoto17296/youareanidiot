const electron = require('electron')

const path = require('path')

let quit = false

function createWindow () {
  const win = new electron.BrowserWindow({
    width: 240,
    height: 180,
    useContentSize: true,
    resizable: false,
    fullscreen: false,
  })

  win.loadURL('file://' + path.join(__dirname, 'index.html'))

  let [dx, dy] = [10, 10]

  const interval = setInterval(() => {
    if (win.isDestroyed()) {
      clearInterval(interval)
      return
    }
    const workArea = electron.screen.getPrimaryDisplay().workArea
    const winPos = win.getPosition()
    const winWorkAreaPos = {
      x: winPos[0] - workArea.x,
      y: winPos[1] - workArea.y,
    }
    const margin = {
      left: winWorkAreaPos.x,
      right: workArea.width - winWorkAreaPos.x - win.getSize()[0],
      top: winWorkAreaPos.y,
      bottom: workArea.height - winWorkAreaPos.y - win.getSize()[1],
    }
    if (margin.left + dx < 0 || margin.right - dx < 0) dx *= -1
    if (margin.top + dy < 0 || margin.bottom - dy < 0) dy *= -1
    win.setPosition(winPos[0] + dx, winPos[1] + dy)
  }, 10)

  win.on('close', (event) => {
    if (!quit) {
      event.preventDefault()
      createWindow()
    }
  })
}

electron.app.on('ready', createWindow)

electron.app.on('before-quit', () => quit = true)
