const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    icon: './icon.png',
    width: 300,
    height: 70,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    x: 100,
    y: 100,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
  win.setIcon('./icon.png')
  win.setOpacity(1)
  win.webContents.openDevTools({
    mode: 'detach'
  });
}

app.whenReady().then(() => {
  createWindow()
})
