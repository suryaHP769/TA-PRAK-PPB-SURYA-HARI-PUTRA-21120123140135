import { useEffect, useState } from 'react'
import { useAppData } from '../context/AppDataContext'
import { LoadingState } from '../components/FeedbackStates'
import type { Profile } from '../types'

const agamaOptions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']

export const ProfilePage = () => {
  const { profile, loading, saveProfile } = useAppData()
  const [isEditing, setIsEditing] = useState(false)
  const [formState, setFormState] = useState<Partial<Profile>>({})
  const [saving, setSaving] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  useEffect(() => {
    if (profile) {
      setFormState(profile)
    }
  }, [profile])

  if (loading || !profile) {
    return <LoadingState label="Memuat profil..." />
  }

  const handleChange = (key: keyof Profile, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: key === 'umur' ? Number(value) || undefined : value }))
    if (key === 'avatar') {
      setUploadError(null)
    }
  }

  const convertFileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(new Error('Gagal membaca file'))
      reader.readAsDataURL(file)
    })

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setUploadError('File harus berupa gambar (PNG/JPG).')
      event.target.value = ''
      return
    }

    const MAX_SIZE = 2 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      setUploadError('Ukuran maksimal 2MB.')
      event.target.value = ''
      return
    }

    try {
      const dataUrl = await convertFileToDataUrl(file)
      setFormState((prev) => ({ ...prev, avatar: dataUrl }))
      setUploadError(null)
    } catch (error) {
      console.error(error)
      setUploadError('Tidak bisa memproses file, coba ulangi.')
    } finally {
      event.target.value = ''
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    await saveProfile(formState)
    setSaving(false)
    setIsEditing(false)
  }

  const avatarPreview = isEditing ? formState.avatar ?? profile.avatar : profile.avatar

  return (
    <div>
      <div className="page-header">
        <p className="page-title">Profil Pengguna</p>
        <p>Perbarui data diri agar rekomendasi habit lebih relevan.</p>
      </div>

      <div className="section-card profile-strip">
        <img src={avatarPreview} alt={profile.nama} />
        <div>
          <h2>{profile.nama}</h2>
          <p>{profile.bio}</p>
          <button type="button" className="btn-primary" onClick={() => setIsEditing((prev) => !prev)}>
            {isEditing ? 'Batal' : 'Edit Profil'}
          </button>
        </div>
      </div>

      {isEditing ? (
        <form className="section-card profile-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="nama">Nama lengkap</label>
            <input id="nama" value={formState.nama ?? ''} onChange={(e) => handleChange('nama', e.target.value)} required />
          </div>

          <div className="form-field">
            <label>Foto profil</label>
            <div className="avatar-upload">
              <img src={formState.avatar ?? profile.avatar} alt="Preview foto profil" />
              <div className="avatar-upload-controls">
                <label className="upload-button">
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} />
                  Unggah foto baru
                </label>
                <p className="upload-hint">PNG/JPG maksimal 2MB atau isi URL manual di bawah.</p>
                {uploadError ? <p className="upload-error">{uploadError}</p> : null}
              </div>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="avatar">URL foto profil</label>
            <input
              id="avatar"
              value={formState.avatar ?? ''}
              onChange={(e) => handleChange('avatar', e.target.value)}
              placeholder="https://"
            />
          </div>

          <div className="form-field">
            <label htmlFor="umur">Umur</label>
            <input
              id="umur"
              type="number"
              value={formState.umur ?? ''}
              onChange={(e) => handleChange('umur', e.target.value)}
              min={15}
              max={60}
            />
          </div>

          <div className="form-field">
            <label htmlFor="jurusan">Jurusan</label>
            <input id="jurusan" value={formState.jurusan ?? ''} onChange={(e) => handleChange('jurusan', e.target.value)} />
          </div>

          <div className="form-field">
            <label htmlFor="agama">Agama</label>
            <select id="agama" value={formState.agama ?? ''} onChange={(e) => handleChange('agama', e.target.value)}>
              <option value="">Pilih agama</option>
              {agamaOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="bio">Deskripsi singkat</label>
            <textarea id="bio" rows={3} value={formState.bio ?? ''} onChange={(e) => handleChange('bio', e.target.value)} />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan Profil'}
            </button>
            <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>
              Batal
            </button>
          </div>
        </form>
      ) : (
        <div className="section-card">
          <h2>Detail</h2>
          <p>Umur: {profile.umur ?? '-'} tahun</p>
          <p>Jurusan: {profile.jurusan ?? '-'}</p>
          <p>Agama: {profile.agama ?? '-'}</p>
          <p>Bio: {profile.bio ?? '-'}</p>
        </div>
      )}
    </div>
  )
}
