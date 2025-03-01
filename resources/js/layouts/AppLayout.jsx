import { usePage } from "@inertiajs/inertia-react"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function AppLayout({ children, title }) {
  const { auth } = usePage().props

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar user={auth.user} />
      <main className="flex-grow">
        {title && (
          <div className="bg-[#B5E61D] py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
            </div>
          </div>
        )}
        <div className="container mx-auto px-4 py-6">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

