<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Top-level categories
const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'multi-family', label: 'Multi-Family' },
]

// Room types for residential "by room" view
const ROOM_TYPES = [
  { key: 'all', label: 'All Rooms' },
  { key: 'exteriors', label: 'Exteriors' },
  { key: 'interiors', label: 'Interiors' },
  { key: 'kitchens', label: 'Kitchens' },
]

// Current category from route
const activeCategory = computed(() => {
  const raw = route.params.category
  if (!raw)
    return 'all'
  return String(raw)
})

const goToCategory = (key) => {
  if (key === 'all') {
    router.push('/portfolio')
  }
  else {
    router.push(`/portfolio/${key}`)
  }
}

// View mode for residential: 'project' or 'room'
const viewMode = ref('project')
const activeRoom = ref('all')

// Glob all images in assets/projects/** (both project + room structure)
const modules = import.meta.glob('@/assets/projects/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
})

// Normalize into a flat list: [{ src, category, project, filename, room? }]
const allImages = computed(() => {
  return Object.entries(modules).map(([path, mod]) => {
    // Example paths:
    //  - /assets/projects/commercial/project-a/img1.jpg
    //  - /assets/projects/residential/project-a/exteriors/img1.jpg

    const parts = path.split('/')

    const projectsIndex = parts.findIndex(p => p === 'projects')
    const relative = parts.slice(projectsIndex + 1)
    // relative:
    // ['commercial','project-a','img1.jpg']
    // ['residential','project-a','exteriors','img1.jpg']

    let category = ''
    let project = ''
    let filename = ''
    let room = null

    if (relative.length === 3) {
      // projects/<category>/<project>/<file>
      category = relative[0]
      project = relative[1]
      filename = relative[2]
    }
    else if (relative.length === 4 && relative[0] === 'residential') {
      // projects/residential/<project>/<room>/<file>
      category = 'residential'
      project = relative[1]
      room = relative[2]
      filename = relative[3]
    }
    else {
      // fallback
      category = relative[0] || ''
      project = relative[1] || ''
      filename = relative[relative.length - 1] || ''
    }

    const src = mod && mod.default ? mod.default : mod

    return {
      src,
      category,
      project,
      filename,
      room,
    }
  })
})

// Base list filtered by top-level category
const baseCategoryImages = computed(() => {
  if (activeCategory.value === 'all')
    return allImages.value
  return allImages.value.filter(img => img.category === activeCategory.value)
})

// Final filtered images (includes residential "by room" mode)
const filteredImages = computed(() => {
  let list = baseCategoryImages.value

  if (
    activeCategory.value === 'residential'
    && viewMode.value === 'room'
    && activeRoom.value !== 'all'
  ) {
    list = list.filter(img => img.room === activeRoom.value)
  }

  return list
})

// Lightbox state
const lightboxOpen = ref(false)
const activeIndex = ref(0)

