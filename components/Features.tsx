export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16">
          Why Choose LeadDesk?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
            <div className="text-5xl mb-5">⚡</div>

            <h3 className="text-2xl font-bold mb-3">
              Fast
            </h3>

            <p className="text-gray-600">
              Capture customer leads instantly with a simple form.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
            <div className="text-5xl mb-5">🔒</div>

            <h3 className="text-2xl font-bold mb-3">
              Secure
            </h3>

            <p className="text-gray-600">
              Powered by Firebase Authentication and Firestore.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
            <div className="text-5xl mb-5">📊</div>

            <h3 className="text-2xl font-bold mb-3">
              Dashboard
            </h3>

            <p className="text-gray-600">
              Manage every lead from one clean admin dashboard.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}