import React from "react";
import { Link } from "@inertiajs/react";
import Layout from "../layouts/Layout";

export default function About() {
  return (
    <Layout>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-blue-600 mb-6">
          About NextDesk Tutor
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          NextDesk Tutor connects students with qualified tutors across campuses and online.
          Our mission is to make high-quality education accessible, personalized, and convenient
          for learners at every level.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Whether you're preparing for exams, learning a new subject, or just need help understanding
          a topic, our platform matches you with the perfect tutor — anytime, anywhere.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed">
          We believe in empowering students and supporting tutors, creating a learning environment
          that is flexible, reliable, and impactful.
        </p>
      </main>
    </Layout>
  );
}
