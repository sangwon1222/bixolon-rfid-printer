<script setup lang="ts" scoped>
import tLoading from '@template/tLoading.vue'
import dbManager from '@util/dbManager'
import { useStore } from '@store/index'
import { onMounted, computed } from 'vue'
import TGnb from './components/template/tGnb.vue'
const isLoading = computed(() => useStore.isLoading)

onMounted(async () => {
  useStore.isLoading = true
  // DB 엑셀 연결, 유저 설정(.txt) 불러오기
  const { ok, data, msg } = await dbManager.connectDB()
  if (ok) {
    useStore.serial.default.path = data[0].path
    useStore.serial.default.baudRate = data[0].baudRate
    useStore.serial.logs = JSON.parse(data[0].serialLogs)

    useStore.tcp.default.host = data[0].host
    useStore.tcp.default.port = data[0].port
    useStore.tcp.logs = JSON.parse(data[0].tcpLogs)
  }

  useStore.isLoading = false
})
</script>

<template>
  <t-loading v-if="isLoading" />
  <div class="overflow-hidden flex flex-col w-full h-screen">
    <t-gnb />
    <div class="w-full h-full">
      <router-view />
    </div>
  </div>
</template>
