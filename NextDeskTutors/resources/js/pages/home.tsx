import React from "react";
import { Link } from "@inertiajs/react";
import Layout from "../layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <main className="hero">
        <div className="container">
          <h2>Find Your Perfect Tutor Today.</h2>
          <p>Connect with expert tutors for any subject, right from your home.</p>
          <Link href="/signup" className="main-cta-button">
            Get Started Now
          </Link>
        </div>
      </main>

      <section className="features container">
        <h3>Why NextDesk Tutor?</h3>
        <div className="feature-grid">
          <div className="feature-item">
            <h4>Expert Tutors</h4>
            <p>Vetted professionals for quality learning.</p>
          </div>
          <div className="feature-item">
            <h4>Flexible Scheduling</h4>
            <p>Book lessons at a time that works for you.</p>
          </div>
          <div className="feature-item">
            <h4>All Subjects</h4>
            <p>From Math to Languages, we've got you covered.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
