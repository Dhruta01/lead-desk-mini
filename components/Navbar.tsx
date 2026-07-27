export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        <h1 className="text-3xl font-bold text-blue-600">
          LeadDesk Mini
        </h1>

        <div className="flex gap-8 items-center">

          <a
            href="#features"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Features
          </a>

          <a
            href="#contact"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Contact
          </a>

          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Admin Login
          </button>

        </div>

      </div>
    </nav>
  );
}