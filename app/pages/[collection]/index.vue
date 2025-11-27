<script setup>
import { useAsyncData } from '#imports'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { collection } = route.params

// Get and alphabetize portfolios by title
const { data: portfolios } = await useAsyncData(collection, async () => {
  const items = await queryCollection(collection).all()
  return items.sort((a, b) => a.title.localeCompare(b.title))
})

const categories = ['All', 'Residential', 'Commercial', 'Multi-Family']
const selectedCategory = ref(route.query.category || 'All')

// Filtered list based on selected category
const filteredPortfolios = computed(() => {
  if (selectedCategory.value === 'All')
    return portfolios.value
  return portfolios.value.filter(p => p.meta.category?.toLowerCase() === selectedCategory.value.toLowerCase())
})
</script>

<template>
  <Head>
    <Title>Projects | Golden Eagle Construction | Montana</Title>
    <Meta name="description" content="Founded in 1986 and owned by company president, Adam Senechal, since 2012, Golden Eagle Construction provides high-quality commercial construction and residential construction services. " />
    <Link rel="canonical" href="https://geconstruction.com/projects/" />
  </Head>

  <section class="bg-fixed bg-cover page-hero" style="background-image: url(/images/title-1.jpg);">
    <div class="container relative z-50 px-6 mx-auto ">
      <div class="py-32 text-center">
        <h1 class="text-4xl font-bold leading-10 lg:text-7xl text-brandBlue1 font-sansAccent2">
          Projects
        </h1>
      </div>
    </div>
  </section>

  <article class="px-4 py-16 mx-auto mt-20 max-w-7xl">
    <!-- Category Filter -->
    <div class="flex flex-wrap justify-center gap-3 mb-8">
      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button
          v-for="category in categories"
          :key="category"
          class="px-4 py-2 text-sm font-medium transition-all border"
          :class="[
            selectedCategory === category
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-900 border-neutral-300 hover:bg-neutral-100',
          ]"
          @click="
            selectedCategory = category;
            $router.replace({ query: { category } });
          "
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Grid of Portfolio Tiles -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="portfolio in filteredPortfolios"
        :key="portfolio._id"
        :to="portfolio.path"
        class="relative block overflow-hidden transition-all shadow group hover:shadow-xl"
      >
        <img
          :src="portfolio.meta.featuredImage"
          :alt="portfolio.title"
          class="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
        >
        <div class="absolute inset-0 flex items-end p-4 transition-all bg-black bg-opacity-40 group-hover:bg-opacity-60">
          <h2 class="text-xl font-semibold text-white">
            {{ portfolio.title }}
          </h2>
        </div>
      </NuxtLink>
    </div>
  </article>
</template>
