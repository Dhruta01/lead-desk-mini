"use client";

import { useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await addDoc(collection(db, "leads"), {
        ...form,
        status: "New",
        createdAt: serverTimestamp(),
      });

      toast.success("Lead Submitted Successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 space-y-5"
    >
      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border rounded-xl p-4"
      />

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full border rounded-xl p-4"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full border rounded-xl p-4"
      />

      <input
        name="company"
        placeholder="Company Name"
        value={form.company}
        onChange={handleChange}
        required
        className="w-full border rounded-xl p-4"
      />

      <input
        name="budget"
        placeholder="Budget"
        value={form.budget}
        onChange={handleChange}
        required
        className="w-full border rounded-xl p-4"
      />

      <textarea
        name="message"
        rows={5}
        placeholder="Tell us about your project..."
        value={form.message}
        onChange={handleChange}
        required
        className="w-full border rounded-xl p-4"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
      >
        {loading ? "Submitting..." : "Submit Lead"}
      </button>
    </form>
  );
}