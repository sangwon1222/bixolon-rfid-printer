<script setup lang="ts" scoped>
import { useStore } from '@renderer/store'
</script>

<template>
  <div class="fixed t-0 l-0 z-100 w-screen h-screen">
    <div class="w-full h-full bg-black opacity-50">
      <div class="circle" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.circle {
  @apply fixed left-1/2 w-200 h-200 border-20 border-transparent border-t-white rounded-full;
  top: calc(50% - 100px);
  animation: rotate infinite 2s linear;
}
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
