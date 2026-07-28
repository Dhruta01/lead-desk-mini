import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/stats";
import Features from "@/components/Features";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>

      <Navbar />

      <Hero />

      <Stats />

      <Features />

      <section
        id="contact"
        className="py-20 bg-gray-50"
      >

        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Contact Us
          </h2>

          <p className="text-center text-gray-600 mt-3 mb-10">
            Fill the form below and we will get back to you.
          </p>

          <ContactForm />

        </div>

      </section>

      <Footer />

    </main>
  );
}