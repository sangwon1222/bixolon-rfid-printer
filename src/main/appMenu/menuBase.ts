const { Menu } = require('electron')
import icon from '../../../resources/favicon-16x16.png?asset'

export default abstract class TrayOptionBase {
  private menu: Electron.Menu

  constructor() {
    this.menu = Menu.buildFromTemplate([
      { label: '', icon, enabled: false },
      { type: 'separator' },
      { label: '새로고침', role: 'reload' },
      { label: '전체화면', click: () => this.maxmalize() },
      { label: '창 화면', click: () => this.minimalize() }
    ])

    Menu.setApplicationMenu(this.menu)
  }

  abstract minimalize(): void
  abstract maxmalize(): void
}
