import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition)
      return savedPosition

    const isPortfolio = (p: string) =>
      p === '/portfolio' || p.startsWith('/portfolio/')

    if (isPortfolio(to.path) && isPortfolio(from.path)) {
      return false
    }

    return { left: 0, top: 0 }
  },
}