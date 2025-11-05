import React from "react";
import { Link } from "@inertiajs/react";

export default function Home() {
  return (
    <div>
        <header>
            <nav className="container">
                <h1>NextDesk Tutor</h1>
                <ul>
                    <li><a href="home.html">Home</a></li>
                    <li><a href="login.html">Login</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="signup.html" className="cta-button">Sign Up</a></li>
                </ul>
            </nav>
        </header>

        <main className="hero">
            <div className="container">
                <h2>Find Your Perfect Tutor Today.</h2>
                <p>Connect with expert tutors for any subject, right from your home.</p>
                <a href="signup.html" className="main-cta-button">Get Started Now</a>
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

        <footer>
            <p>&copy; 2025 NextDesk Tutor. All rights reserved.</p>
        </footer>
    </div>
  );
}
