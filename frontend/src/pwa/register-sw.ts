const isLocalhost = () => {
  const host = window.location.hostname
  return host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')
}

const cleanDevRegistrations = () => {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister())
  })
}

export const registerServiceWorker = () => {
  if (!('serviceWorker' in navigator)) {
    return
  }

  if (import.meta.env.DEV || isLocalhost()) {
    cleanDevRegistrations()
    return
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .then((registration) => {
        registration.update()
      })
      .catch((err) => console.error('Gagal daftar service worker', err))
  })
}
