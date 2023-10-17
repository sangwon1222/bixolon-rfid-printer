<script setup lang="ts" scoped>
import { useStore } from '@renderer/store'

const selectCode = (e) => {
  const target = e.currentTarget as HTMLParagraphElement
  const range = document.createRange()

  window.getSelection().removeAllRanges()
  range.selectNodeContents(target)
  window.getSelection().addRange(range)
}
</script>

<template>
  <div class="w-full h-200 overflow-y-auto bg-white text-black select-text">
    <ul class="flex flex-col gap-2">
      <li
        v-for="(v, i) in useStore.bixolon.info"
        :key="i"
        class="flex gap-10 border-2 w-fit border-gray-600"
      >
        <p class="bg-white w-40 border-r-2" @click="selectCode">{{ v.code }}</p>
        <p class="px-20">{{ v.description }}</p>
      </li>
    </ul>
  </div>
</template>
