"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "@/lib/firebase";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().min(2, "Company name is required"),
  budget: z.string().min(1, "Budget is required"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function LeadForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    try {
      setLoading(true);

      await addDoc(collection(db, "leads"), {
        ...data,
        status: "New",
        createdAt: serverTimestamp(),
      });

      toast.success("Lead submitted successfully!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <h2 className="text-4xl font-bold text-center mb-8">
          Get in Touch
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full border rounded-xl p-4"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Email Address"
              className="w-full border rounded-xl p-4"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <input
              {...register("phone")}
              placeholder="Phone Number"
              className="w-full border rounded-xl p-4"
            />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          </div>

          <div>
            <input
              {...register("company")}
              placeholder="Company Name"
              className="w-full border rounded-xl p-4"
            />
            <p className="text-red-500 text-sm">{errors.company?.message}</p>
          </div>

          <div>
            <input
              {...register("budget")}
              placeholder="Budget"
              className="w-full border rounded-xl p-4"
            />
            <p className="text-red-500 text-sm">{errors.budget?.message}</p>
          </div>

          <div>
            <textarea
              {...register("message")}
              rows={5}
              placeholder="Tell us about your project..."
              className="w-full border rounded-xl p-4"
            />
            <p className="text-red-500 text-sm">{errors.message?.message}</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Lead"}
          </button>
        </form>
      </div>
    </section>
  );
}