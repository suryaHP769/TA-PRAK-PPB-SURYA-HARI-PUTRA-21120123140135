import { useCallback, useEffect, useState } from 'react'
import { apiClient } from '../api/client'

interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useFetch = <T>(path: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)
    apiClient
      .get<T>(path)
      .then((result) => setData(result))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [path])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
