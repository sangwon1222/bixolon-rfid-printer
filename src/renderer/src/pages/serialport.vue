<script setup lang="ts" scoped>
import tSerialConnect from '@renderer/components/template/tSerialConnect.vue'
import tBixolonInfo from '@renderer/components/template/tBixolonInfo.vue'
import aCodeInput from '@renderer/components/atoms/aCodeInput.vue'
import tLogBox from '@renderer/components/template/tLogBox.vue'
import serialManager from '@renderer/util/serialManager'
import dbManager from '@renderer/util/dbManager'
import { useStore } from '@store/index'
import { toast } from 'vue3-toastify'
import { onMounted } from 'vue'

const serialLog = (e) => {
  if (!e) return
  console.error(e)
  useStore.serial.logs.unshift(JSON.stringify(e))
  dbManager.update({ serialLogs: JSON.stringify(useStore.serial.logs) })
}

const resetLog = () => {
  useStore.serial.logs = []
  dbManager.update({ serialLogs: JSON.stringify([]) })
}

onMounted(() => window.Serialapi.bindUpdateLogFromVue(serialLog))

const send = async (inputValue: string) => {
  useStore.isLoading = true
  const { ok, msg } = await serialManager.write(inputValue)
  if (!ok) toast.error(msg, { autoClose: 1000 })
  useStore.isLoading = false
}
</script>

<template>
  <div class="relative flex flex-col gap-10 w-full h-[calc(100vh-100px)] p-20">
    <div class="flex flex-col gap-10">
      <t-serial-connect />
      <a-code-input @send="send" />

      <t-log-box
        label="SERIAL_PORT"
        :data="useStore.serial.logs"
        log-label="SERIAL_PORT_RECEIVE_DATA"
        @reset-log="resetLog"
      />

      <t-bixolon-info />
    </div>
  </div>
</template>
