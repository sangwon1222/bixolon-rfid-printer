import { groupLog } from '@util/common'

interface TypeUserSetting {
  host: string
  port: number
  path: number
  baudRate: number
  tcpLogs: () => []
  serialLogs: () => []
}

class DBmanager {
  async connectDB() {
    try {
      const { ok, msg, data } = await window.DBapi.connectDB()

      groupLog(ok, 'DB STATUS', [`${data.length}개의 데이터 ${msg}`])

      return { ok, msg, data }
    } catch (e) {
      return { ok: false, msg: e, data: [] }
    }
  }

  async read() {
    try {
      const result = await window.DBapi.read()
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async update(data: { [key: string]: string | number }) {
    try {
      const result = await window.DBapi.update(data)
      const read = await window.DBapi.read()
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async insert(data: { [key: string]: string | number }) {
    try {
      const result = await window.DBapi.insert(data)
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async insertSerial(log: string[]) {
    try {
      const stringify = JSON.stringify(log).replaceAll(`"`, `'`)
      console.log({ stringify })
      const result = await window.DBapi.insertSerial(stringify)
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }
  async insertTcp(log: string[]) {
    try {
      const stringify = JSON.stringify(log).replaceAll(`"`, `'`)
      console.log({ stringify })
      const result = await window.DBapi.insertTcp(stringify)
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async deleteAll() {
    try {
      const result = await window.DBapi.deleteAll()
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }
}

export default new DBmanager()
