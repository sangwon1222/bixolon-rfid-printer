const sqlite3 = require('sqlite3').verbose()
import { TypeMiddleware } from '../common'
const fs = require('fs')
interface TypeDBResponse {
  ok: boolean
  msg?: string
  data?: any | undefined
  user?: any | undefined
}
const createTableSQL =
  'CREATE TABLE IF NOT EXISTS socketData (' +
  'idx INTEGER NOT NULL UNIQUE, ' +
  'host TEXT DEFAULT "192.168.0.5",' +
  'port INTEGER DEFAULT "5555",' +
  'path TEXT DEFAULT "COM1",' +
  'baudRate INTEGER DEFAULT "9100",' +
  'tcpLogs TEXT DEFAULT "",' +
  'serialLogs TEXT DEFAULT "" ,' +
  'password TEXT DEFAULT "000000",' +
  'PRIMARY KEY(idx AUTOINCREMENT)' +
  ')'

const filePath = './db/socket-data.db'

class DBbase implements TypeMiddleware {
  private mDB: any

  _check() {
    return this.mDB
  }

  async _reConnect() {
    try {
      const { ok, msg } = await this._connectDB()
      if (!ok) console.error(msg)
      return { ok, msg }
    } catch (e) {
      return { ok: false, msg: '재 연결 실패' }
    }
  }

  async _close() {
    this.mDB?.close()
    return true
  }

  async _connectDB(): Promise<TypeDBResponse> {
    try {
      const createDB = await this.createTable()

      if (createDB.ok) {
        const firstRead = await this.read()
        if (firstRead.data.length != 1) {
          await this.insert({
            host: '192.168.0.1',
            port: 9100,
            path: 'COM1',
            baudRate: 9600,
            tcpLogs: '[]',
            serialLogs: '[]'
          })
          const read = await this.read()
          return { ok: read.ok, data: read.data, msg: read.msg }
        }
        return { ok: firstRead.ok, data: firstRead.data, msg: firstRead.msg }
      } else {
        return { ok: false, data: createDB.msg }
      }
    } catch (e: any) {
      this.mDB = null
      return { ok: false, data: [], msg: e.message }
    }
  }

  async createTable(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      const bindDB = () => {
        this.mDB = new sqlite3.Database(filePath, (e) => {
          console.log('DB ERROR', e)
        })
        this.mDB.run(createTableSQL, () => {
          resolve({ ok: true, data: [], msg: 'DB 생성 완료' })
        })
      }

      try {
        if (!fs.existsSync('./db')) {
          fs.mkdirSync('./db')
        }
        fs.writeFileSync(filePath, '', { flag: 'wx' })

        bindDB()
      } catch (e) {
        const error = e as any

        switch (error.code) {
          case 'EEXIST':
            bindDB()
            break
          default:
            this.mDB = null
            resolve({ ok: false, msg: error.message })
            break
        }
      }
    })
  }

  async dropTable(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      try {
        const sql = 'DROP TABLE socketData'
        this.mDB.run(sql)
        resolve({ ok: true, msg: '테이블 삭제 성공' })
      } catch (e: any) {
        resolve({ ok: false, msg: e.message })
      }
    })
  }

  async read(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      const sql = 'SELECT * FROM socketData'
      const data = []
      try {
        this.mDB.all(sql, [], (err: any, rows: []) => {
          if (err) {
            return resolve({ ok: false, data, msg: err })
          }

          rows.forEach((row) => data.push(row))
          resolve({ ok: true, data, msg: 'DB조회 성공' })
        })
      } catch (e: any) {
        const msg = this.mDB ? e.message : 'DB연결이 안되어 있습니다.'
        resolve({ ok: false, msg, data: [] })
      }
    })
  }

  async update(data: { [key: string]: string | number }): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      const key = Object.keys(data)
      let query = ''
      for (let i = 0; i < key.length; i++) {
        query += `${key[i]} = '${data[key[i]]}' ${key.length - 1 === i ? '' : ','}`
      }
      try {
        const insertSQL = `
          UPDATE 
          socketData
          SET
          ${query}
          WHERE
          idx = 1
        `
        this.mDB.run(insertSQL, (err) => {
          if (err) {
            return resolve({ ok: false, msg: err.message })
          } else {
            resolve({ ok: true, msg: `${key.join(' ')} 저장 성공` })
          }
        })
      } catch (e: any) {
        resolve({ ok: false, msg: e.message })
      }
    })
    // resolve({ ok: false, msg: '구현 중' })
    // })
  }

  async insert(data: { [key: string]: string | number }): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      const key = Object.keys(data)
      const value = Object.values(data)
      try {
        const insertSQL = `
          INSERT INTO socketData
          ( ${key.join(' , ')} )
          VALUES
          ( "${value.join('" , "')}" )
        `
        this.mDB.run(insertSQL, (err) => {
          if (err) {
            return resolve({ ok: false, msg: err.message })
          } else {
            resolve({ ok: true, msg: `${key.join(' ')} 저장 성공` })
          }
        })
      } catch (e: any) {
        resolve({ ok: false, msg: e.message })
      }
    })
  }

  async deleteAll() {
    try {
      const sql = 'DELETE FROM socketData'
      this.mDB.run(sql)

      return { ok: true, msg: '데이터 삭제 성공' }
    } catch (e: any) {
      return { ok: false, msg: e.message }
    }
  }
}

export default new DBbase()
