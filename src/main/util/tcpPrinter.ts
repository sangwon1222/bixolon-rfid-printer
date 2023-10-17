import net from 'net'
import { TypeMiddleware, TypeResponse } from '../common'
import Common from '../common'

class TCPprinter implements TypeMiddleware {
  private mTcp!: net.Socket
  private mTcpHost: { host: string; port: number } = { host: '', port: 0 }
  private mIsConnected = false

  _check() {
    return this.mIsConnected
  }

  async _reConnect() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, _reject) => {
      const { host, port } = this.mTcpHost
      let { ok, msg } = { ok: false, msg: 'TCP timeout' }
      const tcp = (await this._connectTCP({ host, port })) as TypeResponse
      ok = tcp.ok
      msg = tcp.msg
      if (!ok) console.error(msg)

      setTimeout(() => {
        resolve({ ok, msg })
        return
      }, 1000)
    })
  }

  async _closeTCP() {
    this.mTcp?.end()
    this.mTcp?.destroy()
    return true
  }

  _connectTCP({ host, port }: { host: string; port: number }) {
    return new Promise((resolve, _reject) => {
      this._closeTCP()
      this.mTcpHost = { host, port }
      this.mTcp = net.createConnection({ port, host })

      /**SET TIME OUT */
      setTimeout(() => {
        if (this.mIsConnected) return
        this.mIsConnected = false
        console.log('reject_timeout')
        resolve({ ok: false, msg: 'time_out(1초)', host, port })
        return
      }, 1000)

      /**CONNECT */
      this.mTcp.once('connect', async () => {
        this.mIsConnected = true
        resolve({ ok: true, msg: 'TCP 연결 성공', host, port })
      })

      /**RECEIVE DATA */
      this.mTcp.on('data', (data) => this.tcpReceiveData(data))

      /** REGIST CLOSE EVENT */
      const list = ['timeout', 'end', 'close', 'error']
      for (const status of list) {
        this.mTcp.on(status, (e) => {
          if (e) {
            this.mIsConnected = false
            resolve({ ok: false, msg: e.message, host, port })
            return
          }
        })
      }
    })
  }

  writeTCP(sendData) {
    console.log('[tcp node write]', sendData)
    this.mTcp.write(sendData)
    return { ok: true, msg: `send: [ ${sendData} ]` }
  }

  tcpReceiveData(data) {
    //
  }
}

export default new TCPprinter()
