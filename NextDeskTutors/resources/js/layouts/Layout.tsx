import React from "react";
import { Link } from "@inertiajs/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>© {new Date().getFullYear()} NextDesk Tutor. All rights reserved.</p>
      </footer>
    </div>
  );
}
