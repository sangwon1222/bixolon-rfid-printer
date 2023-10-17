<script setup lang="ts" scoped>
import { useRouter } from 'vue-router'
import { useStore } from '@store/index'

const router = useRouter()
</script>

<template>
  <div
    class="relative flex gap-10 w-full h-60 bg-white shadow-gray-600 shadow-2xl items-center px-20"
  >
    <button
      class="p-10 rounded border-2"
      :class="useStore.currentRoute === '/' ? 'bg-btn' : 'bg-sky-900'"
      @click="router.push('/')"
    >
      TCP
    </button>
    <button
      class="p-10 rounded border-2"
      :class="useStore.currentRoute === '/serialport' ? 'bg-btn' : 'bg-sky-900'"
      @click="router.push('/serialport')"
    >
      SERIAL_PORT
    </button>
  </div>
</template>
