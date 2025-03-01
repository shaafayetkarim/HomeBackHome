"use client"

import { useState } from "react"
import { useForm } from "@inertiajs/inertia-react"
import { usePage } from "@inertiajs/inertia-react"
import AppLayout from "../../layouts/AppLayout"

export default function ProfileEdit({ user, classRoutine }) {
  const [activeTab, setActiveTab] = useState("profile")
  const { route } = usePage() // Import route from usePage

  const { data, setData, post, processing, errors } = useForm({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    home_address: user.home_address || "",
    gender: user.gender || "",
  })

  const {
    data: routineData,
    setData: setRoutineData,
    post: postRoutine,
    processing: routineProcessing,
  } = useForm({
    routine: classRoutine || [
      { day: "Monday", start_time: "", end_time: "" },
      { day: "Tuesday", start_time: "", end_time: "" },
      { day: "Wednesday", start_time: "", end_time: "" },
      { day: "Thursday", start_time: "", end_time: "" },
      { day: "Friday", start_time: "", end_time: "" },
    ],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route("profile.update"))
  }

  const handleRoutineSubmit = (e) => {
    e.preventDefault()
    postRoutine(route("routine.update"))
  }

  const updateRoutine = (index, field, value) => {
    const updatedRoutine = [...routineData.routine]
    updatedRoutine[index][field] = value
    setRoutineData("routine", updatedRoutine)
  }

  return (
    <AppLayout title="Edit Profile">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-3 font-medium ${
                activeTab === "profile" ? "border-b-2 border-[#B5E61D] text-gray-800" : "text-gray-500"
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab("routine")}
              className={`px-6 py-3 font-medium ${
                activeTab === "routine" ? "border-b-2 border-[#B5E61D] text-gray-800" : "text-gray-500"
              }`}
            >
              Class Routine
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "profile" ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    required
                  />
                  {errors.name && <div className="text-red-500 mt-1">{errors.name}</div>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    University Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={data.email}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                    disabled
                  />
                  <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    required
                  />
                  {errors.phone && <div className="text-red-500 mt-1">{errors.phone}</div>}
                </div>

                <div>
                  <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={data.gender}
                    onChange={(e) => setData("gender", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <div className="text-red-500 mt-1">{errors.gender}</div>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="home_address" className="block text-gray-700 font-medium mb-2">
                    Home Address
                  </label>
                  <textarea
                    id="home_address"
                    value={data.home_address}
                    onChange={(e) => setData("home_address", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    rows="3"
                    required
                  ></textarea>
                  {errors.home_address && <div className="text-red-500 mt-1">{errors.home_address}</div>}
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-[#B5E61D] text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-[#a3d119] transition duration-200"
                >
                  {processing ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRoutineSubmit}>
              <div className="space-y-4">
                <p className="text-gray-600 mb-4">
                  Set your class routine for the current semester. This helps in matching you with suitable rides.
                </p>

                {routineData.routine.map((day, index) => (
                  <div
                    key={day.day}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 border rounded-lg"
                  >
                    <div className="font-medium">{day.day}</div>
                    <div>
                      <label htmlFor={`start_time_${index}`} className="block text-sm text-gray-500 mb-1">
                        Start Time
                      </label>
                      <input
                        id={`start_time_${index}`}
                        type="time"
                        value={day.start_time}
                        onChange={(e) => updateRoutine(index, "start_time", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                      />
                    </div>
                    <div>
                      <label htmlFor={`end_time_${index}`} className="block text-sm text-gray-500 mb-1">
                        End Time
                      </label>
                      <input
                        id={`end_time_${index}`}
                        type="time"
                        value={day.end_time}
                        onChange={(e) => updateRoutine(index, "end_time", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={routineProcessing}
                  className="bg-[#B5E61D] text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-[#a3d119] transition duration-200"
                >
                  {routineProcessing ? "Saving..." : "Save Routine"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

