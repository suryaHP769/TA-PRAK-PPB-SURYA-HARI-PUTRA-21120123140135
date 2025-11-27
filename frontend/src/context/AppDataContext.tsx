import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { apiClient } from '../api/client'
import type { ChecklistStatus, DashboardToday, DayChecklist, Profile } from '../types'
import type { ReactNode } from 'react'

type AppDataContextValue = {
  profile: Profile | null
  dashboard: DashboardToday | null
  loading: boolean
  refreshProfile: () => void
  refreshDashboard: () => void
  saveProfile: (payload: Partial<Profile>) => Promise<void>
  updateChecklist: (payload: Partial<ChecklistStatus>, tanggal?: string) => Promise<DayChecklist>
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined)

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [dashboard, setDashboard] = useState<DashboardToday | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = useCallback(() => {
    apiClient
      .get<Profile>('/profile')
      .then(setProfile)
      .catch(console.error)
  }, [])

  const refreshDashboard = useCallback(() => {
    apiClient
      .get<DashboardToday>('/dashboard/today')
      .then(setDashboard)
      .catch(console.error)
  }, [])

  useEffect(() => {
    Promise.all([apiClient.get<Profile>('/profile'), apiClient.get<DashboardToday>('/dashboard/today')])
      .then(([profileRes, dashboardRes]) => {
        setProfile(profileRes)
        setDashboard(dashboardRes)
      })
      .finally(() => setLoading(false))
  }, [])

  const saveProfile = async (payload: Partial<Profile>) => {
    const updated = await apiClient.put<Profile, Partial<Profile>>('/profile', payload)
    setProfile(updated)
    setDashboard((prev) => (prev ? { ...prev, nama: updated.nama } : prev))
  }

  const updateChecklist = async (payload: Partial<ChecklistStatus>, tanggal?: string) => {
    const updatedDay = await apiClient.post<DayChecklist, { tanggal?: string; checklist: Partial<ChecklistStatus> }>(
      '/dashboard/checkin',
      {
        tanggal,
        checklist: payload
      }
    )

    setDashboard((prev) => {
      if (!prev || prev.tanggal !== updatedDay.tanggal) {
        return prev
      }
      return {
        ...prev,
        checklist: { ...updatedDay.checklist },
        habitSelesai: updatedDay.habitSelesai
      }
    })

    return updatedDay
  }

  return (
    <AppDataContext.Provider
      value={{ profile, dashboard, loading, refreshProfile, refreshDashboard, saveProfile, updateChecklist }}
    >
      {children}
    </AppDataContext.Provider>
  )
}

export const useAppData = () => {
  const context = useContext(AppDataContext)
  if (!context) {
    throw new Error('useAppData harus dipakai di dalam AppDataProvider')
  }
  return context
}
