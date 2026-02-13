<script setup>
import { computed } from 'vue'
import staffDirectory from '~/data/team.js'

const props = defineProps({
  slug: {
    type: String,
    required: false,
    default: null,
  },
  team: {
    type: String,
    required: false,
    default: null,
  },
})

/**
 * Normalize staffDirectory into an array:
 * [{ slug, ...data }]
 */
const allStaff = computed(() =>
  Object.entries(staffDirectory)
    .filter(([, value]) => !!value)
    .map(([key, value]) => ({
      slug: value.slug ?? key,
      ...value,
    })),
)

const staffList = computed(() => {
  // 1. If a slug is provided, return that one
  if (props.slug) {
    const found = allStaff.value.find(person => person.slug === props.slug)
    return found ? [found] : []
  }

  // 2. If a specific team is provided, filter normally
  if (props.team) {
    return allStaff.value.filter(person => person.team === props.team)
  }

  // 3. Otherwise return all, ordered
  const priority = {
    leadership: 1,
    office: 3,
  }

  return [...allStaff.value].sort((a, b) => {
    const aRank = priority[a.team] || 2
    const bRank = priority[b.team] || 2

    if (aRank !== bRank)
      return aRank - bRank

    // Optional: secondary alphabetical sort within same group
    return (a.name || '').localeCompare(b.name || '')
  })
})
</script>

<template>
  <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
    <NuxtLink
      v-for="person in staffList"
      :key="person.slug"
      :to="`/team/${person.slug}`"
      class="relative block mb-10 group"
    >
      <!-- Photo -->
      <div class="relative">
        <img
          :src="person.image"
          :alt="person.name"
          class="object-cover w-full h-96"
        >

        <!-- Corner accent -->
        <div class="absolute top-4 right-4">
          <span class="block h-[3px] w-12 bg-brandGold" />
          <span class="block w-[3px] h-12 ml-auto bg-brandGold" />
        </div>
      </div>

      <!-- Overlapping info card -->
      <div class="relative pb-6">
        <div
          class="absolute left-0 flex items-center justify-between gap-6 px-6 py-4 bg-white shadow-md right-12 -top-8"
        >
          <div>
            <p class="text-xl font-semibold text-brandBlk">
              {{ person.name }}
            </p>
            <p
              v-if="person.title"
              class="mt-1 text-xs tracking-[0.25em] uppercase text-brandSilver1"
            >
              {{ person.title }}
            </p>
          </div>

          <!-- Only show if they actually have a bio -->
          <span
            v-if="person.bio && person.bio.trim().length"
            class="transition-transform duration-200 text-brandGold/50 group-hover:translate-x-1"
            aria-hidden="true"
          >
            about ›
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>