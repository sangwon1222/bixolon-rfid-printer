import { SerialPort } from 'serialport'
import { TypeMiddleware, TypeResponse } from '../common'

class Serial implements TypeMiddleware {
  private mPort!: SerialPort
  private mIsConnected = false
  private mPortOption: { path: string; baudRate: number } = { path: '', baudRate: 0 }
  get list() {
    return SerialPort.list()
  }

  _check() {
    return this.mIsConnected
  }

  async _reConnect() {
    const { path, baudRate } = this.mPortOption
    try {
      const { ok, msg } = (await this._connectSerial({ path, baudRate })) as TypeResponse
      if (!ok) console.error(msg)
      return { ok, msg }
    } catch (e) {
      return { ok: false, msg: '재 연결 실패' }
    }
  }

  async _closeSerialport() {
    if (this.mPort?.isOpen) {
      this.mPort?.close()
      this.mPort?.destroy()
    }
    this.mIsConnected = false
    return true
  }

  async _connectSerial({ path, baudRate }: { path: string; baudRate: number }) {
    return new Promise((resolve, _reject) => {
      this._closeSerialport()
      this.mPortOption = { path, baudRate }
      this.mPort = new SerialPort({ path, baudRate, autoOpen: false })

      this.mPort.open((error) => {
        try {
          if (error) {
            this._closeSerialport()
            return resolve({ ok: false, msg: error })
          } else {
            /**CONNECT */
            this.mPort.write('connect')

            /**RECEIVE DATA */
            this.mPort.on('data', (data) => this.serialReceiveData(data))

            /** REGIST CLOSE EVENT */
            const list = ['timeout', 'end', 'close', 'error']
            for (const status of list) {
              this.mPort.on(status, (e) => {
                if (e) {
                  this.mIsConnected = false
                  resolve({ ok: false, msg: e.message })
                  return
                }
              })
            }

            this.mIsConnected = true
            resolve({ ok: true, msg: 'SERIAL PORT 연결 성공' })
          }
        } catch (e) {
          this._closeSerialport()
          resolve({ ok: false, msg: e })
        }
      })
    })
  }

  writeSerial(sendData) {
    console.log('[serialport node write]', sendData)
    this.mPort.write(sendData)
    return { ok: true, msg: `send: [ ${sendData} ]` }
  }

  serialReceiveData(data) {
    //
  }
}

export default new Serial()
