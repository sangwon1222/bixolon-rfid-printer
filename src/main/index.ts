import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { app, shell, BrowserWindow } from 'electron'
import icon from '../../resources/icon.png?asset'
import Serial from './util/serialPort'
import TCPprinter from './util/tcpPrinter'
import DBbase from './util/DBbase'
import Common from './common'
import { join } from 'path'
import tray from './tray/tray'
import ApplicationMenu from './appMenu/menu'

const init = async () => {
  await Common.registMiddleware(DBbase, 'DB')
  await Common.registMiddleware(TCPprinter, 'TCP')
  await Common.registMiddleware(Serial, 'Serial')
}

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: true,
    title: '빅솔론 발행기',
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    icon: icon,
    // frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  tray.init(mainWindow, icon)

  mainWindow.on('close', function (event) {
    event.preventDefault()
    app.exit()
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.moveTop()
    mainWindow.setKiosk(false)
    mainWindow.maximize()
    // mainWindow.setMinimumSize(800, 600)
    mainWindow.show()
    ApplicationMenu.init(mainWindow)
  })

  await init()

  Serial.serialReceiveData = (data) => {
    mainWindow.webContents.send('serial-receive-data', {
      raw: Common.ascii_to_hex(data.toString()),
      data: data.toString()
    })
  }
  TCPprinter.tcpReceiveData = (data) => {
    mainWindow.webContents.send('tcp-receive-data', { raw: data, data: data.toString() })
  }

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(mainWindow.webContents)
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', async () => {
  console.log('window-all-closed', process.platform)
  if (process.platform === 'darwin') return
  await TCPprinter._closeTCP()
  await DBbase._close()
  await Serial._closeSerialport()
  app.quit()
})
