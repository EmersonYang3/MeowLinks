<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen pb-8 px-4 gap-4"
    :class="{ 'pt-24': state.data }"
  >
    <form
      class="w-full max-w-md p-8 border border-white rounded-lg shadow-xl"
      @submit.prevent="fetchStats"
    >
      <div class="space-y-4">
        <input
          type="url"
          v-model="options.url"
          placeholder="Input Shortened URL..."
          class="input input-bordered w-full bg-black text-white border-white focus:border-gray-400"
          @input="checkValidUrl"
          required
        />
        <input
          type="text"
          v-model="options.password"
          placeholder="Input Password if you have set one..."
          class="input input-bordered w-full bg-black text-white border-white focus:border-gray-400"
        />
      </div>

      <button
        type="submit"
        class="btn btn-outline w-full hover:scale-105 text-lg mt-6 transition-transform duration-300"
        :disabled="!state.validUrl"
      >
        Get Stats!
      </button>
    </form>
    <div
      v-if="state.data"
      class="w-full max-w-md border border-white rounded-lg shadow-xl relative"
    >
      <div class="absolute top-2 right-2">
        <button
          @click="copyToClipboard"
          class="btn btn-outline btn-xs hover:scale-105"
          title="Copy to clipboard"
        >
          <ClipboardIcon class="w-4 h-4 mr-1" />
          Copy
        </button>
      </div>
      <pre class="p-4 pt-10 overflow-x-auto whitespace-pre-wrap break-words text-sm">{{
        prettyPrintedData
      }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { ClipboardIcon } from 'lucide-vue-next'

interface Options {
  url: string
  password: string | null
}

const options: Options = reactive({
  url: '',
  password: null,
})

const state = reactive({
  validUrl: false,
  data: null as any,
})

const prettyPrintedData = computed(() => {
  return JSON.stringify(state.data, null, 2)
})

function checkValidUrl() {
  state.validUrl = options.url.startsWith('https://spoo.me/')
}

function fetchStats() {
  const alias = options.url.split('https://spoo.me/')[1]
  const data = { password: options.password }

  const $toast = useToast()
  $toast.success('Fetching stats...')

  axios
    .post(`https://spoo.me/stats/${alias}`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      $toast.success('Stats fetched!')
      state.data = response.data
    })
    .catch((error) => {
      $toast.error(Object.values(error.response.data).join(', '))
    })
}

function copyToClipboard() {
  const $toast = useToast()
  navigator.clipboard
    .writeText(prettyPrintedData.value)
    .then(() => {
      $toast.success('Stats copied to clipboard!')
    })
    .catch((error) => {
      $toast.error('Failed to copy stats. Please try again.')
    })
}
</script>

<style scoped>
.btn-white {
  @apply border-white text-white;
}
.btn-white:hover {
  @apply bg-white text-black;
}
</style>
