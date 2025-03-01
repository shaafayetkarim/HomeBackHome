"use client"

import { useState } from "react"
import { Link, usePage } from "@inertiajs/inertia-react"
import AppLayout from "../../layouts/AppLayout"
import { MapPin, Calendar, Clock, Users, Filter } from "lucide-react"

export default function RidesList({ rides }) {
  const { route } = usePage()
  const [filters, setFilters] = useState({
    gender_preference: "",
    date: "",
  })

  const [showFilters, setShowFilters] = useState(false)

  const filteredRides = rides.filter((ride) => {
    if (filters.gender_preference && ride.gender_preference !== filters.gender_preference) {
      return false
    }
    if (filters.date && ride.date !== filters.date) {
      return false
    }
    return true
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      gender_preference: "",
      date: "",
    })
  }

  return (
    <AppLayout title="Find Rides">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <p className="text-gray-600">Find and join rides that match your route and preferences.</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>
          <Link
            href={route("rides.create")}
            className="px-4 py-2 bg-[#B5E61D] rounded-lg text-gray-800 font-medium hover:bg-[#a3d119]"
          >
            Create Ride
          </Link>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="gender_preference" className="block text-sm font-medium text-gray-700 mb-1">
                Gender Preference
              </label>
              <select
                id="gender_preference"
                name="gender_preference"
                value={filters.gender_preference}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
              >
                <option value="">Any</option>
                <option value="mixed">Mixed</option>
                <option value="female_only">Girls Only</option>
                <option value="male_only">Boys Only</option>
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
              />
            </div>
            <div className="flex items-end">
              <button onClick={clearFilters} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredRides.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-500 mb-4">No rides found matching your criteria.</div>
          <Link
            href={route("rides.create")}
            className="px-4 py-2 bg-[#B5E61D] rounded-lg text-gray-800 font-medium hover:bg-[#a3d119]"
          >
            Create a Ride Request
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRides.map((ride) => (
            <div key={ride.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{ride.user.name}</h3>
                    <p className="text-gray-500 text-sm">{ride.user.university}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ride.gender_preference === "female_only"
                        ? "bg-pink-100 text-pink-800"
                        : ride.gender_preference === "male_only"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {ride.gender_preference === "female_only"
                      ? "Girls Only"
                      : ride.gender_preference === "male_only"
                        ? "Boys Only"
                        : "Mixed"}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <MapPin size={18} className="text-[#B5E61D] mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-medium">{ride.pickup_location}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin size={18} className="text-[#B5E61D] mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-medium">{ride.dropoff_location}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar size={18} className="text-[#B5E61D] mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{ride.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock size={18} className="text-[#B5E61D] mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{ride.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Users size={18} className="text-[#B5E61D] mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">
                        {ride.passengers_count}/{ride.max_passengers} Passengers
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    href={route("rides.show", ride.id)}
                    className="w-full block text-center px-4 py-2 bg-[#B5E61D] rounded-lg text-gray-800 font-medium hover:bg-[#a3d119]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  )
}

