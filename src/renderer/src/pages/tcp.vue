<script setup lang="ts" scoped>
import tTcpConnect from '@renderer/components/template/tTcpConnect.vue'
import tBixolonInfo from '@renderer/components/template/tBixolonInfo.vue'
import aCodeInput from '@renderer/components/atoms/aCodeInput.vue'
import tLogBox from '@renderer/components/template/tLogBox.vue'
import tcpManager from '@renderer/util/tcpManager'
import dbManager from '@renderer/util/dbManager'
import { useStore } from '@store/index'
import { toast } from 'vue3-toastify'
import { onMounted } from 'vue'

const tcpLog = (e) => {
  if (!e) return
  useStore.tcp.logs.unshift(JSON.stringify(e))
  dbManager.update({ tcpLogs: JSON.stringify(useStore.tcp.logs) })
}

const resetLog = () => {
  useStore.tcp.logs = []
  dbManager.update({ tcpLogs: JSON.stringify([]) })
}

onMounted(async () => window.TCPapi.bindUpdateLogFromVue(tcpLog))

const send = async (inputValue: string) => {
  useStore.isLoading = true
  const { ok, msg } = await tcpManager.write(inputValue + '\r\n')
  if (!ok) toast.error(msg, { autoClose: 1000 })
  useStore.isLoading = false
}
</script>

<template>
  <div class="relative flex flex-col gap-10 w-full h-[calc(100vh-100px)] p-20">
    <div class="flex flex-col gap-10">
      <t-tcp-connect />
      <a-code-input unit="\r\n" @send="send" />

      <t-log-box
        label="TCP"
        :data="useStore.tcp.logs"
        log-label="TCP_RECEIVE_DATA"
        @reset-log="resetLog"
      />

      <t-bixolon-info />
    </div>
  </div>
</template>
