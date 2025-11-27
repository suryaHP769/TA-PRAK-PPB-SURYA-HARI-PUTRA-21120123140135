import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { ErrorState, LoadingState } from '../components/FeedbackStates'
import type { MotivationItem } from '../types'

export const MotivationListPage = () => {
  const { data, loading, error, refetch } = useFetch<MotivationItem[]>('/motivations')

  if (loading) return <LoadingState label="Memuat katalog motivasi..." />
  if (error || !data) return <ErrorState message={error ?? 'Data motivasi tidak ditemukan'} onRetry={refetch} />

  return (
    <div>
      <div className="page-header">
        <p className="page-title">Motivasi Sehari-hari</p>
        <p>Quote singkat yang bisa kamu baca sebelum memulai aktivitas kampus.</p>
      </div>
      <div className="catalog-grid">
        {data.map((item) => (
          <Link key={item.id} to={`/motivasi/${item.id}`} className="catalog-card">
            <div className="content">
              <span className="label">{item.ikon} {item.kategori}</span>
              <strong>{item.judul}</strong>
              <p>{item.deskripsi}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const MotivationDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <ErrorState message="ID motivasi tidak valid" />
  }

  const { data, loading, error, refetch } = useFetch<MotivationItem>(`/motivations/${id}`)

  if (loading) return <LoadingState label="Memuat detail motivasi..." />
  if (error || !data) return <ErrorState message={error ?? 'Detail tidak tersedia'} onRetry={refetch} />

  return (
    <div className="section-card detail-card">
      <span className="badge">
        {data.ikon} {data.kategori}
      </span>
      <h2>{data.judul}</h2>
      <p>{data.deskripsi}</p>
      <blockquote>
        <em>{data.kutipan}</em>
      </blockquote>
      <p className="app-subtitle">Sumber: {data.sumber}</p>
      <p>
        <Link to="/motivasi">Kembali ke daftar motivasi</Link>
      </p>
    </div>
  )
}
