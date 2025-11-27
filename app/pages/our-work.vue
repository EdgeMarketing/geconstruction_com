<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const slides = [
  { src: '/images/commercial-Munis.jpg', alt: 'Restaurant construction' },
  { src: '/images/commercial-Shodair.jpg', alt: 'Shodair Childrens hospital' },
  { src: '/images/residential-house1.jpg', alt: 'custom home construction' },
  { src: '/images/residential-house2.jpg', alt: 'custom home construction' },
]

const idx = ref(0)
const autoplayMs = 4500
let t

const next = () => (idx.value = (idx.value + 1) % slides.length)
const goTo = i => (idx.value = i)

const start = () => {
  // Respect reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return
  t = window.setInterval(next, autoplayMs)
}
const stop = () => t && window.clearInterval(t)

onMounted(start)
onUnmounted(stop)
</script>

<template>
  <Head>
    <Title>Our Work | Golden Eagle Construction | Montana</Title>
    <Meta name="description" content="Golden Eagle Construction is a leading, high-quality construction firm in Montana, serving both residential and commercial clients since 1986. Our diverse portfolio and commitment to outstanding project delivery have earned us a strong reputation in the region. " />
    <Link rel="canonical" href="https://geconstruction.com/our-work/" />
  </Head>

  <section class="bg-fixed bg-cover page-hero" style="background-image: url(/images/title-1.jpg);">
    <div class="container relative z-50 px-6 mx-auto ">
      <div class="py-32 text-center">
        <h1 class="text-4xl font-bold leading-10 lg:text-7xl text-brandBlue1 font-sansAccent2">
          Commercial & Residential Construction
        </h1>
      </div>
    </div>
  </section>

  <section>
    <div class="container px-6 py-32 mx-auto">
      <div class="text-center">
        <div class="max-w-3xl m-auto text-4xl font-bold leading-10 text-brandGold">
          Achieving the building goals of Montana home and business owners
        </div>
        <div class="max-w-5xl mx-auto my-12 leading-7 tracking-wide text-brandSilver1">
          <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
            <!-- Column 1 -->
            <p>
              Golden Eagle Construction is a leading, high-quality construction firm in Montana,
              serving both residential and commercial clients since 1986. Our diverse portfolio and
              commitment to outstanding project delivery have earned us a strong reputation in the
              region. Our residential projects include unique custom homes that realize our clients’
              visions and reflect their styles. On the commercial and industrial side, we handle new
              construction projects, remodels, and renovations.
            </p>

            <!-- Column 2 -->
            <div class="flex flex-col gap-6">
              <p>
                A large portion of our commercial work involves multi-family residential properties,
                such as apartments, condominiums, and townhouses. With our extensive experience in both
                residential and commercial construction, multi-family residences are a natural
                specialty for us.
              </p>

              <!-- Buttons at the bottom of column 2 -->
              <div class="flex flex-col gap-4 m-auto sm:flex-row">
                <NuxtLink
                  to="/portfolio/residential"
                  class="btnGold"
                >
                  Residential
                </NuxtLink>

                <NuxtLink
                  to="/portfolio/commercial"
                  class="btnGold"
                >
                  Commercial
                </NuxtLink>
              </div>
              <NuxtLink
                to="/portfolio/multi-family"
                class="m-auto max-w-60 btnGold"
              >
                Multi-Family
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section
    class="relative overflow-hidden bg-brandBlue1 isolate"
  >
    <div
      class="absolute inset-x-0 top-0 -z-10 h-[66.67%] "
    />

    <div
      class="pointer-events-none md:pointer-events-auto md:absolute md:inset-y-0 md:right-0 md:w-[58vw] lg:w-[60vw] xl:w-[62vw] -z-0"
    >
      <div class="relative w-full h-full group" @mouseenter="stop" @mouseleave="start">
        <!-- Slides -->
        <div
          v-for="(s, i) in slides" :key="s.src"
          class="absolute inset-0 transition-opacity duration-700"
          :class="i === idx ? 'opacity-100' : 'opacity-0'"
        >
          <img :src="s.src" :alt="s.alt" class="hidden object-cover w-full h-full md:block">
        </div>

        <!-- Vertical dot nav -->
        <ul class="absolute z-10 flex-col hidden gap-3 md:flex top-6 right-6">
          <li v-for="(s, i) in slides" :key="`dot-${i}`">
            <button
              class="w-4 h-4 transition border rounded-full border-white/80 bg-white/70 hover:bg-white ring-0 focus:outline-none focus:ring-2 focus:ring-white/60"
              :class="i === idx ? '!bg-brandGold !border-brandGold' : ''"
              aria-label="Go to slide"
              @click="goTo(i)"
            />
          </li>
        </ul>
      </div>
    </div>

    <!-- Content container -->
    <div class="container px-6 mx-auto">
      <div class="grid items-stretch grid-cols-1 md:grid-cols-12">
        <!-- Left column (inside container) -->
        <div class="py-16 pr-16 md:col-span-5 lg:col-span-4">
          <h3 class="mb-6 text-2xl font-bold text-white">
            Our key strengths include:
          </h3>

          <div class="grid gap-6 mt-8 text-white">
            <div class="p-6 bg-brandGold">
              Broad expertise in custom homes, multi-family projects, commercial buildings, and specialized services like roofing, drywall, excavation and crane services.
            </div>
            <div class="p-6 bg-brandGold">
              An in-house, highly experienced, and professional team focused on delivering top-quality client service, rather than relying on subcontractors.
            </div>
            <div class="p-6 bg-brandGold">
              A competitive edge in pricing within the commercial market.
            </div>
            <div class="p-6 bg-brandGold">
              A steadfast dedication to integrity, outstanding craftsmanship, and client collaboration and partnership.
            </div>
          </div>

          <div class="hidden md:block md:col-span-7 lg:col-span-8" />

          <!-- Mobile slider (stacks inside flow) -->
          <div class="mt-6 md:hidden">
            <div class="relative h-[48vh] w-full overflow-hidden">
              <div
                v-for="(s, i) in slides" :key="`m-${s.src}`"
                class="absolute inset-0 transition-opacity duration-700"
                :class="i === idx ? 'opacity-100' : 'opacity-0'"
              >
                <img :src="s.src" :alt="s.alt" class="object-cover w-full h-full">
              </div>

              <!-- Horizontal dots bottom-right on mobile -->
              <div class="absolute flex gap-2 right-4 bottom-4">
                <button
                  v-for="(s, i) in slides" :key="`mdot-${i}`"
                  class="h-2.5 w-2.5 rounded-full border border-white/80 bg-white/70"
                  :class="i === idx ? 'bg-brandGold border-brandGold' : ''"
                  @click="goTo(i)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
