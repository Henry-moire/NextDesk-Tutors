import React from "react";
import { Link } from "@inertiajs/react";
import Layout from "../layouts/Layout";

export default function About() {
  return (
    <Layout>
     <div>
      <main className="container about-section">
        <h2>About NextDesk Tutor</h2>
        <p>
            NextDesk Tutor connects students with qualified tutors across campuses and online.
            Our mission is to make quality education accessible and personalized for everyone.
        </p>
        <p>
            Whether you're preparing for exams, learning a new subject, or just need help understanding a topic,
            our platform matches you with the perfect tutor at your convenience.
        </p>
    </main>
    </div>
    </Layout>
  );
}
