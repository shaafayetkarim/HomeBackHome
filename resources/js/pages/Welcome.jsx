import { Link, usePage } from "@inertiajs/inertia-react"
import { MapPin, Users, Shield, Clock } from "lucide-react"

export default function Welcome() {
  const { route } = usePage().props
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Navigation */}
      <div className="bg-[#B5E61D] pb-10">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-gray-800 font-bold text-2xl">RideShare</div>
            <div className="space-x-2">
              <Link href={route("login")} className="px-4 py-2 rounded-lg text-gray-800 hover:bg-white/20">
                Login
              </Link>
              <Link
                href={route("register")}
                className="px-4 py-2 bg-white rounded-lg text-gray-800 font-medium hover:bg-gray-100"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 pt-10 pb-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Share rides with fellow university students
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              RideShare connects university students for safe, convenient, and affordable carpooling to and from campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={route("register")}
                className="px-6 py-3 bg-white text-gray-800 rounded-lg font-bold text-center hover:bg-gray-100"
              >
                Sign Up Now
              </Link>
              <Link
                href={route("login")}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg font-bold text-center hover:bg-gray-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-[#B5E61D] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2">Create an Account</h3>
              <p className="text-gray-600">Sign up with your university email and complete your profile.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-[#B5E61D] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} className="text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2">Find or Create Rides</h3>
              <p className="text-gray-600">Browse available rides or create your own with your preferences.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-[#B5E61D] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2">Track Your Journey</h3>
              <p className="text-gray-600">Start and end your ride with real-time tracking.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-[#B5E61D] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2">Travel Safely</h3>
              <p className="text-gray-600">Ride with verified university students with similar preferences.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RideShare?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Save Money</h3>
              <p className="text-gray-600">Split transportation costs with fellow students and reduce your expenses.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Reduce Stress</h3>
              <p className="text-gray-600">No more worrying about parking or navigating public transportation alone.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Make Connections</h3>
              <p className="text-gray-600">Meet other students from your university and build your network.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-[#B5E61D]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to start sharing rides?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join our community of university students who are saving money and traveling safely together.
          </p>
          <Link
            href={route("register")}
            className="px-8 py-3 bg-gray-800 text-white rounded-lg font-bold text-center hover:bg-gray-700 inline-block"
          >
            Sign Up with University Email
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-gray-800 font-bold text-xl">RideShare</span>
              <p className="text-gray-600 mt-2">Safe rides for university students</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <Link href={route("about")} className="text-gray-600 hover:text-gray-800">
                About
              </Link>
              <Link href={route("privacy")} className="text-gray-600 hover:text-gray-800">
                Privacy Policy
              </Link>
              <Link href={route("terms")} className="text-gray-600 hover:text-gray-800">
                Terms of Service
              </Link>
              <Link href={route("contact")} className="text-gray-600 hover:text-gray-800">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} RideShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

