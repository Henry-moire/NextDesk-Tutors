import React from "react";
import { Link } from "@inertiajs/react";
import Layout from "../layouts/Layout";

export default function Home() {
  return (
    <Layout>

      {/* Hero Section */}
      <section className="bg-blue-50 py-24">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            Find Your Perfect Tutor Today
          </h2>

          <p className="text-lg text-gray-700 mb-8">
            Connect with expert tutors for any subject, right from your home.
          </p>

          <Link
            href="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-12">
          Why NextDesk Tutor?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-white shadow-md rounded-xl p-8 text-center border border-gray-200">
            <h4 className="text-xl font-semibold text-blue-700 mb-3">
              Expert Tutors
            </h4>
            <p className="text-gray-600">
              Vetted professionals for quality learning.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-8 text-center border border-gray-200">
            <h4 className="text-xl font-semibold text-blue-700 mb-3">
              Flexible Scheduling
            </h4>
            <p className="text-gray-600">
              Book lessons at a time that works for you.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-8 text-center border border-gray-200">
            <h4 className="text-xl font-semibold text-blue-700 mb-3">
              All Subjects
            </h4>
            <p className="text-gray-600">
              From Math to Languages, we've got you covered.
            </p>
          </div>
        </div>
      </section>

    </Layout>
  );
}
