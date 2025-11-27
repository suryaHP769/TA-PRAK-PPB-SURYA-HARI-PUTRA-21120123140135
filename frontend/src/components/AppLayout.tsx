import { Outlet } from 'react-router-dom'
import { BottomNavigation } from './BottomNavigation'

export const AppLayout = () => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="badge">Habit Harian</span>
        <h1 className="app-title">Informasi Habit Mahasiswa Sehat</h1>
        <p className="app-subtitle">Pantau kebiasaan sehat dan temukan ide makanan, minuman, olahraga, serta motivasi harian.</p>
      </header>
      <main>
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  )
}
