import { useForm, usePage } from "@inertiajs/inertia-react"
import AppLayout from "../../layouts/AppLayout"
import { MapPin, Calendar, Clock, Users, User } from "lucide-react"

export default function RideDetails({ ride, isOwner, hasJoined }) {
  const { post, processing } = useForm()
  const { route } = usePage() // Added this line to get the route function

  const handleJoinRide = () => {
    post(route("rides.join", ride.id))
  }

  const handleLeaveRide = () => {
    post(route("rides.leave", ride.id))
  }

  const handleStartRide = () => {
    post(route("rides.start", ride.id))
  }

  const handleEndRide = () => {
    post(route("rides.end", ride.id))
  }

  return (
    <AppLayout title="Ride Details">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Ride with {ride.user.name}</h2>
                <div className="flex items-center mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium mr-2 ${
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
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                </div>
              </div>

              {!isOwner && !hasJoined && ride.status === "pending" && (
                <button
                  onClick={handleJoinRide}
                  disabled={processing || ride.passengers_count >= ride.max_passengers}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    ride.passengers_count >= ride.max_passengers
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#B5E61D] text-gray-800 hover:bg-[#a3d119]"
                  }`}
                >
                  {ride.passengers_count >= ride.max_passengers ? "Ride Full" : "Join Ride"}
                </button>
              )}

              {!isOwner && hasJoined && ride.status === "pending" && (
                <button
                  onClick={handleLeaveRide}
                  disabled={processing}
                  className="px-6 py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200"
                >
                  Leave Ride
                </button>
              )}

              {isOwner && ride.status === "pending" && (
                <button
                  onClick={handleStartRide}
                  disabled={processing || ride.passengers_count === 0}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    ride.passengers_count === 0
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#B5E61D] text-gray-800 hover:bg-[#a3d119]"
                  }`}
                >
                  Start Ride
                </button>
              )}

              {isOwner && ride.status === "active" && (
                <button
                  onClick={handleEndRide}
                  disabled={processing}
                  className="px-6 py-2 bg-[#B5E61D] text-gray-800 rounded-lg font-medium hover:bg-[#a3d119]"
                >
                  End Ride
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin size={20} className="text-[#B5E61D] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-medium text-lg">{ride.pickup_location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin size={20} className="text-[#B5E61D] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-medium text-lg">{ride.dropoff_location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar size={20} className="text-[#B5E61D] mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-lg">{ride.date}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock size={20} className="text-[#B5E61D] mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium text-lg">{ride.time}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users size={20} className="text-[#B5E61D] mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Passengers</p>
                    <p className="font-medium text-lg">
                      {ride.passengers_count}/{ride.max_passengers} Passengers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {ride.notes && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Additional Notes</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>{ride.notes}</p>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-4">Passengers</h3>
              {ride.passengers.length === 0 ? (
                <p className="text-gray-500">No passengers have joined this ride yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ride.passengers.map((passenger) => (
                    <div key={passenger.id} className="flex items-center p-4 border rounded-lg">
                      <div className="bg-[#B5E61D] rounded-full p-2 mr-3">
                        <User size={24} className="text-gray-800" />
                      </div>
                      <div>
                        <p className="font-medium">{passenger.name}</p>
                        <p className="text-sm text-gray-500">{passenger.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

