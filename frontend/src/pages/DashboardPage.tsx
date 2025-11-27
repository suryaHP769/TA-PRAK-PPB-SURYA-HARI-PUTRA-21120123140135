import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppData } from '../context/AppDataContext'
import { useFetch } from '../hooks/useFetch'
import { LoadingState } from '../components/FeedbackStates'
import type { CatalogItem, MotivationItem, SportItem } from '../types'

export const DashboardPage = () => {
  const { profile, dashboard, loading } = useAppData()
  const { data: foodData, loading: foodLoading } = useFetch<CatalogItem[]>('/foods')
  const { data: drinkData, loading: drinkLoading } = useFetch<CatalogItem[]>('/drinks')
  const { data: sportData, loading: sportLoading } = useFetch<SportItem[]>('/sports')
  const { data: motivationData, loading: motivationLoading } = useFetch<MotivationItem[]>('/motivations')

  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 11) return 'Selamat pagi'
    if (hour < 15) return 'Selamat siang'
    if (hour < 19) return 'Selamat sore'
    return 'Selamat malam'
  }, [])

  if (loading || !profile || !dashboard) {
    return <LoadingState label="Memuat dashboard..." />
  }

  return (
    <div>
      <div className="section-card">
        <div className="profile-strip">
          <img src={profile.avatar} alt={profile.nama} />
          <div>
            <p className="page-title">
              {greeting}, {dashboard.nama}!
            </p>
            <p>Mari jaga habit sehatmu hari ini.</p>
          </div>
        </div>
      </div>

      <div className="section-card">
        <h2>Rekomendasi Hari Ini</h2>
        <p>{dashboard.rekomendasi}</p>
      </div>

      <ResourceShowcase
        title="Sorotan Makanan Sehat"
        subtitle="Ide menu padat nutrisi untuk energi kuliah."
        items={foodData ?? undefined}
        loading={foodLoading}
        basePath="/foods"
      />

      <ResourceShowcase
        title="Minuman Favorit Mahasiswa"
        subtitle="Hidrasi tanpa gula berlebih. Coba 3 resep ini."
        items={drinkData ?? undefined}
        loading={drinkLoading}
        basePath="/drinks"
      />

      <ResourceShowcase
        title="Gerakan Sehat Pekan Ini"
        subtitle="Latihan ringkas yang cocok di kamar kos."
        items={sportData ?? undefined}
        loading={sportLoading}
        basePath="/sports"
        badgeExtractor={(item) => `Tingkat: ${(item as SportItem).tingkat}`}
      />

      <MotivationShowcase items={motivationData ?? undefined} loading={motivationLoading} />
    </div>
  )
}

type ResourceShowcaseProps = {
  title: string
  subtitle: string
  items?: CatalogItem[]
  loading: boolean
  basePath: string
  badgeExtractor?: (item: CatalogItem) => string | null
}

const ResourceShowcase = ({ title, subtitle, items = [], loading, basePath, badgeExtractor }: ResourceShowcaseProps) => {
  return (
    <div className="section-card home-section">
      <div className="home-section-header">
        <div>
          <h2>{title}</h2>
          <p className="app-subtitle">{subtitle}</p>
        </div>
        <Link to={basePath} className="btn-secondary compact">
          Lihat semua
        </Link>
      </div>
      {loading ? (
        <p className="app-subtitle">Memuat rekomendasi...</p>
      ) : items.length ? (
        <div className="home-resource-grid">
          {items.slice(0, 3).map((item) => (
            <Link key={item.id} to={`${basePath}/${item.id}`} className="home-card">
              <img src={item.gambar} alt={item.nama} loading="lazy" />
              <div className="home-card-body">
                {badgeExtractor ? <span className="badge">{badgeExtractor(item)}</span> : null}
                <strong>{item.nama}</strong>
                <p>{item.deskripsiSingkat}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="app-subtitle">Belum ada data.</p>
      )}
    </div>
  )
}

const MotivationShowcase = ({ items = [], loading }: { items?: MotivationItem[]; loading: boolean }) => (
  <div className="section-card home-section">
    <div className="home-section-header">
      <div>
        <h2>Motivasi Terbaru</h2>
        <p className="app-subtitle">Pilih kutipan untuk menemani perjalanan habit sehatmu.</p>
      </div>
      <Link to="/motivasi" className="btn-secondary compact">
        Baca lainnya
      </Link>
    </div>
    {loading ? (
      <p className="app-subtitle">Memuat motivasi...</p>
    ) : items.length ? (
      <div className="motivation-stack">
        {items.slice(0, 3).map((item) => (
          <article key={item.id} className="motivation-card">
            <header>
              <span className="badge">{item.kategori}</span>
              <strong>{item.judul}</strong>
            </header>
            <p>{item.deskripsi}</p>
            <blockquote>
              <p>{item.kutipan}</p>
              <cite>{item.sumber}</cite>
            </blockquote>
          </article>
        ))}
      </div>
    ) : (
      <p className="app-subtitle">Belum ada motivasi.</p>
    )}
  </div>
)
