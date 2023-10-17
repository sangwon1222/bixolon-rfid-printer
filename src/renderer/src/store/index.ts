import { reactive } from 'vue'

export const useStore = reactive({
  currentRoute: '',
  isLoading: false,
  tcp: {
    default: { host: '192.168.0.5', port: 9100 },
    status: '',
    connect: false,
    logs: []
  },
  serial: {
    default: { path: 'com1', baudRate: 9600 },
    status: '연결',
    connect: false,
    logs: []
  },
  bixolon: {
    info: [
      { code: 'CB', description: '이미지 버퍼의 내용을 깨끗이 지움' },
      { code: 'SD', description: '인쇄 농도 설정 0~20' },
      {
        code: 'SO',
        description: 'SOT: 이미지 TOP => BOTTOM 으로 인쇄 / SOB: 이미지를 BOTTOM에서 TOP으로 인쇄'
      },
      {
        code: 'SM',
        description:
          '이미지 버퍼 여백 설정 이 명령어는 이미지 버퍼상의 원점을 (p1,p2)로 이동시켜 새로운 원점을 만든다.'
      },
      { code: 'SW', description: '라벨 폭 설정 / 라벨사이즈에 맞게 이미지 버퍼 사이즈 재조정.' },
      {
        code: 'SB',
        description:
          '마진 세팅, 이미지 버퍼 여백 설정 / 이 명령어는 이미지 버퍼상의 원점(0,0)을 (p1,p2)로 이동 시켜 새로운 원점으로 만든다.'
      },
      { code: 'B1', description: '이미지 버퍼에 1차원 바코드 입력' },
      { code: 'BD', description: '이미지 버퍼에 라인 블록 박스 및 사선 그리기' },
      { code: 'P1', description: '출력 실행' },
      { code: '^cp', description: '출력 상태값 반환 \n ' }
    ]
  }
})
