<template>
  <div class="container mx-auto px-4 pt-16 pb-8">
    <h1 class="text-3xl font-bold text-white mb-6 text-center mt-2">MeowLinks Utilities</h1>
    <div class="flex flex-wrap justify-center gap-6">
      <div
        v-for="utility in utilities"
        :key="utility.name"
        class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] max-w-sm border border-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
      >
        <img :src="utility.thumbnail" :alt="utility.name" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h2 class="text-xl font-semibold text-white mb-2">{{ utility.name }}</h2>
          <p class="text-white text-sm mb-4">{{ utility.description }}</p>
          <button
            @click="routeUtility(utility.name)"
            class="btn btn-outline btn-sm btn-white w-full hover:scale-105"
          >
            Use {{ utility.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const utilities = [
  {
    name: 'Url Shortener',
    thumbnail: '../../public/UrlShortenerThumbnail.png',
    description: 'Shorten your long URLs!',
  },
  {
    name: 'Url To QR Code',
    thumbnail: '../../public/QRCodeGeneratorThumbnail.png',
    description: 'Convert your URLs to QR codes for easy sharing!',
  },
  {
    name: 'Url Stats',
    thumbnail: '../../public/UrlInvestigator.png',
    description: 'Investigate the stats of your shortened URLs!',
  },
]

function routeUtility(utilityName: string) {
  switch (utilityName) {
    case 'Url Shortener':
      router.push('/')
      break
    case 'Url To QR Code':
      router.push('/qrcode')
      break
    case 'Url Stats':
      router.push('/stats')
      break
    default:
      console.error('Unknown utility:', utilityName)
  }
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
