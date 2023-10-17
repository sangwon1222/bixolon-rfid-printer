<script setup lang="ts" scoped>
import TCPmanager from '@renderer/util/tcpManager'
import { useStore } from '@renderer/store'
import { toast } from 'vue3-toastify'
import { isNaN } from 'lodash-es'
import { ref } from 'vue'

const refHostInput = ref(null)
const refPortInput = ref(null)

const connect = async () => {
  useStore.isLoading = true
  await TCPmanager.connectPrint()
  useStore.isLoading = false
}

const enterHost = () => (refPortInput.value ? connect() : refPortInput.value.focus())

const enterPort = () => (refHostInput.value ? connect() : refHostInput.value.focus())

const inputHost = (e) => (useStore.tcp.default.host = e.target.value)

const inputPort = (e) => {
  if (isNaN(+e.target.value)) {
    e.target.blur()
    toast.error('숫자만 입력해주세요.')
    e.target.select()
    return
  }
  useStore.tcp.default.port = e.target.value
}
</script>

<template>
  <div class="relative flex flex-col gap-10 w-full border-2">
    <div>TCP</div>
    <ul>
      <li>
        <p>HOST:</p>
        <input
          ref="refHostInput"
          type="text"
          class="border-2 border-black"
          :value="useStore.tcp.default.host"
          @input="inputHost"
          @keydown.enter="enterHost"
        />
      </li>
      <li>
        <p>PORT:</p>
        <input
          ref="refPortInput"
          type="text"
          class="border-2 border-black"
          :value="useStore.tcp.default.port"
          @input="inputPort"
          @keydown.enter="enterPort"
        />
      </li>
    </ul>

    <p class="block w-full text-red-600">
      {{ useStore.tcp.status }}
    </p>
    <button class="w-full p-10 rounded bg-btn" @click="connect">connect</button>
  </div>
</template>