const openLightbox = (index) => {
  if (!filteredImages.value.length)
    return
  activeIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const showPrev = () => {
  const total = filteredImages.value.length
  if (!total)
    return
  activeIndex.value = (activeIndex.value - 1 + total) % total
}

const showNext = () => {
  const total = filteredImages.value.length
  if (!total)
    return
  activeIndex.value = (activeIndex.value + 1) % total
}

// Active image for lightbox, always safe
const activeImage = computed(() => {
  const list = filteredImages.value
  if (!list.length)
    return null
  if (activeIndex.value < 0 || activeIndex.value >= list.length)
    return list[0]
  return list[activeIndex.value]
})

// If filters change while lightbox is open, clamp or close
watch(filteredImages, (newList) => {
  if (!lightboxOpen.value)
    return
  if (!newList.length) {
    lightboxOpen.value = false
    return
  }
  if (activeIndex.value >= newList.length) {
    activeIndex.value = 0
  }
})
</script>

<template>
  <Head>
    <Title>Our Work | Golden Eagle Construction | Montana</Title>
    <Meta name="description" content="Founded in 1986 and owned by company president, Adam Senechal, since 2012, Golden Eagle Construction provides high-quality commercial construction and residential construction services. " />
    <Link rel="canonical" href="https://geconstruction.com/portfolio/" />
  </Head>

  <section class="bg-fixed bg-cover page-hero" style="background-image: url(/images/title-1.jpg);">
    <div class="container relative z-50 px-6 mx-auto ">
      <div class="py-32 text-center">
        <h1 class="text-4xl font-bold leading-10 lg:text-7xl text-brandBlue1 font-sansAccent2">
          Our Work
        </h1>
      </div>
    </div>
  </section>
  <section class="py-24 bg-white">
    <div class="container px-6 mx-auto">
      <!-- Filter tabs (top-level categories) -->
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <button
          v-for="cat in CATEGORIES"
          :key="cat.key"
          type="button"
          class="px-5 py-2 text-xs tracking-[0.25em] uppercase border transition border-brandBlue1/30"
          :class="activeCategory === cat.key
            ? 'bg-brandBlue1 text-white'
            : 'bg-white text-brandBlue1 hover:bg-brandBlue1/5'"
          @click="goToCategory(cat.key)"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Residential-only controls: view mode + rooms -->
      <div
        v-if="activeCategory === 'residential'"
        class="flex flex-col items-center gap-4 mb-10"
      >
        <!-- View mode toggle -->
        <div class="inline-flex overflow-hidden border border-brandBlue1/30">
          <button
            type="button"
            class="px-5 py-2 text-xs tracking-[0.25em] uppercase transition"
            :class="viewMode === 'project'
              ? 'bg-brandBlue1 text-white'
              : 'bg-white text-brandBlue1 hover:bg-brandBlue1/5'"
            @click="viewMode = 'project'"
          >
            By Project
          </button>
          <button
            type="button"
            class="px-5 py-2 text-xs tracking-[0.25em] uppercase transition"
            :class="viewMode === 'room'
              ? 'bg-brandBlue1 text-white'
              : 'bg-white text-brandBlue1 hover:bg-brandBlue1/5'"
            @click="viewMode = 'room'"
          >
            By Room
          </button>
        </div>

        <!-- Room filter tabs (only when in "room" mode) -->
        <div
          v-if="viewMode === 'room'"
          class="flex flex-wrap justify-center gap-3"
        >
          <button
            v-for="room in ROOM_TYPES"
            :key="room.key"
            type="button"
            class="px-4 py-1 text-[11px] tracking-[0.2em] uppercase border transition border-brandBlue1/20"
            :class="activeRoom === room.key
              ? 'bg-brandBlue1 text-white'
              : 'bg-white text-brandBlue1 hover:bg-brandBlue1/5'"
            @click="activeRoom = room.key"
          >
            {{ room.label }}
          </button>
        </div>
      </div>

      <!-- Grid -->
      <div
        v-if="filteredImages.length"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <button
          v-for="(img, index) in filteredImages"
          :key="img.src + index"
          type="button"
          class="relative overflow-hidden group"
          @click="openLightbox(index)"
        >
          <img
            :src="img.src"
            :alt="`${img.project} – ${img.category}`"
            class="object-cover w-full transition-transform duration-300 h-80 group-hover:scale-105"
          >

          <div class="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
            <!-- <p class="text-sm font-semibold text-white">
              {{ img.project.replace(/-/g, ' ') }}
            </p>
            <p class="text-xs uppercase tracking-[0.2em] text-white/80">
              <span>{{ img.category.replace(/-/g, ' ') }}</span>
              <span v-if="img.room" class="ml-1">
                · {{ img.room.replace(/-/g, ' ') }}
              </span>
            </p> -->
          </div>
        </button>
      </div>

      <!-- Lightbox -->
      <div
        v-if="lightboxOpen && activeImage"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
      >
        <button
          type="button"
          class="absolute text-3xl text-white top-6 right-8"
          @click="closeLightbox"
        >
          &times;
        </button>

        <button
          type="button"
          class="absolute text-3xl text-white left-4 md:left-10"
          @click="showPrev"
        >
          ‹
        </button>
        <button
          type="button"
          class="absolute text-3xl text-white right-4 md:right-10"
          @click="showNext"
        >
          ›
        </button>

        <div class="max-w-5xl px-4">
          <img
            :src="activeImage.src"
            :alt="`${activeImage.project} – ${activeImage.category}`"
            class="object-contain w-full max-h-[80vh]"
          >
          <div class="mt-4 text-center text-white">
            <div class="text-lg font-semibold">
              {{ activeImage.project.replace(/-/g, ' ') }}
            </div>
            <div class="text-xs uppercase tracking-[0.2em] text-white/70">
              {{ activeImage.category.replace(/-/g, ' ') }}
              <span v-if="activeImage.room">
                · {{ activeImage.room.replace(/-/g, ' ') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>