<template>
  <nav class="navbar bg-base-100 border-b border-white p-2 fixed z-50 w-full">
    <div class="container mx-auto flex justify-between items-center">
      <button
        class="flex items-center gap-2 btn btn-ghost hover:scale-105 transition-transform"
        @click="routeAll"
        aria-label="Go to all links"
      >
        <img src="../../public/favicon.ico" class="w-8 h-8" alt="MeowLinks logo" />
        <span class="text-2xl font-bold">MeowLinks</span>
      </button>

      <div class="flex space-x-2">
        <button
          class="btn btn-ghost hover:scale-105 transition-transform"
          @click="routeToHome"
          aria-label="Go to link shortener"
        >
          <span class="hidden sm:inline">Shorten</span>
          <LinkIcon class="h-5 w-5 sm:hidden" aria-hidden="true" />
        </button>
        <button
          class="btn btn-ghost hover:scale-105 transition-transform"
          @click="routeToQrCodes"
          aria-label="Go to QR codes"
        >
          <span class="hidden sm:inline">QR Codes</span>
          <QrCodeIcon class="h-5 w-5 sm:hidden" aria-hidden="true" />
        </button>
        <button
          class="btn btn-ghost hover:scale-105 transition-transform"
          @click="routeToStats"
          aria-label="Go to QR codes"
        >
          <span class="hidden sm:inline">Url Stats</span>
          <ChartBarDecreasingIcon class="h-5 w-5 sm:hidden" aria-hidden="true" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { LinkIcon, QrCodeIcon, ChartBarDecreasingIcon } from 'lucide-vue-next'

const router = useRouter()

function routeAll() {
  router.push('/all')
}

function routeToHome() {
  router.push('/')
}

function routeToQrCodes() {
  router.push('/qrcode')
}

function routeToStats() {
  router.push('/stats')
}
</script>

<style scoped>
@media (max-width: 640px) {
  .navbar {
    padding: 0.5rem 1rem;
  }

  .btn {
    padding: 0.5rem;
  }

  .text-2xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}
</style>
