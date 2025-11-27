const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4100/api'
const REQUEST_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT ?? 8000)

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      ...options
    })

    if (!response.ok) {
      const message = await response.text()
      throw new Error(message || 'Terjadi kesalahan pada server')
    }

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Permintaan ke server terlalu lama. Coba ulang beberapa saat lagi.')
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T, B = unknown>(path: string, body: B) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T, B = unknown>(path: string, body: B) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) })
}
