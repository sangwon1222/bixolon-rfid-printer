/* eslint-disable no-case-declarations */
import { ipcMain } from 'electron'

export interface TypeResponse {
  ok: boolean
  msg: string
  result?: any
}

export interface TypeMiddleware {
  _check(): boolean
  _reConnect(): any
}

export class Common {
  async registMiddleware(obj: TypeMiddleware, name: string) {
    const properties = Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
    const exclude = ['constructor', '_reConnect', '_check', '_close']

    for (const property of properties) {
      if (exclude.includes(property)) continue

      ipcMain.handle(property, async (_event, res) => {
        const isConnected = property.substring(0, 1) === '_' ? true : obj._check()
        if (!isConnected) return { ok: false, msg: `${name} 연결이 되어 있지 않습니다.` }

        switch (typeof res) {
          case 'object':
            return res?.length > 0 ? await obj[property](...res) : await obj[property](res)
          default:
            return await obj[property]()
        }
      })
    }
  }

  ascii_to_hex(str: string) {
    const arr1 = [] as any
    for (let n = 0, l = str.length; n < l; n++) {
      const hex = Number(str.charCodeAt(n)).toString(16)
      arr1.push(hex)
    }
    return arr1.join('')
  }

  hex_to_ascii(str: string) {
    const output = Buffer.from(str, 'hex')
    return output.toString()
  }

  buffer_to_hex(bf: Buffer) {
    const hex = [] as Array<string>
    for (const b of bf) {
      const h = Buffer.from([b]).toString('hex')
      hex.push(h)
    }
    return hex.join('')
  }
}

export default new Common()
