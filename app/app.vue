<script setup>
import { useHead } from '#imports'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://geconstruction.com/#organization',
      'name': 'Golden Eagle Construction',
      'legalName': 'Golden Eagle Construction, Inc.',
      'url': 'https://geconstruction.com/',
      'logo': 'https://geconstruction.com/images/logo.png',
      'image': 'https://geconstruction.com/images/og-image.jpg',
      'foundingDate': '1986',
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Construction Services',
        'itemListElement': [
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Custom Home Construction' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Commercial Construction' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Multi-Family Construction' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Excavation Services' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Drywall Installation' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Crane Services' } },
        ],
      },
      'sameAs': [
        'https://www.facebook.com/Goldeneagleconstruction',
        'https://www.linkedin.com/company/golden-eagle-construction-inc-',
        'https://www.houzz.com/pro/adamsenechal/golden-eagle-construction',
      ],
      'location': [
        { '@id': 'https://geconstruction.com/#helena-location' },
        { '@id': 'https://geconstruction.com/#bozeman-location' },
      ],
    },
    {
      '@type': ['LocalBusiness', 'GeneralContractor'],
      '@id': 'https://geconstruction.com/#helena-location',
      'name': 'Golden Eagle Construction',
      'parentOrganization': { '@id': 'https://geconstruction.com/#organization' },
      'url': 'https://geconstruction.com/contact/',
      'telephone': '+1-406-449-7228',
      'image': 'https://geconstruction.com/images/og-image.jpg',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '505 Shephard Way',
        'addressLocality': 'Helena',
        'addressRegion': 'MT',
        'postalCode': '59601',
        'addressCountry': 'US',
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Helena' },
        { '@type': 'AdministrativeArea', 'name': 'Southwestern Montana' },
        { '@type': 'City', 'name': 'Billings' },
      ],
    },
    {
      '@type': ['LocalBusiness', 'GeneralContractor'],
      '@id': 'https://geconstruction.com/#bozeman-location',
      'name': 'Golden Eagle Construction',
      'parentOrganization': { '@id': 'https://geconstruction.com/#organization' },
      'url': 'https://geconstruction.com/contact/',
      'telephone': '+1-406-595-6447',
      'image': 'https://geconstruction.com/images/og-image.jpg',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '7585 Shedhorn Dr',
        'addressLocality': 'Bozeman',
        'addressRegion': 'MT',
        'postalCode': '59718',
        'addressCountry': 'US',
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Bozeman' },
        { '@type': 'Place', 'name': 'Big Sky' },
        { '@type': 'AdministrativeArea', 'name': 'Southwestern Montana' },
        { '@type': 'City', 'name': 'Billings' },
      ],
    },
  ],
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationSchema),
    },
  ],
})
</script>

<template class="font-sans">
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
</style>
