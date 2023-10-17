import { BrowserWindow } from 'electron/main'
import AppMenuBase from './menuBase'

class ApplicationMenu extends AppMenuBase {
  private mWin: any
  constructor() {
    super()
  }
  init(window: BrowserWindow) {
    this.mWin = window
  }
  minimalize() {
    this.mWin.setKiosk(false)
  }
  maxmalize() {
    this.mWin.setKiosk(true)
  }
}

export default new ApplicationMenu()
