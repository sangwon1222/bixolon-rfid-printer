import { useStore } from '@renderer/store'
import { groupLog } from '@util/common'
import dbManager from './dbManager'

class Serialmanager {
  async connectSerialPort() {
    try {
      const { path, baudRate } = useStore.serial.default
      const { ok, msg } = await window.Serialapi.connect({ path, baudRate })
      groupLog(ok, 'SERIAL STATUS', [msg, `path: [${path}]`, `baudRate: [${baudRate}]`])

      useStore.serial.connect = ok
      useStore.serial.status = msg

      const data = await dbManager.update({
        path: useStore.serial.default.path,
        baudRate: useStore.serial.default.baudRate
      })
      console.log(data)

      return { ok, msg }
    } catch (e) {
      console.log('connectSerialPort', e)
      return { ok: false, msg: e.message }
    }
  }

  async write(data) {
    const { ok, msg } = await window.Serialapi.writeSerial(data)
    return { ok, msg }
  }

  async disconnect() {
    try {
      const { ok, msg } = await window.Serialapi.disconnect()
      return { ok, msg }
    } catch (e) {
      return { ok: false, msg: e.message }
    }
  }
}

export default new Serialmanager()
