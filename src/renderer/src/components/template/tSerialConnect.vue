<script setup lang="ts" scoped>
import serialManager from '@renderer/util/serialManager'
import { useStore } from '@renderer/store'
import { toast } from 'vue3-toastify'
import { isNaN } from 'lodash-es'
import { ref } from 'vue'

const refPathInput = ref(null)
const refBaudRateInput = ref(null)

const connect = async () => {
  useStore.isLoading = true
  await serialManager.connectSerialPort()
  useStore.isLoading = false
}

const enterPath = () => (refBaudRateInput.value ? connect() : refBaudRateInput.value.focus())

const enterBaudRate = () => (refPathInput.value ? connect() : refPathInput.value.focus())

const inputPath = (e) => (useStore.serial.default.path = e.target.value)

const inputBaudRate = (e) => {
  if (isNaN(+e.target.value)) {
    e.target.blur()
    toast.error('숫자만 입력해주세요.')
    e.target.select()
    return
  }
  useStore.serial.default.baudRate = +e.target.value
}
</script>

<template>
  <div class="relative flex flex-col gap-10 border-2 bg-white">
    <div>SERIAL PORT</div>
    <ul>
      <li>
        <p>PATH:</p>
        <input
          ref="refHostInput"
          type="text"
          class="border-2 border-black"
          :value="useStore.serial.default.path"
          @input="inputPath"
          @keydown.enter="enterPath"
        />
      </li>
      <li>
        <p>BAUDRATE:</p>
        <input
          ref="refBaudRateInput"
          type="text"
          class="border-2 border-black"
          :value="useStore.serial.default.baudRate"
          @input="inputBaudRate"
          @keydown.enter="enterBaudRate"
        />
      </li>
    </ul>

    <p class="block w-full text-red-600">
      {{ useStore.serial.status }}
    </p>
    <button class="w-full p-10 rounded bg-btn" @click="connect">connect</button>
  </div>
</template>
