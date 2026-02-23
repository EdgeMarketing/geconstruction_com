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

const findByStem = (stem) => {
  const s = String(stem).toLowerCase()
  // Works for:
  // excavation.jpg
  // excavation.abc123.jpg
  // /_nuxt/.../excavation.abc123.webp (if you ever swap)
  return allImages.find(src =>
    src.toLowerCase().includes(`/${s}.`)
    || src.toLowerCase().includes(`/${s}-`)
    || src.toLowerCase().includes(`/${s}_`),
  ) || ''
}

const drywallImage = findByStem('drywall')
const excavationImage = findByStem('excavation')
const multiFamilyImage = findByStem('multi-family')

// Exclude fixed/override images from random pool
const randomPool = allImages.filter(src =>
  src !== drywallImage && src !== excavationImage && src !== multiFamilyImage,
)

// Normalize route path (handles trailing slashes in production)
const cleanPath = computed(() => {
  const p = String(route.path || '')
  return p.length > 1 ? p.replace(/\/+$/, '') : p
})

const isDrywallPage = computed(() =>
  props.page === 'drywall' || cleanPath.value === '/drywall',
)

const isExcavationPage = computed(() =>
  props.page === 'excavation' || cleanPath.value === '/excavation',
)

const isMultiFamilyPage = computed(() =>
  props.page === 'multi-family'
  || route.path === '/portfolio/multi-family'
  || route.path === '/multi-family',
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
console.log('route.path', route.path, 'cleanPath', cleanPath.value)
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