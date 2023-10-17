interface TypeObject {
  [key: string]: any
}

export default class TCPApi {
  private mIpcRenderer: any
  private mCallback: any

  constructor(ipcRenderer: Electron.IpcRenderer) {
    this.mIpcRenderer = ipcRenderer
    this.mCallback = null
  }

  async connectPrint({ host, port }: TypeObject) {
    return new Promise((resolve, _reject) => {
      const params = { host, port }
      this.mIpcRenderer.invoke('_connectTCP', params).then((result) => resolve(result))
    })
  }

  async disconnect() {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('_disconnectTCP').then(({ ok, msg }) => resolve({ ok, msg }))
    })
  }

  async writeTCP(code: string) {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('writeTCP', [code]).then(({ ok, msg }) => {
        resolve({ ok, msg })
      })
    })
  }
  async receive(raw: string, data: string) {
    console.log('tcp', { raw, data })
    if (this.mCallback) this.mCallback(data)
  }

  bindUpdateLogFromVue(cb: (logString: string) => void) {
    this.mCallback = cb
  }
}
