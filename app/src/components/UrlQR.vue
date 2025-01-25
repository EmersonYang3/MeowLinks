<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen pb-8 px-4"
    :class="{ 'pt-24': state.qrCode }"
  >
    <form
      @submit.prevent="generateQRCode($event)"
      class="w-full max-w-md p-6 border border-white rounded-lg shadow-xl flex flex-col gap-10"
    >
      <div class="flex flex-col gap-2">
        <div class="space-y-4">
          <input
            v-model="options.url"
            type="url"
            placeholder="Input URL..."
            class="input input-bordered w-full bg-black text-white border-white focus:border-gray-400"
            @input="validateUrl"
            required
          />
        </div>

        <div>
          <label class="label justify-start space-x-3">
            <span class="label-text text-white">Size: {{ options.size }}px</span>
          </label>
          <input type="range" min="100" max="300" v-model="options.size" class="range" step="10" />
          <div class="flex w-full justify-between px-2 text-xs mt-2 text-white">
            <span>|</span> <span>|</span> <span>|</span> <span>|</span> <span>|</span>
            <span>|</span> <span>|</span> <span>|</span> <span>|</span> <span>|</span>
            <span>|</span> <span>|</span> <span>|</span> <span>|</span> <span>|</span>
            <span>|</span> <span>|</span> <span>|</span> <span>|</span> <span>|</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="btn btn-outline btn-white w-full hover:scale-105 text-lg transition-transform duration-300"
        :disabled="!state.validUrl"
      >
        Generate QR Code
      </button>
    </form>

    <div
      v-if="state.qrCode"
      class="w-full max-w-md mt-8 p-6 border border-white rounded-lg shadow-xl"
    >
      <div class="flex justify-center mb-6">
        <img :src="state.qrCode" alt="QR Code" class="rounded-lg shadow-lg" />
      </div>
      <button
        @click="copyImageToClipboard"
        class="btn btn-outline btn-white w-full hover:scale-105 text-lg transition-transform duration-300"
      >
        Copy QR Code to Clipboard
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const options = ref({
  url: '',
  size: 150,
})

const state = ref({
  validUrl: false,
  qrCode: '',
  generatedUrl: '',
})

const $toast = useToast()

function validateUrl() {
  state.value.validUrl =
    options.value.url.length > 0 && options.value.url.match(/(http|https):\/\/[^ "]+$/) !== null
}

function generateQRCode(event: Event) {
  event.preventDefault()
  $toast.success('Generating QR Code...')
  const urlToQrCodeAPI = `https://api.qrserver.com/v1/create-qr-code/?size=${options.value.size}x${options.value.size}&data=${options.value.url}&color=FFFFFF&bgcolor=000000`
  state.value.qrCode = urlToQrCodeAPI
}

async function copyImageToClipboard() {
  try {
    const response = await fetch(state.value.qrCode)
    const blob = await response.blob()
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ])
    $toast.success('QR Code copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy image: ', err)
    $toast.error('Failed to copy QR Code. Please try again.')
  }
}
</script>
