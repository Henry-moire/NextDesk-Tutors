import React from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

interface User {
  id: number;
  full_name: string;
  email: string;
  role: "student" | "tutor" | "admin";
}

interface CustomPageProps {
  auth: {
    user: User | null;
  };
  [key: string]: any;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { auth } = usePage<CustomPageProps>().props;

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.post(route("logout"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black">

      {/* Navbar */}
      <header className="bg-blue-600 text-white">
        <nav className="max-w-6xl mx-auto flex items-center gap-6 py-4 px-6">

          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>

          <div className="flex-1" /> {/* pushes auth links to the right */}

          {auth.user ? (
            <div className="flex items-center gap-6">
              <a
                href="#"
                onClick={handleLogout}
                className="hover:underline"
              >
                Logout
              </a>

              {auth.user.role === "student" && (
                <Link
                  href="/student/dashboard"
                  className="hover:underline"
                >
                  Welcome, {auth.user.full_name}
                </Link>
              )}

              {auth.user.role === "tutor" && (
                <Link
                  href="/tutor/dashboard"
                  className="hover:underline"
                >
                  Welcome, {auth.user.full_name}
                </Link>
              )}

              <Link href="/two-factor/setup" className="hover:underline">
                Two-Factor Authentication
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link href="/login" className="hover:underline">Login</Link>
              <Link href="/register" className="hover:underline">Register</Link>
            </div>
          )}
        </nav>
      </header>


      {/* Page Content */}
      <main className="flex-1 px-8 py-10">{children}</main>

      {/* Footer */}
      <footer className="bg-white text-center py-6 mt-10 shadow-inner">
        <p className="text-gray-600">
          © {new Date().getFullYear()} NextDesk Tutor. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
