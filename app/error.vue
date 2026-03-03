<script setup>
const props = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
})

const statusCode = computed(() => props.error?.statusCode || 500)
const isNotFound = computed(() => statusCode.value === 404)
</script>

<template>
  <edge-navbar />
  <Head>
    <Title>Golden Eagle Construction - Page Not Found</Title>
    <Meta name="description" content="The page you are looking for could not be found." />
    <Link rel="canonical" href="https://geconstruction.com/" />
  </Head>

  <template v-if="isNotFound">
    <titleSection
      page="404"
      headline="404 - Page Not Found"
    />
    <div class="min-h-[calc(100vh_-_586px)] w-full items-center justify-center flex flex-col">
      <p class="mb-6 mt-14 text-gray-400 text-md text-center">
        Looks like this page failed inspection.<br>
        We checked the blueprints. This address doesn’t exist.
      </p>
      <a href="/" class="px-6 py-2 mt-2 transition-colors bg-lblue text-dblue hover:bg-opacity-80">
        Go Home
      </a>
    </div>
  </template>
  <div v-else class="min-h-[calc(100vh_-_586px)] w-full items-center justify-center flex flex-col">
    <titleSection
      page="Error"
      headline="Something went wrong"
    />
    <h1 class="mb-4 text-6xl font-bold">
      {{ statusCode }}
    </h1>
    <p class="mb-2 text-xl">
      Unexpected Error
    </p>
    <p class="mb-6 text-gray-400 text-md">
      Please try again or head back home.
    </p>
    <a href="/" class="px-6 py-2 mt-2 transition-colors bg-lblue text-dblue hover:bg-opacity-80">
      Go Home & Debug Later
    </a>
  </div>
  <edge-footer />
</template>
