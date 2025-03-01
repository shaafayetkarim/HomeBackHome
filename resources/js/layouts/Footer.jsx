import { Link } from "@inertiajs/inertia-react"
import { usePage } from "@inertiajs/inertia-react"

export default function Footer() {
  const { route } = usePage()
  return (
    <footer className="bg-[#B5E61D] py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-gray-800 font-bold text-xl">RideShare</span>
            <p className="text-gray-700 mt-2">Safe rides for university students</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link href={route("about")} className="text-gray-800 hover:text-gray-600">
              About
            </Link>
            <Link href={route("privacy")} className="text-gray-800 hover:text-gray-600">
              Privacy Policy
            </Link>
            <Link href={route("terms")} className="text-gray-800 hover:text-gray-600">
              Terms of Service
            </Link>
            <Link href={route("contact")} className="text-gray-800 hover:text-gray-600">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-700">
          <p>&copy; {new Date().getFullYear()} RideShare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

