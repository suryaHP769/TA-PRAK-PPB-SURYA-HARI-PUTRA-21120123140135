import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppDataProvider } from './context/AppDataContext'
import { AppLayout } from './components/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { ProfilePage } from './pages/ProfilePage'
import {
  DrinkDetailPage,
  DrinkListPage,
  FoodDetailPage,
  FoodListPage,
  SportDetailPage,
  SportListPage
} from './pages/CatalogPages'
import { MotivationDetailPage, MotivationListPage } from './pages/MotivationPages'
import { ErrorState } from './components/FeedbackStates'

function App() {
  return (
    <BrowserRouter>
      <AppDataProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/profil" element={<ProfilePage />} />
            <Route path="/makanan" element={<FoodListPage />} />
            <Route path="/makanan/:id" element={<FoodDetailPage />} />
            <Route path="/minuman" element={<DrinkListPage />} />
            <Route path="/minuman/:id" element={<DrinkDetailPage />} />
            <Route path="/olahraga" element={<SportListPage />} />
            <Route path="/olahraga/:id" element={<SportDetailPage />} />
            <Route path="/motivasi" element={<MotivationListPage />} />
            <Route path="/motivasi/:id" element={<MotivationDetailPage />} />
            <Route path="*" element={<ErrorState message="Halaman tidak ditemukan" />} />
          </Route>
        </Routes>
      </AppDataProvider>
    </BrowserRouter>
  )
}

export default App
