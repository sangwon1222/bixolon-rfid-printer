import { IpcRenderer } from 'electron'

export default class SerialApi {
  private mIpcRenderer: IpcRenderer
  private mCallback: any

  constructor(ipcRenderer: IpcRenderer) {
    this.mIpcRenderer = ipcRenderer
    this.mCallback = null
  }
  async connect({ path, baudRate }) {
    return new Promise((resolve, _reject) => {
      const parmas = { path, baudRate }
      const func = '_connectSerial'
      this.mIpcRenderer.invoke(func, parmas).then(({ ok, msg }) => resolve({ ok, msg }))
    })
  }

  async disconnect() {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('_disconnectSerialport').then(({ ok, msg }) => resolve({ ok, msg }))
    })
  }

  async writeSerial(code: string) {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('writeSerial', [code]).then(({ ok, msg }) => {
        resolve({ ok, msg })
      })
    })
  }
  async receive(raw: string, data: string) {
    console.log('serialport', { raw, data })
    if (this.mCallback) this.mCallback(data)
  }

  bindUpdateLogFromVue(cb: (logString: string) => void) {
    this.mCallback = cb
  }
}
