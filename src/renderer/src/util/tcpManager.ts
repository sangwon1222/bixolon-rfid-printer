import { useStore } from '@renderer/store'
import { groupLog, hex2a } from '@util/common'
import dbManager from './dbManager'

class TCPmanager {
  async connectPrint() {
    try {
      const { host, port } = useStore.tcp.default
      const { ok, msg } = await window.TCPapi.connectPrint({ host, port })

      groupLog(ok, 'TCP STATUS', [msg])
      useStore.tcp.connect = ok
      useStore.tcp.status = msg

      const data = await dbManager.update({
        host: useStore.tcp.default.host,
        port: useStore.tcp.default.port
      })
      console.log(data)

      return { ok, msg }
    } catch (e) {
      console.error(e)
      useStore.tcp.status = e.message
      return { ok: false, msg: e.message }
    }
  }

  async write(data) {
    const { ok, msg } = await window.TCPapi.writeTCP(data)
    return { ok, msg }
  }

  async disconnect() {
    try {
      // useStore.tcp.isInspecting = false
      const { ok, msg } = await window.TCPapi.disconnect()
      // store.idro.connect = false
      // store.idro.connectMsg = '연결 해제'
      console.log('disconnect', { ok, msg })

      return { ok, msg }
    } catch (e) {
      return { ok: false, msg: e.message }
    }
  }
}

export default new TCPmanager()
