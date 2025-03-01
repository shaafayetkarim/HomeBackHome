import { Link, usePage } from "@inertiajs/inertia-react"
import AppLayout from "../layouts/AppLayout"
import { MapPin, Users, Plus, Search } from "lucide-react"

export default function Dashboard({ user, upcomingRides, nearbyRides }) {
  const { route } = usePage()
  return (
    <AppLayout title="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Upcoming Rides</h2>
                <Link href={route("my-rides")} className="text-[#B5E61D] hover:underline text-sm font-medium">
                  View All
                </Link>
              </div>

              {upcomingRides.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You don't have any upcoming rides.</p>
                  <Link
                    href={route("rides.create")}
                    className="inline-flex items-center px-4 py-2 bg-[#B5E61D] rounded-lg text-gray-800 font-medium hover:bg-[#a3d119]"
                  >
                    <Plus size={18} className="mr-2" />
                    Create a Ride
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingRides.map((ride) => (
                    <Link key={ride.id} href={route("rides.show", ride.id)}>
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition duration-150">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium">
                              {ride.isOwner ? "Your ride" : `Ride with ${ride.user.name}`}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {ride.date} at {ride.time}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              ride.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {ride.status === "pending" ? "Pending" : "Active"}
                          </span>
                        </div>

                        <div className="flex items-center text-sm">
                          <MapPin size={16} className="text-[#B5E61D] mr-1" />
                          <p className="truncate">
                            {ride.pickup_location} → {ride.dropoff_location}
                          </p>
                        </div>

                        <div className="flex items-center text-sm mt-2">
                          <Users size={16} className="text-[#B5E61D] mr-1" />
                          <p>
                            {ride.passengers_count}/{ride.max_passengers} Passengers
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Nearby Rides</h2>
                <Link href={route("rides.index")} className="text-[#B5E61D] hover:underline text-sm font-medium">
                  View All
                </Link>
              </div>

              {nearbyRides.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No nearby rides available at the moment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {nearbyRides.map((ride) => (
                    <Link key={ride.id} href={route("rides.show", ride.id)}>
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition duration-150">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium">Ride with {ride.user.name}</h3>
                            <p className="text-sm text-gray-500">
                              {ride.date} at {ride.time}
                            </p>
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

                        <div className="flex items-center text-sm">
                          <MapPin size={16} className="text-[#B5E61D] mr-1" />
                          <p className="truncate">
                            {ride.pickup_location} → {ride.dropoff_location}
                          </p>
                        </div>

                        <div className="flex items-center text-sm mt-2">
                          <Users size={16} className="text-[#B5E61D] mr-1" />
                          <p>
                            {ride.passengers_count}/{ride.max_passengers} Passengers
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href={route("rides.create")}
                  className="flex items-center p-3 bg-[#B5E61D] bg-opacity-20 rounded-lg hover:bg-opacity-30"
                >
                  <div className="bg-[#B5E61D] rounded-full p-2 mr-3">
                    <Plus size={20} className="text-gray-800" />
                  </div>
                  <div>
                    <span className="font-medium">Create a Ride</span>
                    <p className="text-sm text-gray-500">Share your journey with others</p>
                  </div>
                </Link>

                <Link
                  href={route("rides.index")}
                  className="flex items-center p-3 bg-[#B5E61D] bg-opacity-20 rounded-lg hover:bg-opacity-30"
                >
                  <div className="bg-[#B5E61D] rounded-full p-2 mr-3">
                    <Search size={20} className="text-gray-800" />
                  </div>
                  <div>
                    <span className="font-medium">Find a Ride</span>
                    <p className="text-sm text-gray-500">Browse available rides</p>
                  </div>
                </Link>

                <Link
                  href={route("profile.edit")}
                  className="flex items-center p-3 bg-[#B5E61D] bg-opacity-20 rounded-lg hover:bg-opacity-30"
                >
                  <div className="bg-[#B5E61D] rounded-full p-2 mr-3">
                    <Users size={20} className="text-gray-800" />
                  </div>
                  <div>
                    <span className="font-medium">Update Profile</span>
                    <p className="text-sm text-gray-500">Edit your information</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Your Profile</h2>
              {!user.home_address || !user.phone ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-700 text-sm">
                    Please complete your profile to get the most out of RideShare.
                  </p>
                  <Link
                    href={route("profile.edit")}
                    className="text-[#B5E61D] hover:underline text-sm font-medium mt-1 inline-block"
                  >
                    Complete Profile
                  </Link>
                </div>
              ) : null}

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>

                {user.phone && (
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                )}

                {user.home_address && (
                  <div>
                    <p className="text-sm text-gray-500">Home Address</p>
                    <p className="font-medium">{user.home_address}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

