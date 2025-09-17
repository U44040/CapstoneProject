import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './globals.css'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

export const metadata = {
  title: 'Issue Tracker System',
  description: 'Sistema modular de seguimiento de problemas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}