import { Link, useForm, usePage } from "@inertiajs/inertia-react"
import AppLayout from "../../layouts/AppLayout"

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false,
  })
  const { route } = usePage().props

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route("login"))
  }

  return (
    <AppLayout title="Login">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

              {errors.email && <div className="text-red-500 mb-4">{errors.email}</div>}

              <form onSubmit={handleSubmit}>
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
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-gray-700 font-medium">
                      Password
                    </label>
                    <Link href={route("password.request")} className="text-sm text-[#B5E61D] hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
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

                <div className="flex items-center mb-6">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={data.remember}
                    onChange={(e) => setData("remember", e.target.checked)}
                    className="h-4 w-4 text-[#B5E61D] focus:ring-[#B5E61D] border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-gray-700">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[#B5E61D] text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-[#a3d119] transition duration-200"
                >
                  {processing ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link href={route("register")} className="text-[#B5E61D] hover:underline">
                    Register
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

