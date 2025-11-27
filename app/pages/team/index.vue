<template>
  <Head>
    <Title>About Golden Eagle Construction | Montana</Title>
    <Meta name="description" content="Founded in 1986 and owned by company president, Adam Senechal, since 2012, Golden Eagle Construction provides high-quality commercial construction and residential construction services. " />
    <Link rel="canonical" href="https://geconstruction.com/about/" />
  </Head>

  <section class="bg-fixed bg-cover page-hero" style="background-image: url(/images/title-1.jpg);">
    <div class="container relative z-50 px-6 mx-auto ">
      <div class="py-32 text-center">
        <h1 class="text-4xl font-bold leading-10 lg:text-7xl text-brandBlue1 font-sansAccent2">
          Golden Eagle Construction Team
        </h1>
      </div>
    </div>
  </section>

  <section class="bg-brandSilver2/10">
    <div class="container px-6 py-20 mx-auto">
      <div class="text-center">
        <div class="mb-12 text-4xl font-bold leading-10 text-brandBlue1">
          Meet Our Leadership Team
        </div>
      </div>

      <teamCard team="leadership" />
    </div>
    <div class="container px-6 py-20 mx-auto">
      <div class="text-center">
        <div class="mb-12 text-4xl font-bold leading-10 text-brandBlue1">
          Meet Our Office Team
        </div>
      </div>

      <teamCard team="office" />
    </div>
  </section>
</template>
