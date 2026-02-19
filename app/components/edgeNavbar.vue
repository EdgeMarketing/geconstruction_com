<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const menuOpen = ref(false)
// which mobile dropdown is open: e.g. 'Our Work', 'Services', or null
const openMobileDropdown = ref(null)
const route = useRoute()

const LINKS = [
  { to: '/about', label: 'About' },
  {
    to: '/our-work',
    label: 'Our Work',
    children: [
      { to: '/portfolio/', label: 'All Projects' },
      { to: '/portfolio/commercial', label: 'Commercial' },
      { to: '/portfolio/residential', label: 'Residential' },
      { to: '/portfolio/multi-family', label: 'Multi-Family' },
    ],
  },
  {
    to: '/services',
    label: 'Services',
    children: [
      { to: '/residential-construction', label: 'Residential' },
      { to: '/commercial-construction', label: 'Commercial' },
      { to: '/multi-family', label: 'Multi-Family' },
      { to: '/crane-service', label: 'Crane Service' },
      { to: '/drywall', label: 'Drywall' },
      { to: '/excavation', label: 'Excavation' },
    ],
  },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
]

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  if (!menuOpen.value)
    openMobileDropdown.value = null

  document.body.classList.toggle('overflow-hidden', menuOpen.value)
}

const closeMenu = () => {
  menuOpen.value = false
  openMobileDropdown.value = null
  document.body.classList.remove('overflow-hidden')
}

const handleResize = () => {
  if (window.innerWidth >= 1024)
    closeMenu()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(
  () => route.fullPath,
  () => closeMenu(),
)
</script>

<template>
  <nav class="relative z-50 text-white">
    <!-- Top bar -->
    <div class="relative px-6 bg-white md:px-12">
      <div class="container mx-auto flex items-center justify-between h-[128px]">
        <!-- Logo -->
        <NuxtLink to="/" class="text-xl font-bold">
          <img src="/images/logo.png" alt="MT" class="h-auto max-h-7 md:max-h-12">
        </NuxtLink>

        <!-- Mobile toggle -->
        <button
          class="md:hidden focus:outline-none text-brandBlue1"
          aria-label="Toggle navigation"
          :aria-expanded="menuOpen"
          @click="toggleMenu"
        >
          <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Desktop menu -->
        <ul class="hidden md:flex space-x-[78px] font-semibold tracking-widest uppercase">
          <li
            v-for="link in LINKS"
            :key="link.label"
            class="relative group"
          >
            <!-- Parent link -->
            <NuxtLink
              :to="link.to"
              class="flex items-center gap-2 nav-item"
            >
              {{ link.label }}
              <span v-if="link.children" class="text-xs">
                ▾
              </span>
            </NuxtLink>

            <!-- Desktop dropdown for Services -->
            <div
              v-if="link.children"
              class="absolute left-0 z-50 invisible w-56 mt-0 transition bg-white shadow-lg opacity-0 text-brandBlk group-hover:opacity-100 group-hover:visible"
            >
              <ul class="py-3 text-sm tracking-normal normal-case">
                <li
                  v-for="child in link.children"
                  :key="child.to"
                >
                  <NuxtLink
                    :to="child.to"
                    class="block px-5 py-2 hover:bg-gray-100"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Mobile slide-in -->
    <transition name="slide">
      <div
        v-if="menuOpen"
        class="fixed inset-0 flex flex-col items-center justify-center px-20 py-6 text-center bg-brandBlue1 z-[9999] w-full h-full"
      >
        <button
          class="absolute text-4xl top-6 right-6 text-lblue"
          aria-label="Close menu"
          @click="toggleMenu"
        >
          &times;
        </button>

        <NuxtLink to="/" @click.native="closeMenu">
          <img src="/images/logo.png" alt="Logo" class="mb-4 w-50">
        </NuxtLink>

        <!-- Socials -->
        <div class="flex justify-center my-6 space-x-4">
          <a
            href="#"
            class="flex items-center justify-center w-12 h-12 transition rounded-full bg-lblue text-dblue hover:bg-opacity-80"
            aria-label="Facebook"
          >
            <i class="fab fa-facebook-f fa-lg" />
          </a>
          <a
            href="#"
            class="flex items-center justify-center w-12 h-12 transition rounded-full bg-lblue text-dblue hover:bg-opacity-80"
            aria-label="Instagram"
          >
            <i class="fab fa-instagram fa-lg" />
          </a>
          <a
            href="#"
            class="flex items-center justify-center w-12 h-12 transition rounded-full bg-lblue text-dblue hover:bg-opacity-80"
            aria-label="Houzz"
          >
            <i class="fab fa-houzz fa-lg" />
          </a>
        </div>

        <!-- Mobile menu items -->
        <!-- Mobile menu items -->
        <ul class="w-full text-left">
          <li
            v-for="(link, idx) in LINKS"
            :key="link.label"
            class="border-b border-lblue"
            :class="idx === 0 ? 'border-t' : ''"
          >
            <!-- Parent with submenu -->
            <template v-if="link.children">
              <button
                type="button"
                class="flex items-center justify-between w-full py-4 text-lg tracking-widest uppercase"
                @click="
                  openMobileDropdown
                    = openMobileDropdown === link.label ? null : link.label
                "
              >
                <span>{{ link.label }}</span>
                <span class="text-sm">
                  {{ openMobileDropdown === link.label ? '▴' : '▾' }}
                </span>
              </button>

              <ul
                v-if="openMobileDropdown === link.label"
                class="pb-2 pl-4 space-y-1 text-base tracking-normal uppercase"
              >
                <li
                  v-for="child in link.children"
                  :key="child.to"
                >
                  <NuxtLink
                    :to="child.to"
                    class="block py-2"
                    @click="closeMenu"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </li>
              </ul>
            </template>

            <!-- Normal top-level items -->
            <template v-else>
              <NuxtLink
                :to="link.to"
                class="block py-4 text-lg tracking-widest uppercase"
                @click="closeMenu"
              >
                {{ link.label }}
              </NuxtLink>
            </template>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<style>
/* Mobile slide-in transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Navigation Items with Triangle */
.nav-item {
  @apply text-brandGold font-sansAccent1;
  position: relative;
  transition: color 0.3s ease-in-out;
}

/* Hover Effect */
.nav-item:hover {
  color: #A2A8AE;
}

.nav-item:hover::after {
  transform: scale(1.3);
  background-color: white;
}

/* Active State */
.nav-item.router-link-active {
  font-weight: bold;
  color: #A2A8AE;
}
</style>