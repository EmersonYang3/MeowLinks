<template>
  <div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface state {
  urlToCode: boolean
  url: string
  qrCode: string
}

const state: state = reactive({
  urlToCode: true,
  url: '',
  qrCode: '',
})
</script>
