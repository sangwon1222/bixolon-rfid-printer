<script setup lang="ts" scoped>
import { ref } from 'vue'

const refCodeInput = ref(null)
const emit = defineEmits(['send'])

const props = withDefaults(defineProps<{ unit?: string }>(), {
  unit: ''
})

const send = () => {
  emit('send', refCodeInput.value.value)
  refCodeInput.value.select()
}
</script>

<template>
  <div class="flex gap-10 items-center my-20">
    <p>명령어:</p>
    <div class="relative border-2">
      <input ref="refCodeInput" class="p-10" type="text" @keydown.enter.self="send" />
      <p v-if="props.unit" class="absolute top-1/2 right-0 -translate-y-1/2">
        {{ props.unit }}
      </p>
    </div>
    <button class="bg-btn p-10 rounded" @click="send">전송</button>
  </div>
</template>
