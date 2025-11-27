import { useEffect, useState, type MouseEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { ErrorState, LoadingState } from '../components/FeedbackStates'
import type { CatalogItem, ResourceType, SportItem } from '../types'

interface CatalogConfig {
  resource: ResourceType
  title: string
  intro: string
  detailLabel: string
  enableQuickView?: boolean
}

const catalogConfigs: Record<ResourceType, CatalogConfig> = {
  foods: {
    resource: 'foods',
    title: 'Makanan Sehat',
    intro: 'Ide makanan bernutrisi tinggi untuk bantu fokus kuliah.',
    detailLabel: 'Kualitas gizi',
    enableQuickView: true
  },
  drinks: {
    resource: 'drinks',
    title: 'Minuman Sehat',
    intro: 'Pilihan minuman tanpa gula berlebih untuk hidrasi optimal.',
    detailLabel: 'Manfaat utama',
    enableQuickView: true
  },
  sports: {
    resource: 'sports',
    title: 'Olahraga Sehat',
    intro: 'Gerakan sederhana yang bisa dilakukan di kos atau kampus.',
    detailLabel: 'Durasi/tingkat',
    enableQuickView: true
  }
}

const CatalogListFactory = ({ resource, title, intro, detailLabel, enableQuickView }: CatalogConfig) => () => {
  const enableImagePopup = Boolean(enableQuickView)
  const { data, loading, error, refetch } = useFetch<CatalogItem[]>(`/${resource}`)
  const [quickViewItem, setQuickViewItem] = useState<CatalogItem | null>(null)

  useEffect(() => {
    if (!enableImagePopup || !quickViewItem) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setQuickViewItem(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enableImagePopup, quickViewItem])

  const handleImageClick = (event: MouseEvent<HTMLButtonElement>, item: CatalogItem) => {
    if (!enableImagePopup) return
    event.preventDefault()
    event.stopPropagation()
    setQuickViewItem(item)
  }

  const closeQuickView = () => setQuickViewItem(null)

  if (loading) return <LoadingState label="Memuat katalog..." />
  if (error || !data) return <ErrorState message={error ?? 'Data tidak ditemukan'} onRetry={refetch} />

  return (
    <div>
      <div className="page-header">
        <p className="page-title">{title}</p>
        <p>{intro}</p>
      </div>
      <div className="catalog-grid">
        {data.map((item) => (
          <Link key={item.id} to={`/${resource}/${item.id}`} className="catalog-card">
            {enableImagePopup ? (
              <button
                type="button"
                className="catalog-card-image"
                onClick={(event) => handleImageClick(event, item)}
              >
                <img src={item.gambar} alt={item.nama} loading="lazy" />
                <span className="image-hint">Lihat info singkat</span>
              </button>
            ) : (
              <img src={item.gambar} alt={item.nama} loading="lazy" />
            )}
            <div className="content">
              <span className="label">{detailLabel}</span>
              <strong>{item.nama}</strong>
              <p>{item.deskripsiSingkat}</p>
            </div>
          </Link>
        ))}
      </div>
      {enableImagePopup && quickViewItem ? (
        <div
          className="quickview-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Info singkat ${quickViewItem.nama}`}
          onClick={closeQuickView}
        >
          <div className="quickview-card" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="quickview-close" onClick={closeQuickView} aria-label="Tutup info">
              &times;
            </button>
            <img src={quickViewItem.gambar} alt={quickViewItem.nama} loading="lazy" />
            <div className="quickview-body">
              <span className="label">Info singkat</span>
              <h3>{quickViewItem.nama}</h3>
              <p>{quickViewItem.deskripsiSingkat}</p>
              <p className="quickview-detail">{quickViewItem.deskripsi}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

const CatalogDetailFactory = ({ resource, title }: CatalogConfig) => () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <ErrorState message="ID item tidak valid" />
  }

  const { data, loading, error, refetch } = useFetch<CatalogItem | SportItem>(`/${resource}/${id}`)

  if (loading) return <LoadingState label="Memuat detail..." />
  if (error || !data) return <ErrorState message={error ?? 'Detail tidak ditemukan'} onRetry={refetch} />

  const backPath = `/${resource}`
  const sportInfo = resource === 'sports' ? (data as SportItem).tingkat : undefined

  return (
    <div>
      <button type="button" className="btn-secondary" onClick={() => window.history.back()}>
        Kembali
      </button>
      <div className="page-header">
        <p className="page-title">{title}</p>
        <p>Detail pilihan #{id}</p>
      </div>
      <div className="section-card detail-card">
        <img src={data.gambar} alt={data.nama} />
        <h2>{data.nama}</h2>
        <p>{data.deskripsi}</p>
        {sportInfo ? <span className="badge">Tingkat: {sportInfo}</span> : null}
        <p>
          <Link to={backPath}>Kembali ke daftar {title.toLowerCase()}</Link>
        </p>
      </div>
    </div>
  )
}

export const FoodListPage = CatalogListFactory(catalogConfigs.foods)
export const FoodDetailPage = CatalogDetailFactory(catalogConfigs.foods)

export const DrinkListPage = CatalogListFactory(catalogConfigs.drinks)
export const DrinkDetailPage = CatalogDetailFactory(catalogConfigs.drinks)

export const SportListPage = CatalogListFactory(catalogConfigs.sports)
export const SportDetailPage = CatalogDetailFactory(catalogConfigs.sports)
