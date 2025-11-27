<template>
  <Head>
    <Title>Services | Golden Eagle Construction | Montana</Title>
    <Meta
      name="description"
      content="Explore Golden Eagle Construction’s full range of construction services including residential, commercial, multi-family, excavation, drywall, roofing, and crane operations."
    />
    <Link rel="canonical" href="https://geconstruction.com/services/" />
  </Head>

  <!-- WRAPPER FOR TEXTURE -->
  <!-- HERO -->
  <section class="bg-fixed bg-cover page-hero" style="background-image: url(/images/title-1.jpg);">
    <div class="container relative z-50 px-6 mx-auto">
      <div class="py-32 text-center">
        <h1 class="text-4xl font-bold leading-10 lg:text-7xl text-brandBlue1 font-sansAccent2">
          Our Services
        </h1>
      </div>
    </div>
  </section>

  <!-- INTRO -->
  <section>
    <div class="container px-6 pt-32 pb-12 mx-auto">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold text-brandGold">
          Comprehensive Construction Services
        </h2>

        <p class="mt-8 leading-7 tracking-wide text-brandSilver1">
          Since 1986, Golden Eagle Construction has delivered industry-leading construction services across Montana.
          Our experienced team specializes in residential, commercial, and multi-family construction, supported by
          in-house excavation, drywall, roofing, and crane services. Explore the full scope of what we offer.
        </p>
      </div>
    </div>
  </section>

  <!-- SERVICES GRID -->
  <section class="py-24 bg-white">
    <div class="container px-6 mx-auto">
      <div class="grid gap-x-12 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
        <!-- Residential -->
        <NuxtLink
          to="/residential-construction"
          class="relative block group"
        >
          <img
            src="/images/residential-house1.jpg"
            alt="Residential Construction"
            class="object-cover w-full h-64"
          >
          <div class="absolute top-4 right-4">
            <span class="block w-12 h-[3px] bg-brandGold" />
            <span class="block h-12 w-[3px] ml-auto bg-brandGold" />
          </div>

          <div class="relative pb-6">
            <div class="absolute left-0 px-6 py-4 bg-white shadow-md right-12 -top-8">
              <p class="text-xl font-semibold text-brandBlk">
                Residential Construction
              </p>
              <p class="mt-1 text-xs uppercase tracking-[0.25em] text-brandSilver1">
                Custom homes & remodels
              </p>
            </div>
          </div>
        </NuxtLink>

        <!-- Commercial -->
        <NuxtLink
          to="/commercial-construction"
          class="relative block group"
        >
          <img
            src="/images/commercial-Munis.jpg"
            alt="Commercial Construction"
            class="object-cover w-full h-64"
          >
          <div class="absolute top-4 right-4">
            <span class="block w-12 h-[3px] bg-brandGold" />
            <span class="block h-12 w-[3px] ml-auto bg-brandGold" />
          </div>

          <div class="relative pb-6">
            <div class="absolute left-0 px-6 py-4 bg-white shadow-md right-12 -top-8">
              <p class="text-xl font-semibold text-brandBlk">
                Commercial Construction
              </p>
              <p class="mt-1 text-xs uppercase tracking-[0.25em] text-brandSilver1">
                Offices, healthcare & public facilities
              </p>
            </div>
          </div>
        </NuxtLink>

        <!-- Multi-Family -->
        <NuxtLink
          to="/multi-family"
          class="relative block group"
        >
          <img
            src="/images/team/placeholder.jpg"
            alt="Multi-Family Construction"
            class="object-cover w-full h-64"
          >
          <div class="absolute top-4 right-4">
            <span class="block w-12 h-[3px] bg-brandGold" />
            <span class="block h-12 w-[3px] ml-auto bg-brandGold" />
          </div>

          <div class="relative pb-6">
            <div class="absolute left-0 px-6 py-4 bg-white shadow-md right-12 -top-8">
              <p class="text-xl font-semibold text-brandBlk">
                Multi-Family Construction
              </p>
              <p class="mt-1 text-xs uppercase tracking-[0.25em] text-brandSilver1">
                Apartments, townhomes & condos
              </p>
            </div>
          </div>
        </NuxtLink>

        <!-- Excavation -->
        <NuxtLink
          to="/excavation"
          class="relative block group"
        >
          <img
            src="/images/team/placeholder.jpg"
            alt="Excavation Services"
            class="object-cover w-full h-64"
          >
          <div class="absolute top-4 right-4">
            <span class="block w-12 h-[3px] bg-brandGold" />
            <span class="block h-12 w-[3px] ml-auto bg-brandGold" />
          </div>

          <div class="relative pb-6">
            <div class="absolute left-0 px-6 py-4 bg-white shadow-md right-12 -top-8">
              <p class="text-xl font-semibold text-brandBlk">
                Excavation
              </p>
              <p class="mt-1 text-xs uppercase tracking-[0.25em] text-brandSilver1">
                Site prep, grading & underground utilities
              </p>
            </div>
          </div>
        </NuxtLink>

        <!-- Drywall -->
        <NuxtLink
          to="/drywall"
          class="relative block group"
        >
          <img
            src="/images/drywall.jpg"
            alt="Drywall Services"
            class="object-cover w-full h-64"
          >
          <div class="absolute top-4 right-4">
            <span class="block w-12 h-[3px] bg-brandGold" />
            <span class="block h-12 w-[3px] ml-auto bg-brandGold" />
          </div>

          <div class="relative pb-6">
            <div class="absolute left-0 px-6 py-4 bg-white shadow-md right-12 -top-8">
              <p class="text-xl font-semibold text-brandBlk">
                Drywall
              </p>
              <p class="mt-1 text-xs uppercase tracking-[0.25em] text-brandSilver1">
                Hanging & finish-ready installation
              </p>
            </div>
          </div>
        </NuxtLink>

        <!-- Roofing -->
        <NuxtLink
          to="/roofing-service"
          class="relative block group"
        >
          <img
            src="/images/roof.jpg"
            alt="Roofing Services"
            class="object-cover w-full h-64"
          >
          <div class="absolute top-4 right-4">
            <span class="block w-12 h-[3px] bg-brandGold" />
            <span class="block h-12 w-[3px] ml-auto bg-brandGold" />
          </div>

          <div class="relative pb-6">
            <div class="absolute left-0 px-6 py-4 bg-white shadow-md right-12 -top-8">
              <p class="text-xl font-semibold text-brandBlk">
                Roofing
              </p>
              <p class="mt-1 text-xs uppercase tracking-[0.25em] text-brandSilver1">
                Metal, membrane & shingle roofing
              </p>
            </div>
          </div>
        </NuxtLink>

        <!-- Crane -->
        <NuxtLink
          to="/crane-service"
          class="relative block group"
        >
          <img
            src="/images/groveRT600.jpg"
            alt="Crane Services"
            class="object-cover w-full h-64"
          >
          <div class="absolute top-4 right-4">
            <span class="block w-12 h-[3px] bg-brandGold" />
            <span class="block h-12 w-[3px] ml-auto bg-brandGold" />
          </div>

          <div class="relative pb-6">
            <div class="absolute left-0 px-6 py-4 bg-white shadow-md right-12 -top-8">
              <p class="text-xl font-semibold text-brandBlk">
                Crane Services
              </p>
              <p class="mt-1 text-xs uppercase tracking-[0.25em] text-brandSilver1">
                Hydraulic cranes & certified operators
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>