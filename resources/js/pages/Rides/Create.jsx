import { useForm } from "@inertiajs/inertia-react"
import AppLayout from "../../layouts/AppLayout"
import { MapPin, Users, Calendar, Clock } from "lucide-react"

export default function CreateRide() {
  const { data, setData, post, processing, errors } = useForm({
    pickup_location: "",
    dropoff_location: "",
    date: "",
    time: "",
    gender_preference: "mixed",
    max_passengers: "3",
    notes: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route("rides.store"))
  }

  return (
    <AppLayout title="Create Ride Request">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="pickup_location" className="block text-gray-700 font-medium mb-2">
                    <div className="flex items-center">
                      <MapPin size={18} className="mr-2 text-[#B5E61D]" />
                      Pickup Location
                    </div>
                  </label>
                  <input
                    id="pickup_location"
                    type="text"
                    value={data.pickup_location}
                    onChange={(e) => setData("pickup_location", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    placeholder="Enter pickup location"
                    required
                  />
                  {errors.pickup_location && <div className="text-red-500 mt-1">{errors.pickup_location}</div>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="dropoff_location" className="block text-gray-700 font-medium mb-2">
                    <div className="flex items-center">
                      <MapPin size={18} className="mr-2 text-[#B5E61D]" />
                      Dropoff Location
                    </div>
                  </label>
                  <input
                    id="dropoff_location"
                    type="text"
                    value={data.dropoff_location}
                    onChange={(e) => setData("dropoff_location", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    placeholder="Enter dropoff location"
                    required
                  />
                  {errors.dropoff_location && <div className="text-red-500 mt-1">{errors.dropoff_location}</div>}
                </div>

                <div>
                  <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2 text-[#B5E61D]" />
                      Date
                    </div>
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={data.date}
                    onChange={(e) => setData("date", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    required
                  />
                  {errors.date && <div className="text-red-500 mt-1">{errors.date}</div>}
                </div>

                <div>
                  <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
                    <div className="flex items-center">
                      <Clock size={18} className="mr-2 text-[#B5E61D]" />
                      Time
                    </div>
                  </label>
                  <input
                    id="time"
                    type="time"
                    value={data.time}
                    onChange={(e) => setData("time", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    required
                  />
                  {errors.time && <div className="text-red-500 mt-1">{errors.time}</div>}
                </div>

                <div>
                  <label htmlFor="gender_preference" className="block text-gray-700 font-medium mb-2">
                    <div className="flex items-center">Gender Preference</div>
                  </label>
                  <select
                    id="gender_preference"
                    value={data.gender_preference}
                    onChange={(e) => setData("gender_preference", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    required
                  >
                    <option value="mixed">Mixed</option>
                    <option value="female_only">Girls Only</option>
                    <option value="male_only">Boys Only</option>
                  </select>
                  {errors.gender_preference && <div className="text-red-500 mt-1">{errors.gender_preference}</div>}
                </div>

                <div>
                  <label htmlFor="max_passengers" className="block text-gray-700 font-medium mb-2">
                    <div className="flex items-center">
                      <Users size={18} className="mr-2 text-[#B5E61D]" />
                      Maximum Passengers
                    </div>
                  </label>
                  <select
                    id="max_passengers"
                    value={data.max_passengers}
                    onChange={(e) => setData("max_passengers", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    required
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                  </select>
                  {errors.max_passengers && <div className="text-red-500 mt-1">{errors.max_passengers}</div>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    value={data.notes}
                    onChange={(e) => setData("notes", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    rows="3"
                    placeholder="Any additional information about your ride"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-[#B5E61D] text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-[#a3d119] transition duration-200"
                >
                  {processing ? "Creating..." : "Create Ride Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

