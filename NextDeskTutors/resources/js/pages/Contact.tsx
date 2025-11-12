import React from "react";
import { useForm } from "@inertiajs/react";
import Layout from "../layouts/Layout";

export default function Contact() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    message: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post("/contact");
  }

  return (
    <Layout>
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
        <p className="text-center text-gray-600 mb-8">
          We would love to hear from you! Send us a message below.
        </p>

        <form
          onSubmit={submit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              value={data.message}
              onChange={(e) => setData("message", e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {processing ? "Sending..." : "Send Message"}
          </button>
        </form>
      </main>
    </Layout>
  );
}
