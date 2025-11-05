import React from "react";
import Layout from "../layouts/Layout";
import { useForm } from "@inertiajs/react";

const { data, setData, post, processing } = useForm({
  name: "",
  email: "",
  message: "",
});

export default function Contact() {
  return (
    <Layout>
      <main className="container contact-section">
        <h2>Contact Us</h2>
        <p>We would love to hear from you! Send us a message below.</p>

        <form onSubmit={(e) => { e.preventDefault(); post("/contact"); }}>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            placeholder="Your Name"
            required
          />
          {/* ... etc ... */}
        </form>
      </main>
    </Layout>
  );
}
