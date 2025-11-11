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
      <main className="container contact-section">
        <h2>Contact Us</h2>
        <p>We would love to hear from you! Send us a message below.</p>

        <form onSubmit={submit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            value={data.message}
            onChange={(e) => setData("message", e.target.value)}
            required
          />
          <button type="submit" disabled={processing}>
            {processing ? "Sending..." : "Send Message"}
          </button>
        </form>
      </main>
    </Layout>
  );
}
