"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          href="/"
          className="text-3xl font-extrabold text-blue-600"
        >
          LeadDesk CRM
        </Link>

        <nav className="hidden md:flex items-center gap-8">

          <a
            href="#features"
            className="hover:text-blue-600 transition"
          >
            Features
          </a>

          <a
            href="#contact"
            className="hover:text-blue-600 transition"
          >
            Contact
          </a>

          <Link
            href="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Admin Login
          </Link>

        </nav>

      </div>

    </header>
  );
}