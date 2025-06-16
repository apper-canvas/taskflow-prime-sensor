import { Outlet } from 'react-router-dom'
import Header from '@/components/organisms/Header'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        {children || <Outlet />}
      </main>
    </div>
  )
}

export default Layout