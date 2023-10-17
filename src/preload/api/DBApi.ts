interface TypeDBResponse {
  ok: boolean
  msg?: string
  data?: any[]
}

export default class DBapi {
  private mIpcRenderer: any
  constructor(ipcRenderer) {
    this.mIpcRenderer = ipcRenderer
  }
  async connectDB(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('_connectDB').then((result) => resolve(result))
    })
  }

  async disconnect() {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('_disconnectDB').then(({ ok, msg }) => resolve({ ok, msg }))
    })
  }

  async read(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('read').then((result) => resolve(result))
    })
  }

  async update(data: { [key: string]: string }): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('update', [data]).then((result) => resolve(result))
    })
  }

  async insert(data: { [key: string]: string }): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('insert', [data]).then((result) => resolve(result))
    })
  }

  async insertSerial(log: string): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      console.error(JSON.stringify(log))

      this.mIpcRenderer.invoke('insertSerial', [log]).then((result) => resolve(result))
    })
  }

  async insertTcp(log: string): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('insertTcp', [log]).then((result) => resolve(result))
    })
  }

  async deleteAll(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('deleteAll').then((result) => resolve(result))
    })
  }
}
