export default function Stats() {
  const stats = [
    {
      title: "500+",
      subtitle: "Leads Captured",
    },
    {
      title: "98%",
      subtitle: "Client Satisfaction",
    },
    {
      title: "24/7",
      subtitle: "Cloud Availability",
    },
    {
      title: "100%",
      subtitle: "Secure Data",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((item) => (

            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition duration-300"
            >

              <h2 className="text-5xl font-bold text-blue-600">
                {item.title}
              </h2>

              <p className="mt-3 text-gray-600">
                {item.subtitle}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}