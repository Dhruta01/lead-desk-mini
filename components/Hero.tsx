export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
      <div className="max-w-6xl mx-auto px-6 py-28 text-center">

        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          🚀 Built with Next.js + Firebase
        </span>

        <h1 className="text-6xl font-extrabold mt-8 leading-tight">
          Capture & Manage
          <br />
          Your Leads
          <span className="text-yellow-300"> Smarter</span>
        </h1>

        <p className="text-xl text-blue-100 max-w-2xl mx-auto mt-8">
          LeadDesk Mini helps businesses collect, organize and manage customer
          leads in one modern dashboard.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          {/* <button className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
            Get Started
          </button> */}
          <a
            href="#contact"
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition inline-block"
          >
            Get Started
          </a>

          {/* <button className="border border-white px-8 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition">
            Learn More
          </button> */}

          <a
            href="#features"
            className="border border-white px-8 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition inline-block"
          >
            Learn More
          </a>
        </div>

      </div>
    </section>
  );
}