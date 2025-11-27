<template>
  <footer class="relative pt-16 pb-10 bg-white text-brandBlk">
    <div class="container px-6 mx-auto">
      <!-- Top row: 3 columns -->
      <div class="grid gap-12 md:grid-cols-[1.2fr_1fr_1.2fr] items-start">
        <!-- Contact column -->
        <div>
          <h3 class="mb-3 text-xs tracking-widest uppercase text-brandGold font-sansAccent1">
            Helena, Montana
          </h3>

          <ul class="space-y-1 text-sm leading-relaxed">
            <li class="flex items-start gap-3">
              <span class="mt-0.5">
                <i class="fas fa-map-marker-alt" />
              </span>
              <span>
                505 Shepherd Way<br>
                Helena, Montana
              </span>
            </li>
            <li class="flex items-center gap-3">
              <span>
                <i class="fa-solid fa-phone-office" />
              </span>
              <a href="tel:+14064497228" class="hover:underline">
                406.449.7228
              </a>
            </li>
            <li class="flex items-center gap-3">
              <span>
                <i class="fa-solid fa-fax" />
              </span>
              406.449.2290
            </li>
          </ul>

          <h3 class="mt-12 mb-3 text-xs tracking-widest uppercase text-brandGold font-sansAccent1">
            Bozeman, Montana
          </h3>

          <ul class="space-y-1 text-sm leading-relaxed">
            <li class="flex items-start gap-3">
              <span class="mt-0.5">
                <i class="fas fa-map-marker-alt" />
              </span>
              <span>
                12 Pronghorn Lane Unit B<br>
                Bozeman, Montana
              </span>
            </li>
            <li class="flex items-center gap-3">
              <span>
                <i class="fas fa-phone-office" />
              </span>
              <a href="tel:+14065956447" class="hover:underline">
                406.595.6447
              </a>
            </li>
          </ul>
        </div>

        <!-- Center logo + blurb -->
        <div class="flex flex-col items-center text-center">
          <div class="flex items-center gap-4 mb-4">
            <img src="/images/logo-footer.png" alt="golden eagle construction" class="w-auto h-24">
          </div>

          <p class="max-w-lg text-sm leading-relaxed text-brandSilver2">
            Golden Eagle specializes in building custom single-family and multi-family residences and commercial properties for businesses.
          </p>

          <div class="flex items-center gap-4 mt-6">
            <a href="https://www.facebook.com/pages/Golden-Eagle-Construction/" target="_blank" rel="noopener" class="text-brandSilver2 hover:text-brandGold">
              <i class="fab fa-facebook-f fa-lg" />
            </a>
            <a href="https://www.linkedin.com/company/golden-eagle-construction-inc-" target="_blank" rel="noopener" class="text-brandSilver2 hover:text-brandGold">
              <i class="fab fa-linkedin-in fa-lg" />
            </a>
            <a href="http://www.houzz.com/pro/adamsenechal/golden-eagle-construction" target="_blank" rel="noopener" class="text-brandSilver2 hover:text-brandGold">
              <i class="fab fa-houzz fa-lg" />
            </a>
          </div>
        </div>

        <!-- Links column -->
        <div class="text-right md:text-right">
          <h3 class="mb-3 text-xs tracking-widest uppercase text-brandGold font-sansAccent1">
            Links
          </h3>

          <ul class="space-y-3 text-sm">
            <li>
              <NuxtLink to="https://buildertrend.net/?builderID=1585" target="_blank" class="hover:underline">
                Residential Login
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://app.procore.com/login" target="_blank" class="hover:underline">
                Commercial Login
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/careers" class="hover:underline">
                Careers
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="py-6 mt-12 border-t border-gray-200">
        <div class="flex flex-col items-start gap-4 text-xs text-brandSilver2 md:flex-row md:items-center md:justify-between">
          <!-- Left copyright -->
          <div>
            © {{ new Date().getFullYear() }} Golden Eagle Construction, Inc. All rights reserved.
          </div>

          <!-- Right legal links -->
          <div class="flex items-center gap-4">
            <NuxtLink to="/terms" class="hover:underline">
              Privacy Policy
            </NuxtLink>
            <span class="w-px h-4 bg-gray-300" />
            <NuxtLink to="https://edgemarketingdesign.com" class="hover:underline">
              Website by Edge Marketing
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
