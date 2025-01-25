<template>
  <div class="container mx-auto px-4 pt-16 pb-8 bg-black text-white">
    <h1 class="text-3xl font-bold mb-6 text-center mt-2">MeowLinks Utilities</h1>

    <div class="mb-6 max-w-md mx-auto flex justify-center">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search utilities..."
        class="input input-bordered input-primary w-full max-w-xs"
      />
    </div>

    <div class="flex flex-wrap justify-center gap-6">
      <div
        v-for="utility in filteredUtilities"
        :key="utility.name"
        class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] max-w-sm border border-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
      >
        <img :src="utility.thumbnail" :alt="utility.name" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ utility.name }}</h2>
          <p class="text-sm mb-4">{{ utility.description }}</p>
          <button
            @click="routeUtility(utility.name)"
            class="btn btn-outline btn-sm btn-white w-full hover:scale-105"
          >
            Use {{ utility.name }}
          </button>
        </div>
      </div>
      <div
        v-if="filteredUtilities.length > 0"
        class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] max-w-sm border border-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
      >
        <img class="w-full h-48 object-cover" src="/WorkInProgress.png" alt="Work In Progress" />
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">More Utilities In The Works</h2>
          <p class="text-sm mb-4">Have a suggestion? DM me!</p>
          <a
            class="btn btn-outline btn-sm btn-white w-full hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/EmersonYang3/MeowLinks"
          >
            See ReadMe
          </a>
        </div>
      </div>
    </div>

    <div v-if="filteredUtilities.length === 0" class="text-center mt-8">
      <p class="text-xl">No utilities found matching your search.</p>
      <p class="mt-2">Try adjusting your search terms or browse all available utilities.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'

const router = useRouter()
const searchQuery = ref('')

const utilities = [
  {
    name: 'Url Shortener',
    thumbnail: '/UrlShortenerThumbnail.png',
    description: 'Shorten your long URLs!',
  },
  {
    name: 'Url To QR Code',
    thumbnail: '/QRCodeGeneratorThumbnail.png',
    description: 'Convert your URLs to QR codes for easy sharing!',
  },
  {
    name: 'Url Stats',
    thumbnail: '/UrlInvestigator.png',
    description: 'Investigate the stats of your shortened URLs!',
  },
]

const fuse = new Fuse(utilities, {
  keys: ['name', 'description'],
  threshold: 0.4,
})

const filteredUtilities = computed(() => {
  if (!searchQuery.value) return utilities
  return fuse.search(searchQuery.value).map((result) => result.item)
})

function routeUtility(utilityName: string) {
  switch (utilityName) {
    case 'Url Shortener':
      router.push('/shortener')
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
