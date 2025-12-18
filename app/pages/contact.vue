<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

// Zod Documentation: https://zod.dev/?id=strings

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string({
      required_error: 'Email is required',
    }).min(1, { message: 'Email is required' }).email({ message: 'Must be a valid email' }),
    name: zod.string({
      required_error: 'Name is required',
    }).min(1, { message: 'Name is required' }),
    phone: zod.string({
      required_error: 'Phone is required',
    }).min(14, { message: 'Valid phone # required' }),
    message: zod.string({
      required_error: 'Message is required',
    }).min(1, { message: 'Message is required' }),
  }),
)
</script>

<template>
  <Head>
    <Title>Contact | Golden Eagle Construction | Montana</Title>
    <Meta
      name="description"
      content="Get in touch with Golden Eagle Construction in Helena or Bozeman, Montana for residential, commercial, and multi-family construction projects."
    />
    <Link rel="canonical" href="https://geconstruction.com/contact/" />
  </Head>

  <div
    class="bg-fixed bg-cover"
    style="background-image: url('/images/texture.png')"
  >
    <titleSection headline="Contact Us" />

    <!-- MAIN CONTENT -->
    <section class="py-24 bg-white/95">
      <div class="container px-6 mx-auto">
        <div class="grid gap-16 lg:grid-cols-3">
          <!-- FORM COLUMN (2/3) -->
          <div class="lg:col-span-2">
            <h2 class="mb-6 text-2xl font-semibold tracking-[0.2em] uppercase text-brandGold">
              Contact Details
            </h2>

            <form
              id="contact_form"
              method="post"
              class="space-y-6"
            >
              <div class="grid gap-6 md:grid-cols-2">
                <!-- Name (full width on md+) -->
                <div class="md:col-span-2">
                  <label for="name" class="block mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-brandBlue1">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    class="w-full px-4 py-3 text-sm border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brandGold focus:border-brandGold"
                    required
                  >
                </div>

                <!-- Phone -->
                <div>
                  <label for="phone" class="block mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-brandBlue1">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    class="w-full px-4 py-3 text-sm border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brandGold focus:border-brandGold"
                  >
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-brandBlue1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    class="w-full px-4 py-3 text-sm border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brandGold focus:border-brandGold"
                    required
                  >
                </div>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-brandBlue1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="7"
                  placeholder="Message..."
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-none resize-y focus:outline-none focus:ring-2 focus:ring-brandGold focus:border-brandGold"
                  required
                />
              </div>

              <!-- Submit + alert -->
              <div class="flex flex-col items-start gap-4 md:flex-row md:items-center">
                <button
                  type="submit"
                  class="px-8 py-3 text-sm font-bold tracking-[0.25em] uppercase bg-brandGold text-white hover:bg-brandGold/90 transition"
                >
                  Send Message
                </button>

                <div id="alert" class="text-sm text-brandSilver1" />
              </div>
            </form>
          </div>

          <!-- INFO COLUMN (1/3) -->
          <aside class="space-y-8">
            <div>
              <h3 class="mb-4 text-lg font-semibold text-brandBlue1">
                Contact Info
              </h3>

              <!-- Helena -->
              <div class="mb-6">
                <h4 class="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brandGold">
                  Helena, Montana
                </h4>
                <ul class="space-y-1 text-sm leading-relaxed">
                  <li class="flex items-start gap-3">
                    <span class="mt-0.5">
                      <i class="fas fa-map-marker-alt" />
                    </span>
                    <span>
                      505 Shephard Way<br>
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
              </div>

              <hr class="border-gray-200">

              <!-- Bozeman -->
              <div class="mt-6">
                <h4 class="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brandGold">
                  Bozeman, Montana
                </h4>
                <ul class="space-y-1 text-sm leading-relaxed">
                  <li class="flex items-start gap-3">
                    <span class="mt-0.5">
                      <i class="fas fa-map-marker-alt" />
                    </span>
                    <span>
                      7585 Shedhorn Dr<br>
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

              <hr class="my-6 border-gray-200">

              <!-- Social -->
              <ul class="flex items-center gap-4">
                <li>
                  <a
                    href="https://www.facebook.com/Goldeneagleconstruction479204082113682?fref=ts"
                    target="_blank"
                    aria-label="Facebook"
                    class="text-xl text-brandBlue1 hover:text-brandGold"
                  >
                    <i class="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/golden-eagle-construction-inc-?trk=top_nav_home"
                    target="_blank"
                    aria-label="LinkedIn"
                    class="text-xl text-brandBlue1 hover:text-brandGold"
                  >
                    <i class="fab fa-linkedin-in" />
                  </a>
                </li>
              </ul>
            </div>

            <hr class="border-gray-200">

            <!-- Join our team -->
            <div>
              <h3 class="mb-3 text-lg font-semibold text-brandBlue1">
                Join Our Team
              </h3>
              <p class="text-sm leading-6 text-brandSilver1">
                Would you like to join our team? Tell us about yourself.
                Please
                <a
                  href="/Employment-application.pdf"
                  target="_blank"
                  class="underline text-brandGold hover:text-brandGold/90"
                >
                  download
                </a>
                and email an application to
                <a
                  href="mailto:careers@geconstruction.com"
                  class="underline text-brandGold hover:text-brandGold/90"
                >
                  careers@geconstruction.com
                </a>.
              </p>

              <p class="mt-4">
                <a
                  href="/Employment-application.pdf"
                  target="_blank"
                  class="inline-block px-6 py-3 text-xs font-bold tracking-[0.25em] uppercase bg-brandGold text-white hover:bg-brandGold/90 transition"
                >
                  Download Application
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>