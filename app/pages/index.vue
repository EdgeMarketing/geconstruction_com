<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

useHead({
  bodyAttrs: {
    class: 'home-page',
  },
})

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
    <Title>Golden Eagle Construction | Montana</Title>
    <Meta name="description" content="Whether you’re building a residential or a commercial property, you want to partner with a highly professional team known for its stellar reputation. At Golden Eagle Construction, we exceed your expectations by offering exceptional client service as we guide you through the design and construction of the structure you envision. We aim to make this process a positive and enjoyable experience for you, because we’re doing more than building a structure ― we’re building a partnership with you." />
    <Link rel="canonical" href="https://geconstruction.com/" />
  </Head>

  <!-- Hero wrapper with overlay -->
  <div class="relative w-full h-[70vh] overflow-hidden blue1GradUp">
    <img
      src="/images/hero.jpg" alt="Custom Home"
      class="absolute inset-0 z-0 object-cover w-full h-full"
    >
  </div>

  <div class="relative w-full bg-brandBlue1">
    <div class="container px-6 pb-12 mx-auto">
      <div class="text-white text-7xl lg:text-[177.74px] font-semibold font-sansAccent2 absolute -top-20 md:-top-44">
        Craftsmanship<br>
      </div>
      <div class="text-brandGold text-5xl font-bold font-sansAccent1 tracking-[5.09px] absolute top-0 md:pl-2">
        without compromise<br>
      </div>
      <div class="relative pt-48 pb-12 text-2xl font-light leading-relaxed text-white">
        <div class="grid grid-cols-1 gap-28 md:grid-cols-12">
          <div class="md:col-span-5">
            <p class="text-3xl font-bold leading-[48px] pr-5">
              Your construction partner delivering high-quality residential and commercial projects
            </p>
          </div>
          <div class="md:col-span-7">
            <p class="text-lg leading-8 tracking-wide">
              Whether you’re building a residential or a commercial property, you want to partner with a highly professional team known for its stellar reputation. At Golden Eagle Construction, we exceed your expectations by offering exceptional client service as we guide you through the design and construction of the structure you envision. We aim to make this process a positive and enjoyable experience for you, because we’re doing more than building a structure ― we’re building a partnership with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div style="background-image: url('/images/texture.png')" class="bg-fixed bg-cover">
    <section
      class="relative overflow-hidden bg-cover isolate"
    >
      <div
        class="absolute inset-x-0 top-0 -z-10 h-[66.67%] bg-brandBlue1"
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
          <div class="md:col-span-5 lg:col-span-4">
            <div class="grid gap-0">
              <!-- Tile 1 -->
              <button
                class="w-full text-left transition text-brandBlk px-14 h-60 bg-brandBlue2 hover:opacity-95"
              >
                <span class="block text-2xl font-semibold tracking-widest uppercase font-sansAccent1">
                  Residential
                </span>
              </button>

              <!-- Tile 2 -->
              <button
                class="w-full text-left transition text-brandBlk px-14 h-60 bg-brandGold hover:opacity-95"
              >
                <span class="block text-2xl font-semibold tracking-widest uppercase font-sansAccent1">
                  Commercial
                </span>
              </button>

              <!-- Tile 3 -->
              <button
                class="w-full text-left transition px-14 bg-brandBlk text-brandGold h-60 hover:opacity-95"
              >
                <span class="block text-2xl font-semibold tracking-widest uppercase font-sansAccent1">
                  Other Services
                </span>
              </button>
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
    </section>

    <section>
      <div class="container px-6 py-32 mx-auto">
        <div class="text-center">
          <div class="text-4xl font-bold leading-10 text-brandGold">
            The client experience you expect
          </div>
          <div class="max-w-5xl m-auto my-12 text-lg leading-8 tracking-wide text-brandSilver1">
            Construction projects can take weeks, months, or even years to complete. If you’re building your dream home or a new facility for your business, you want the experience to be more fun than stressful. We make sure you feel good about the process from start to finish by offering fair pricing, professional project management, high-quality craftsmanship, and consistent communication and service throughout. We have the top-notch office, supervisory and field staff to deliver this elevated experience and support your project all along the way, whether you’re selecting paint colors or fixtures, ordering flooring, or working through your budget.
          </div>
          <button
            class="btnOutlineGold"
          >
            About Us
          </button>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-12 bg-brandBlue1">
      <div class="flex items-center justify-center col-span-12 align-middle md:col-span-2">
        <img src="/images/fireplace.jpg">
      </div>
      <div class="col-span-12 px-6 text-left md:px-24 md:col-span-4 py-28">
        <h3 class="mb-6 text-2xl font-bold text-white">
          Montana builders since 1986
        </h3>
        <div class="text-white">
          Golden Eagle specializes in building custom single-family and multi-family residences and commercial properties for businesses. Our projects are primarily based in Montana, but many of our clients come from across the U.S. to build a vacation home or a new office here. We utilize the latest technology to communicate and collaborate with our long-distance clients throughout their project lifecycle.
          <br><br>We have wide-ranging experience in both residential and commercial construction, which is one of our key strengths. Although these markets are different, our knowledge of each enhances our ability to serve both effectively. Clients choose us not only because of our reputation but also due to the extensive expertise we share and the confidence we build. We make sure that our construction projects are something we can be proud of, so that you can be proud of them too.
        </div>
      </div>
      <div class="col-span-12 bg-center bg-cover md:col-span-6 min-h-96" style="background-image: url('/images/gec-building.jpg');">
        &nbsp;
      </div>
    </section>
  </div>
</template>

<style>
body.home-page nav::after {
  content: '';
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  height: 24rem;
  background-image: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0));
  z-index: 0;
  pointer-events: none;
}
</style>