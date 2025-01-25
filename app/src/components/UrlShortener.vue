<template>
  <div class="flex justify-center items-center min-h-screen flex-col gap-4">
    <form
      @submit.prevent="ShortenURL(Options.url)"
      class="w-full max-w-md p-8 border border-white rounded-lg shadow-xl"
    >
      <div class="space-y-4">
        <input
          v-model="Options.url"
          type="url"
          placeholder="Input URL..."
          class="input input-bordered w-full bg-black text-white border-white focus:border-gray-400"
          required
          @input="checkValidInputs"
        />
        <input
          v-model="Options.alias"
          type="text"
          placeholder="Alias (optional)"
          class="input input-bordered w-full bg-black text-white border-white focus:border-gray-400"
        />
        <input
          v-model="Options.password"
          type="password"
          placeholder="Password (optional)"
          class="input input-bordered w-full bg-black text-white border-white focus:border-gray-400"
          @input="checkValidInputs"
        />
        <input
          v-model="Options.maxClicks"
          type="number"
          placeholder="Max Clicks (optional)"
          class="input input-bordered w-full bg-black text-white border-white focus:border-gray-400"
          @input="checkValidInputs"
        />
        <div class="form-control">
          <label class="label cursor-pointer justify-start space-x-3">
            <input v-model="Options.blockBots" type="checkbox" class="toggle toggle-white" />
            <span class="label-text">Block Bots</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        class="btn btn-outline w-full hover:scale-105 text-lg mt-6 transition-transform duration-300"
        :disabled="!state.ValidUrl || !state.ValidPassword || !state.ValidMaxClicks"
      >
        Shorten!
      </button>
    </form>
    <div
      v-if="state.ShortenedUrl"
      class="w-full max-w-md p-4 border border-white rounded-lg shadow-xl flex items-center justify-between"
    >
      <div class="border rounded p-3 flex-grow mr-2 overflow-x-auto whitespace-nowrap">
        {{ state.ShortenedUrl }}
      </div>

      <button
        @click="copyToClipboard"
        class="btn btn-outline rounded hover:scale-105 transition-transform duration-300"
        aria-label="Copy to clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const shortenApi = 'https://spoo.me/'

interface Options {
  url: string
  alias: string
  password: string
  maxClicks: any
  blockBots: boolean
}

const Options: Options = reactive({
  url: '',
  alias: '',
  password: '',
  maxClicks: null,
  blockBots: false,
})

const state = reactive({
  ValidUrl: false,
  ValidPassword: true,
  ValidMaxClicks: true,
  ShortenedUrl: '',
})

function ShortenURL(url: string) {
  const data = new URLSearchParams()
  data.append('url', url)

  if (Options.alias) {
    data.append('alias', Options.alias)
  }
  if (Options.password && state.ValidPassword) {
    data.append('password', Options.password)
  }
  if (Options.maxClicks && state.ValidMaxClicks) {
    data.append('max-clicks', Options.maxClicks.toString())
  }
  if (Options.blockBots) {
    data.append('block-bots', Options.blockBots.toString())
  }

  const $toast = useToast()
  $toast.success('Sending Request...')

  axios
    .post(shortenApi, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    })
    .then((response) => {
      state.ShortenedUrl = response.data.short_url
      const $toast = useToast()
      $toast.success('Success!')
    })
    .catch((error) => {
      if (error.response) {
        toastError(error.response.data)
      } else {
        console.error('Error:', error.message)
      }
    })
}

function toastError(error: Object) {
  const $toast = useToast()
  let instance = $toast.error(Object.values(error)[0])
}

function checkValidInputs() {
  // Url Check
  state.ValidUrl = Options.url.length > 0 && Options.url.match(/(http|https):\/\/[^ "]+$/) !== null

  // Password Check (optional tho)
  state.ValidPassword =
    Options.password.length === 0 ||
    (Options.password.length >= 8 &&
      Options.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@.])[A-Za-z\d@.]{8,}$/) !== null)

  // Max Clicks Check (optional tho, it can be a number or a empty string? MAKE UP YOUR MIND!!!!)
  state.ValidMaxClicks =
    Options.maxClicks === null || Options.maxClicks > 0 || Options.maxClicks === ''
}

function copyToClipboard() {
  navigator.clipboard
    .writeText(state.ShortenedUrl)
    .then(() => {
      const $toast = useToast()
      $toast.success('Copied to clipboard!')
    })
    .catch((err) => {
      const $toast = useToast()
      $toast.error('Failed to copy! Check Console!')
      console.error('Failed to copy: ', err)
    })
}
</script>

<style scoped>
.input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
