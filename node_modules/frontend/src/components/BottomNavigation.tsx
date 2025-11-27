import { NavLink } from 'react-router-dom'
import { FiActivity, FiDroplet, FiHome, FiSun, FiUser } from 'react-icons/fi'
import { LuSalad } from 'react-icons/lu'

const navItems = [
  { label: 'Beranda', path: '/', icon: FiHome, end: true },
  { label: 'Makanan', path: '/makanan', icon: LuSalad },
  { label: 'Minuman', path: '/minuman', icon: FiDroplet },
  { label: 'Olahraga', path: '/olahraga', icon: FiActivity },
  { label: 'Motivasi', path: '/motivasi', icon: FiSun },
  { label: 'Profil', path: '/profil', icon: FiUser }
]

export const BottomNavigation = () => {
  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      {navItems.map(({ label, path, icon: Icon, end }) => (
        <NavLink key={path} to={path} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end={end}>
          <Icon aria-hidden />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
