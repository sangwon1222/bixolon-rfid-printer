<script setup lang="ts" scoped>
import { TypeLogBoxProps } from '@renderer/index'
import { ascii_to_hex, hex2a } from '@renderer/util/common'

const props = withDefaults(defineProps<TypeLogBoxProps>(), {
  label: '',
  data: [],
  logLabel: ''
})

defineEmits(['reset-log'])
</script>

<template>
  <div class="w-full h-200 overflow-y-auto bg-white select-text">
    <div class="w-full text-white bg-slate-500 mb-10 flex justify-between">
      <p>{{ props.label }}</p>
      <button class="bg-btn px-10 rounded" @click="$emit('reset-log')">로그 지우기</button>
    </div>

    <ul class="flex flex-col gap-2 px-10">
      <li v-for="(v, i) in props.data" :key="i" class="flex gap-10 border-2 w-fit border-gray-600">
        <p class="bg-white text-black">{{ props.logLabel }} :</p>
        <p class="px-20 text-black">DATA :[ {{ v }} ]</p>
        <p class="px-20 text-black">ASCII :[ {{ JSON.parse(v) }} ]</p>
        <p class="px-20 text-black">HEX :[ {{ ascii_to_hex(JSON.parse(v)) }} ]</p>
      </li>
    </ul>
  </div>
</template>
