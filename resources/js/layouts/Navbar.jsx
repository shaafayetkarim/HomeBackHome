"use client"

import { useState } from "react"
import { Link } from "@inertiajs/inertia-react"
import { Inertia } from "@inertiajs/inertia"
import { Menu, X, User } from "lucide-react"
import { usePage } from "@inertiajs/inertia-react"

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false)
  const { route } = usePage()

  const handleLogout = (e) => {
    e.preventDefault()
    Inertia.post(route("logout"))
  }

  return (
    <nav className="bg-[#B5E61D] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={route("dashboard")} className="flex items-center">
              <span className="text-gray-800 font-bold text-xl md:text-2xl">RideShare</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href={route("rides.index")}
                  className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md font-medium"
                >
                  Find Rides
                </Link>
                <Link
                  href={route("rides.create")}
                  className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md font-medium"
                >
                  Create Ride
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md font-medium">
                    <span className="mr-1">{user.name}</span>
                    <User size={18} />
                  </button>
                  <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                    <Link href={route("profile.edit")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link href={route("my-rides")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Rides
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href={route("login")}
                  className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md font-medium"
                >
                  Login
                </Link>
                <Link
                  href={route("register")}
                  className="bg-white text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-md font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-gray-600 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-3">
            {user ? (
              <>
                <Link
                  href={route("rides.index")}
                  className="block px-3 py-2 text-gray-800 hover:bg-white rounded-md font-medium"
                >
                  Find Rides
                </Link>
                <Link
                  href={route("rides.create")}
                  className="block px-3 py-2 text-gray-800 hover:bg-white rounded-md font-medium"
                >
                  Create Ride
                </Link>
                <Link
                  href={route("profile.edit")}
                  className="block px-3 py-2 text-gray-800 hover:bg-white rounded-md font-medium"
                >
                  Profile
                </Link>
                <Link
                  href={route("my-rides")}
                  className="block px-3 py-2 text-gray-800 hover:bg-white rounded-md font-medium"
                >
                  My Rides
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-gray-800 hover:bg-white rounded-md font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href={route("login")}
                  className="block px-3 py-2 text-gray-800 hover:bg-white rounded-md font-medium"
                >
                  Login
                </Link>
                <Link
                  href={route("register")}
                  className="block px-3 py-2 text-gray-800 hover:bg-white rounded-md font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

