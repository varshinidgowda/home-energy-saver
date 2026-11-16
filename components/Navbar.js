// ========== NAVBAR ==========
"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/add", label: "Add Appliance" },
  { href: "/report", label: "Usage Report" },
  { href: "/tips", label: "Saving Tips" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          ⚡ Home Energy Saver
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Desktop links */}
        <ul className="hidden gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile links */}
      {open && (
        <ul className="flex flex-col gap-3 px-4 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}