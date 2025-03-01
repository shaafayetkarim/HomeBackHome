import { useForm, Link, usePage } from "@inertiajs/inertia-react"
import AppLayout from "../../layouts/AppLayout"

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  })
  const { route } = usePage()

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route("password.email"))
  }

  return (
    <AppLayout title="Reset Password">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

              {status && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  {status}
                </div>
              )}

              <p className="text-gray-600 mb-6">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link.
              </p>

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
                  {errors.email && <div className="text-red-500 mt-1">{errors.email}</div>}
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[#B5E61D] text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-[#a3d119] transition duration-200"
                >
                  {processing ? "Sending..." : "Email Password Reset Link"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href={route("login")} className="text-[#B5E61D] hover:underline">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

