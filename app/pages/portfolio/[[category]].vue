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

// Glob all images in assets/projects/**
const modules = import.meta.glob('@/assets/projects/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
})

// Normalize into a flat list: [{ src, category, project, filename, room? }]
const allImages = computed(() => {
  return Object.entries(modules).map(([path, mod]) => {
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

// Are we in "project view" (one card per project)?
const isProjectView = computed(() => {
  // For non-residential, always project view
  if (activeCategory.value !== 'residential')
    return true

  // Residential: only when explicitly set
  return viewMode.value === 'project'
})

// Group images by project (used in project view)
const projectGroups = computed(() => {
  const map = new Map()

  for (const img of filteredImages.value) {
    const key = `${img.category}__${img.project}`

    if (!map.has(key)) {
      map.set(key, {
        key,
        category: img.category,
        project: img.project,
        images: [],
        cover: img, // default cover
      })
    }

    const group = map.get(key)
    group.images.push(img)

    // Prefer exteriors as cover if available
    if (img.room === 'exteriors' || !group.cover) {
      group.cover = img
    }
  }

  return Array.from(map.values())
})

// Lightbox state
const lightboxOpen = ref(false)
// Images currently in the lightbox (project images OR filtered set)
const lightboxImages = ref([])
const activeIndex = ref(0)

const openLightboxForImage = (index) => {
  // room mode or generic "flat" view
  if (!filteredImages.value.length)
    return
  lightboxImages.value = filteredImages.value
  activeIndex.value = index
  lightboxOpen.value = true
}

const openLightboxForProject = (group) => {
  if (!group || !group.images?.length)
    return
  lightboxImages.value = group.images
  activeIndex.value = 0
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
  lightboxImages.value = []
}

const showPrev = () => {
  const total = lightboxImages.value.length
  if (!total)
    return
  activeIndex.value = (activeIndex.value - 1 + total) % total
}

const showNext = () => {
  const total = lightboxImages.value.length
  if (!total)
    return
  activeIndex.value = (activeIndex.value + 1) % total
}

const activeImage = computed(() => {
  const list = lightboxImages.value
  if (!list.length)
    return null
  if (activeIndex.value < 0 || activeIndex.value >= list.length)
    return list[0]
  return list[activeIndex.value]
})

// If filters or view mode change while lightbox is open, just close it
watch(
  () => [filteredImages.value, viewMode.value, activeCategory.value],
  () => {
    if (lightboxOpen.value)
      closeLightbox()
  },
  { deep: true },
)

const thumbStripRef = ref(null)

const scrollThumbs = (direction) => {
  const el = thumbStripRef.value
  if (!el)
    return

  const amount = el.clientWidth * 0.8

  el.scrollBy({
    left: direction === 'next' ? amount : -amount,
    behavior: 'smooth',
  })
}
</script>

<template>
  <Head>
    <Title>Our Work | Golden Eagle Construction | Montana</Title>
    <Meta name="description" content="Founded in 1986 and owned by company president, Adam Senechal, since 2012, Golden Eagle Construction provides high-quality commercial construction and residential construction services. " />
    <Link rel="canonical" href="https://geconstruction.com/portfolio/" />
  </Head>

  <titleSection headline="Our Work" />
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

      <!-- PROJECT VIEW: one card per project -->
      <div
        v-if="isProjectView && projectGroups.length"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <button
          v-for="group in projectGroups"
          :key="group.key"
          type="button"
          class="relative overflow-hidden text-left group"
          @click="openLightboxForProject(group)"
        >
          <img
            :src="group.cover.src"
            :alt="`${group.project} – ${group.category}`"
            class="object-cover w-full transition-transform duration-300 h-80 group-hover:scale-105"
          >

          <div class="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
            <p class="text-sm font-semibold text-white">
              {{ group.project.replace(/-/g, ' ') }}
            </p>
            <p class="text-xs uppercase tracking-[0.2em] text-white/80">
              {{ group.category.replace(/-/g, ' ') }}
            </p>
          </div>
        </button>
      </div>

      <!-- ROOM / IMAGE VIEW: individual images (e.g., residential by room) -->
      <div
        v-else-if="filteredImages.length"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <button
          v-for="(img, index) in filteredImages"
          :key="img.src + index"
          type="button"
          class="relative overflow-hidden group"
          @click="openLightboxForImage(index)"
        >
          <img
            :src="img.src"
            :alt="`${img.project} – ${img.category}`"
            class="object-cover w-full transition-transform duration-300 h-80 group-hover:scale-105"
          >

          <div class="absolute bottom-0 left-0 right-0 px-4 py-3 text-left bg-gradient-to-t from-black/70 to-transparent">
            <p class="text-sm font-semibold text-white">
              {{ img.project.replace(/-/g, ' ') }}
            </p>
            <p class="text-xs uppercase tracking-[0.2em] text-white/80">
              <span>{{ img.category.replace(/-/g, ' ') }}</span>
              <span v-if="img.room" class="ml-1">
                · {{ img.room.replace(/-/g, ' ') }}
              </span>
            </p>
          </div>
        </button>
      </div>

      <!-- Optional: no results state -->
      <div
        v-else
        class="py-16 text-center text-brandSilver1"
      >
        No projects found for this view.
      </div>

      <!-- Lightbox -->
      <div
        v-if="lightboxOpen && activeImage"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
      >
        <div class="relative max-w-5xl px-4">
          <button
            type="button"
            class="absolute text-5xl text-white -top-3 -right-3"
            @click="closeLightbox"
          >
            &times;
          </button>

          <button
            type="button"
            class="absolute text-5xl text-white -left-4 md:left-10 top-1/2"
            @click="showPrev"
          >
            ‹
          </button>
          <button
            type="button"
            class="absolute text-5xl text-white -right-4 md:right-10 top-1/2"
            @click="showNext"
          >
            ›
          </button>

          <img
            :src="activeImage.src"
            :alt="`${activeImage.project} – ${activeImage.category}`"
            class="object-contain w-full max-h-[70vh]"
          >

          <!-- Simple caption -->
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

          <!-- Thumbnails for current set: horizontal carousel -->
          <div
            v-if="lightboxImages.length > 1"
            class="relative mt-6"
          >
            <!-- Left arrow -->
            <button
              type="button"
              class="absolute left-0 z-10 flex items-center justify-center w-8 h-8 -translate-y-1/2 bg-black/60 top-1/2 md:-left-10"
              @click="scrollThumbs('prev')"
            >
              <span class="text-xl text-white">‹</span>
            </button>

            <!-- Scrollable strip -->
            <div
              ref="thumbStripRef"
              class="flex gap-2 px-8 overflow-x-auto scrollbar-hide"
            >
              <button
                v-for="(thumb, i) in lightboxImages"
                :key="thumb.src + i"
                type="button"
                class="flex-shrink-0 w-20 h-16 overflow-hidden border border-white/30 md:w-24 md:h-20"
                :class="i === activeIndex ? 'ring-2 ring-brandGold' : ''"
                @click="activeIndex = i"
              >
                <img
                  :src="thumb.src"
                  :alt="`${thumb.project} – ${thumb.category}`"
                  class="object-cover w-full h-full"
                >
              </button>
            </div>

            <!-- Right arrow -->
            <button
              type="button"
              class="absolute right-0 z-10 flex items-center justify-center w-8 h-8 -translate-y-1/2 bg-black/60 top-1/2 md:-right-10"
              @click="scrollThumbs('next')"
            >
              <span class="text-xl text-white">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>