import { Link, useForm } from "@inertiajs/inertia-react"
import AppLayout from "../../layouts/AppLayout"

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route("register"))
  }

  return (
    <AppLayout title="Register">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
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

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    University Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    placeholder="your.email@university.edu"
                    required
                  />
                  {errors.email && <div className="text-red-500 mt-1">{errors.email}</div>}
                  <p className="text-sm text-gray-500 mt-1">Must be a valid university email address</p>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    required
                  />
                  {errors.password && <div className="text-red-500 mt-1">{errors.password}</div>}
                </div>

                <div className="mb-6">
                  <label htmlFor="password_confirmation" className="block text-gray-700 font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData("password_confirmation", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5E61D]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[#B5E61D] text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-[#a3d119] transition duration-200"
                >
                  {processing ? "Creating Account..." : "Register"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link href={route("login")} className="text-[#B5E61D] hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

