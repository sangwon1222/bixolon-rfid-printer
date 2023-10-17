export const groupLog = (ok: boolean, label: string, ary: string[]) => {
  const color = ok ? 'color:#64748b; background: #5eead4;' : 'color:#fff; background: #ef4444;'
  const subColor = ok ? 'color:#000000; background: #117a6a;' : 'color:#fff; background: #7b1616;'
  const style = 'padding: 4px; font-bold: bold;'

  console.groupCollapsed(`%c ${label}`, `${style} ${color}`)
  for (let i = 0; i < ary.length; i++) {
    console.log(`%c ${ary[i]}`, `${style}  ${subColor}`)
  }
  console.groupEnd()
}

export const hex2a = (hexx: string) => {
  let str = ''
  for (let i = 0; i < hexx.length; i += 2)
    str += String.fromCharCode(parseInt(hexx.substr(i, 2), 16))
  return str
}

export const ascii_to_hex = (str: string) => {
  const arr1 = [] as any
  for (let n = 0, l = str.length; n < l; n++) {
    const hex = Number(str.charCodeAt(n)).toString(16)
    arr1.push(hex)
  }
  return arr1.join(' ')
}
