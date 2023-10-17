import { BrowserWindow } from 'electron/main'
import TrayOptionBase from './trayBase'
const { Tray } = require('electron')

class CustomTray extends TrayOptionBase {
  private mTray: any
  private mWin: any
  private mIsQuit: boolean

  get quitMode() {
    return this.mIsQuit
  }

  constructor() {
    super()
    this.mIsQuit = false
  }

  init(window: BrowserWindow, icon: string) {
    this.mWin = window
    this.mTray = new Tray(icon)
    this.setMenu()
    this.doubleClick()
  }

  trayOpen() {
    this.mWin.show()
  }
  trayMinimize() {
    this.mWin.minimize()
    this.mWin.setSize(1000, 800)
  }
  trayClose() {
    this.mWin.hide()
  }
  trayQuit() {
    this.mIsQuit = true
    this.mWin.close()
  }

  setMenu() {
    const myMenu = this.trayMenu
    this.mTray.setToolTip('SONID 검수기')
    this.mTray.setContextMenu(myMenu)
  }

  doubleClick() {
    this.mTray.on('double-click', () => {
      const isVisible = this.mWin.isVisible()
      const isMinimized = this.mWin.isMinimized()

      if (!isVisible) {
        this.mWin.maximize()
        this.mWin.show()
        return
      }
      if (isMinimized) {
        this.mWin.maximize()
      } else {
        this.mWin.minimize()
      }
    })
  }
}

export default new CustomTray()
