"use client"

import { useState } from "react"
import { Link, usePage } from "@inertiajs/inertia-react"
import AppLayout from "../layouts/AppLayout"
import { MapPin, Calendar, Clock, Users } from "lucide-react"

export default function MyRides({ rides }) {
  const { route } = usePage()
  const [activeTab, setActiveTab] = useState("upcoming")

  const upcomingRides = rides.filter((ride) => ride.status === "pending" || ride.status === "active")

  const pastRides = rides.filter((ride) => ride.status === "completed" || ride.status === "cancelled")

  const displayRides = activeTab === "upcoming" ? upcomingRides : pastRides

  return (
    <AppLayout title="My Rides">
      <div className="mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 font-medium ${
              activeTab === "upcoming"
                ? "border-b-2 border-[#B5E61D] text-gray-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Upcoming Rides
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 font-medium ${
              activeTab === "past" ? "border-b-2 border-[#B5E61D] text-gray-800" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Past Rides
          </button>
        </div>
      </div>

      {displayRides.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-500 mb-4">
            {activeTab === "upcoming" ? "You don't have any upcoming rides." : "You don't have any past rides."}
          </div>
          {activeTab === "upcoming" && (
            <Link
              href={route("rides.create")}
              className="px-4 py-2 bg-[#B5E61D] rounded-lg text-gray-800 font-medium hover:bg-[#a3d119]"
            >
              Create a Ride
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {displayRides.map((ride) => (
            <Link key={ride.id} href={route("rides.show", ride.id)}>
              <div className="bg-white border rounded-lg p-5 hover:shadow-md transition duration-150">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      {ride.isOwner ? "Your ride" : `Ride with ${ride.user.name}`}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ride.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : ride.status === "active"
                              ? "bg-green-100 text-green-800"
                              : ride.status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {ride.status === "pending"
                          ? "Pending"
                          : ride.status === "active"
                            ? "Active"
                            : ride.status === "completed"
                              ? "Completed"
                              : "Cancelled"}
                      </span>

                      {!ride.isOwner && (
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
                      )}
                    </div>
                  </div>

                  <div className="mt-3 md:mt-0 flex items-center">
                    <Calendar size={18} className="text-[#B5E61D] mr-2" />
                    <span>{ride.date}</span>
                    <Clock size={18} className="text-[#B5E61D] ml-4 mr-2" />
                    <span>{ride.time}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                </div>

                <div className="flex items-center">
                  <Users size={18} className="text-[#B5E61D] mr-2" />
                  <p className="font-medium">
                    {ride.passengers_count}/{ride.max_passengers} Passengers
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppLayout>
  )
}

