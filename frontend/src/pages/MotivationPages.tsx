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
      <section className="section-card motivation-hero">
        <p className="eyebrow">Papan Semangat</p>
        <h2>Motivasi singkat untuk menemani perjalanan kamu di kampus.</h2>
      </section>

      <section className="motivation-board" aria-label="Daftar motivasi modern">
        {data.map((item) => (
          <Link
            key={item.id}
            to={`/motivasi/${item.id}`}
            className="motivation-card modern"
            aria-label={`Baca motivasi ${item.judul}`}
          >
            <header>
              <span className="chip">
                {item.ikon} {item.kategori}
              </span>
              <h3>{item.judul}</h3>
            </header>
            <p className="summary">{item.deskripsi}</p>
            <p className="mini-quote">
              &ldquo;{item.kutipan}&rdquo;
            </p>
            <span className="card-link">Baca selengkapnya →</span>
          </Link>
        ))}
      </section>
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
    <div className="motivation-detail section-card">
      <div className="detail-meta">
        <span className="chip accent">
          {data.ikon} {data.kategori}
        </span>
        <span className="source-label">Sumber: {data.sumber}</span>
      </div>
      <h2>{data.judul}</h2>
      <p className="summary">{data.deskripsi}</p>
      <blockquote>
        <p>
          &ldquo;{data.kutipan}&rdquo;
        </p>
      </blockquote>
      <Link to="/motivasi" className="btn-secondary compact">
        Kembali ke daftar
      </Link>
    </div>
  )
}
