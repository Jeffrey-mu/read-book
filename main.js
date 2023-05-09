const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    icon: './icon.png',
    width: 600,
    height: 320,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    x: 0,
    y: 0,

  })

  win.loadFile('index.html')
  win.setIcon('./icon.png')
  // win.webContents.openDevTools({
  //   mode: 'detach'
  // });
}

app.whenReady().then(() => {
  createWindow()
})
