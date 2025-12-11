<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  page: {
    type: String,
    required: false,
    default: '',
  },
  headline: {
    type: String,
    required: false,
    default: '',
  },
})

const isVisible = ref(false)
const bgImage = ref('')

// Grab all images in /assets/images/heads/**
// Nuxt prefers the ~/ alias here
const modules = import.meta.glob('~/assets/heads/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

// Turn them into an array of URLs and pick one
const images = Object.values(modules)

if (images.length) {
  const randomIndex = Math.floor(Math.random() * images.length)
  bgImage.value = images[randomIndex]
}

onMounted(() => {
  // Just for the fade-in
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section
    class="transition-opacity duration-700 bg-fixed bg-cover page-hero"
    :class="{ 'opacity-0': !isVisible, 'opacity-100': isVisible }"
    :style="bgImage ? `background-image: url(${bgImage})` : ''"
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