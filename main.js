const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    icon: './icon.png',
    width: 800,
    height: 120,
    transparent:true,
    frame: false,

  })

  win.loadFile('index.html')
  win.setIcon('./icon.png')
  // win.webContents.openDevTools({
  //   mode: 'bottom'
  // });
}

app.whenReady().then(() => {
  createWindow()
})