<script setup>
import { computed, ref } from 'vue'
import testimonials from '~/data/testimonials.js'

const props = defineProps({
  maxChars: { type: Number, default: 320 },
  eyebrow: { type: String, default: 'Testimonials' },
  seed: { type: Number, default: null }, // optional: force deterministic start index
  showDots: { type: Boolean, default: true },
})

const expanded = ref(false)
const total = computed(() => testimonials?.length || 0)

// Persist the randomly chosen index from SSR -> client for THIS route/component instance
// Key includes route so different pages can get different picks (optional)
const route = useRoute()
const pickedIndex = useState(`testimonial-index:${route.path}`, () => {
  if (!total.value)
    return 0

  // deterministic if seed provided
  if (props.seed !== null)
    return Math.abs(props.seed) % total.value

  // SSR-safe random pick, stored in Nuxt payload and reused on client
  return Math.floor(Math.random() * total.value)
})

const active = computed(() => testimonials?.[pickedIndex.value] || null)
const fullText = computed(() => (active.value?.quote || '').trim())
const needsClamp = computed(() => fullText.value.length > props.maxChars)

const clampedText = computed(() => {
  if (!needsClamp.value || expanded.value)
    return fullText.value

  const slice = fullText.value.slice(0, props.maxChars)
  const lastSpace = slice.lastIndexOf(' ')
  return `${slice.slice(0, Math.max(0, lastSpace))}…`
})

const toggle = () => {
  expanded.value = !expanded.value
}

const goTo = (i) => {
  if (!total.value)
    return
  expanded.value = false
  const idx = ((i % total.value) + total.value) % total.value
  pickedIndex.value = idx
}

const next = () => goTo(pickedIndex.value + 1)
const prev = () => goTo(pickedIndex.value - 1)
</script>

<template>
  <section class="w-full bg-brandBlue1/10">
    <div class="container px-6 py-12 mx-auto">
      <div v-if="!active" class="text-center text-brandSilver1">
        No testimonials provided.
      </div>

      <div v-else class="relative overflow-hidden ">
        <!-- Prev/Next -->
        <button
          v-if="total > 1"
          type="button"
          class="absolute z-10 flex items-center justify-center w-10 h-10 bottom-3 left-2"
          aria-label="Previous testimonial"
          @click="prev"
        >
          <span class="text-3xl leading-none text-brandGold">‹</span>
        </button>

        <button
          v-if="total > 1"
          type="button"
          class="absolute z-10 flex items-center justify-center w-10 h-10 bottom-3 right-2"
          aria-label="Next testimonial"
          @click="next"
        >
          <span class="text-3xl leading-none text-brandGold">›</span>
        </button>

        <div class="p-8 md:p-10">
          <div class="flex items-start justify-between gap-6">
            <div class="min-w-0">
              <p class="text-xs tracking-[0.28em] uppercase text-brandSilver1">
                {{ props.eyebrow }}
              </p>

              <!-- keep HTML line breaks from your data file -->
              <p class="mt-4 text-lg leading-8 text-brandBlk">
                <span class="select-none">“</span>
                <span v-html="clampedText" />
                <span class="select-none">”</span>
              </p>

              <div class="mt-6">
                <p v-if="active.name" class="font-semibold text-brandBlk">
                  {{ active.name }}
                </p>
                <p v-if="active.title || active.location" class="text-sm text-brandSilver1">
                  <span v-if="active.title">{{ active.title }}</span>
                  <span v-if="active.title && active.location"> · </span>
                  <span v-if="active.location">{{ active.location }}</span>
                </p>
              </div>

              <div v-if="needsClamp" class="mt-6">
                <button
                  type="button"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-brandBlue1 hover:opacity-80"
                  @click="toggle"
                >
                  <span>{{ expanded ? 'Show less' : 'Read more' }}</span>
                  <span class="text-lg leading-none">
                    {{ expanded ? '▴' : '▾' }}
                  </span>
                </button>
              </div>

              <!-- Dots -->
              <div
                v-if="props.showDots && total > 1"
                class="flex flex-wrap items-center gap-2 mt-8 mb-6"
                aria-label="Testimonial navigation"
              >
                <button
                  v-for="i in total"
                  :key="i"
                  type="button"
                  class="w-2.5 h-2.5 rounded-full border border-brandBlue1/40"
                  :class="(i - 1) === pickedIndex ? 'bg-brandBlue1' : 'bg-transparent hover:bg-brandBlue1/20'"
                  :aria-label="`Go to testimonial ${i}`"
                  @click="goTo(i - 1)"
                />
              </div>
            </div>

            <div class="hidden md:block shrink-0">
              <span class="block h-[3px] w-12 bg-brandGold" />
              <span class="block w-[3px] h-12 ml-auto bg-brandGold" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>