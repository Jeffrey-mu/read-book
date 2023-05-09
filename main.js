const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    icon: './icon.png',
    width: 300,
    height: 60,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    x: 100,
    y: 100,

  })

  win.loadFile('index.html')
  win.setIcon('./icon.png')
  win.setOpacity(1)
  // win.webContents.openDevTools({
  //   mode: 'detach'
  // });
}

app.whenReady().then(() => {
  createWindow()
})
