import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div>

            <h2 className="text-2xl font-bold">
              LeadDesk CRM
            </h2>

            <p className="text-gray-400 mt-2">
              Built with Next.js, Firebase & Tailwind CSS.
            </p>

          </div>

          <div className="flex gap-6">

            <Link
              href="/"
              className="hover:text-blue-400 transition"
            >
              Home
            </Link>

            <Link
              href="/login"
              className="hover:text-blue-400 transition"
            >
              Admin
            </Link>

            <a
              href="#contact"
              className="hover:text-blue-400 transition"
            >
              Contact
            </a>

          </div>

        </div>

        <hr className="border-slate-700 my-6" />

        <p className="text-center text-gray-500">
          © 2026 LeadDesk CRM. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}