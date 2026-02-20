<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  page: { type: String, default: '' },
  headline: { type: String, default: '' },
})

const route = useRoute()
const isVisible = ref(false)
const bgImage = ref('')

const modules = import.meta.glob('~/assets/heads/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const allImages = Object.values(modules)

const findByName = (name) => {
  const needle = `/${name.toLowerCase()}`
  return allImages.find(src => src.toLowerCase().includes(needle)) || ''
}

const drywallImage = findByName('drywall.jpg')
const excavationImage = findByName('excavation.jpg')
const multiFamilyImage = findByName('multi-family.jpg')

// Exclude fixed/override images from random pool
const randomPool = allImages.filter(src =>
  src !== drywallImage && src !== excavationImage && src !== multiFamilyImage,
)

const isDrywallPage = computed(() =>
  props.page === 'drywall' || route.path === '/drywall',
)

const isExcavationPage = computed(() =>
  props.page === 'excavation' || route.path === '/excavation',
)

const isMultiFamilyPage = computed(() =>
  props.page === 'multi-family' || route.path === '/portfolio/multi-family',
)

// Set deterministic background for special pages during SSR + client
if (isDrywallPage.value && drywallImage)
  bgImage.value = drywallImage
else if (isExcavationPage.value && excavationImage)
  bgImage.value = excavationImage
else if (isMultiFamilyPage.value && multiFamilyImage)
  bgImage.value = multiFamilyImage

onMounted(() => {
  // Random ONLY for pages that are not fixed overrides
  if (!isDrywallPage.value && !isExcavationPage.value && !isMultiFamilyPage.value && randomPool.length) {
    const randomIndex = Math.floor(Math.random() * randomPool.length)
    bgImage.value = randomPool[randomIndex]
  }

  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section
    class="transition-opacity duration-700 bg-fixed bg-cover page-hero"
    :class="{ 'opacity-0': !isVisible, 'opacity-100': isVisible }"
    :style="bgImage ? { backgroundImage: `url(${bgImage})` } : undefined"
  >
    <div class="container relative z-50 px-6 mx-auto">
      <div class="py-32 text-center">
        <h1 class="text-4xl font-bold leading-10 lg:text-7xl text-brandBlue1 font-sansAccent2">
          {{ headline }}
        </h1>
      </div>
    </div>
  </section>
</template>