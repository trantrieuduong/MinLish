import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AdminSidebar from '../components/AdminSidebar/AdminSidebar'
import AdminHeader from '../components/AdminHeader/AdminHeader'
import './AdminLayout.css'

function AdminLayout({ children, currentPath, onNavigate }) {
  const { t } = useTranslation()
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('admin_sidebar_collapsed') === 'true'
  })

  const handleToggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev
      localStorage.setItem('admin_sidebar_collapsed', String(next))
      return next
    })
  }

  return (
    <div className={`admin-layout ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar
        currentPath={currentPath}
        onNavigate={onNavigate}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />
      <div className="admin-layout-main">
        <AdminHeader onNavigate={onNavigate} />
        <div className="admin-layout-content">
          {children}
        </div>
        <footer className="admin-layout-footer">
          <span className="admin-footer-copyright">
            © 2026 MinLish Admin. All rights reserved.
          </span>
          <div className="admin-footer-links">
            <a href="/privacy" onClick={(e) => e.preventDefault()}>{t('footer.privacy')}</a>
            <a href="/terms" onClick={(e) => e.preventDefault()}>{t('footer.terms')}</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default AdminLayout
