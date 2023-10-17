export default {
  startReadRFID: '>x c 0 \r\n',
  autoStartReadRFID: '>f \r\n',

  // 실행중인 커맨드 정지
  allStop: '>3 \r\n',

  /**
   * memory read
   */
  // memoryRead: '>r 1 2 8\r\n', // 판교용
  memoryRead: '>r 1 2 ??\r\n',

  //  >1T7465737407
  //  >1T746500

  /**
   * memory write
   */
  // Reader password ‘0’
  // >x w 0
  setNotPassWrite: '>x w 0 \r\n',
  // EPC Bank 1word “1234” write
  // >w 1 2 1234
  notPassWriteTag: '>w 1 2 ??\r\n',
  // setPwWriteTag: '>w 1 2 1234  \r\n', // 1234=> 비밀번호 자리
  blockWriteTag: '>B 1 2 ??\r\n',

  writeTag: '>w 1 1 ??\r\n',

  reset: '>E 1 2 6\r\n',
  start: '>start\r\n',

  //리더가 현재 실행중인 명령어를 확인한다
  /** reply
   * 첫 번째 자리: > Hader
   * 두 번째 자리:  1 Antenna Number
   * 세 번째 자리: S Reply Code
   * 네 번째 자리:
   * 3 = stop
   * f = inventory
   * d = Filtering Inventory
   * r = Memory Read
   * i = Inventory&Memory Read
   * w = Memory Write
   * l = Memory Lock
   * k = Tag Kill
   * B = Memory Block Write
   * E = Memory Block Erase
   */
  getReaderState: '>7\r\n',

  readerReboot: '>S\r\n',
  readerQuickReset: '>E 1 2 6 \r\n',
  // tag
  setTagPassword: '>w 0 2 12345678 \r\n', //12345678 => 비밀번호 자리
  readTagPassword: '>r 0 2 2 \r\n',
  setLockTagPassword: '>l 0030 0020 \r\n', //12345678 => 비밀번호 자리

  // set Buzzer volumn
  onBuzzer: '>x b 1\r\n',
  offBuzzer: '>x b 0\r\n',
  getBuzzer: '>y b\r\n',

  // set Atnenna port
  setAtnennaport: '>x e ??\r\n',
  onAtn1: '>x e 1\r\n',
  onAtn2: '>x e 2\r\n',
  onAtn1Atn2: '>x e 3\r\n',
  onAtn3: '>x e 4\r\n',
  onAtn1Atn3: '>x e 5\r\n',
  onAtn2Atn3: '>x e 6\r\n',
  onAtn1Atn2Atn3: '>x e 7\r\n',
  onAtn4: '>x e 8\r\n',
  onAtn1Atn4: '>x e 9\r\n',
  onAtn2Atn4: '>x e 10\r\n',
  onAtn1Atn2Atn4: '>x e 11\r\n',
  onAtn3Atn4: '>x e 12\r\n',
  onAtn1Atn3Atn4: '>x e 13\r\n',
  onAtn2Atn3Atn4: '>x e 14\r\n',
  onAtn1Atn2Atn3Atn4: '>x e 15\r\n',

  getAtn: '>y e\r\n',

  //set Atnenna Switch time
  setAtnSecond1: '>x j 1000\r\n',
  setAtnSecond2: '>x j 2000\r\n',
  setAtnSecond3: '>x j 3000\r\n',
  setAtnSecondMax: '>x j 10000\r\n',

  // power gain
  powerGain: '>x ?? ?? \r\n', // 50 ~ 310
  getPowerGainP1: '>y p1\r\n', // 50 ~ 310
  getPowerGainP2: '>y p2\r\n', // 50 ~ 310
  getPowerGainP3: '>y p3\r\n', // 50 ~ 310
  getPowerGainP4: '>y p4\r\n' // 50 ~ 310
  // powerGainWeek: '>x p 50\r\n', // 50 ~ 310
  // powerGainAtn1Week: '>x p1 100\r\n'
}
