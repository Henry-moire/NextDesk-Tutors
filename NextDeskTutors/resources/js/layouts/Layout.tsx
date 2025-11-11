import React from "react";
import { Link, router, usePage } from "@inertiajs/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { auth }: any = usePage().props; // get user info
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    router.post("/logout");
  };

  return (
    <div>
      <header>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {auth?.user ? (
            <>
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
              <Link href="/profile">Welcome, {auth.user.name}</Link>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>© {new Date().getFullYear()} NextDesk Tutor. All rights reserved.</p>
      </footer>
    </div>
  );
}
