
"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/add", label: "Add Appliance" },
  { href: "/report", label: "Usage Report" },
  { href: "/tips", label: "Saving Tips" },
  { href: "/challenges", label: "🌱 Eco Challenges" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white">

      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-3">

        {/* PROJECT TITLE */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-bold"
          onClick={() => setOpen(false)}
        >
          ⚡ Home Energy Saver
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden rounded-md px-3 py-2 text-2xl hover:bg-green-700"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>

        {/* DESKTOP LINKS */}
        <ul className="hidden items-center gap-4 lg:gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm lg:text-base hover:underline"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

      </div>

      {/* MOBILE LINKS */}
      {open && (
        <ul className="flex flex-col gap-1 px-4 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3 text-sm hover:bg-green-700"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

    </nav>
  );
}
