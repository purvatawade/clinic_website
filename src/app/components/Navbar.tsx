'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const clinicPhone = '919867519567';
  const [activeLink, setActiveLink] = useState('#timings');

  const navLinks = [
    { label: 'OPD Timings', href: '#timings' },
    { label: 'Services & Care', href: '#services' },
    { label: 'Clinic Gallery', href: '#gallery' },
    { label: 'Location & Map', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#062c1e] text-white border-b border-emerald-900/60 shadow-lg shadow-black/10 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Clinic Identity */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-black text-2xl shadow-inner group-hover:scale-105 transition-transform">
            ⚕
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight block text-white group-hover:text-emerald-300 transition-colors">
              Dhanwantri Clinic
            </span>
            <span className="text-xs text-amber-200/90 font-semibold uppercase tracking-wider block">
              Dr. Sarika B. Singh (B.A.M.S.)
            </span>
          </div>
        </Link>

        {/* Navigation Links with Active Highlighting */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = activeLink === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white/15 text-emerald-300 shadow-inner'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Direct WhatsApp Action Button */}
        <div>
          <a
            href={`https://wa.me/${clinicPhone}?text=Hello%20Dr.%20Sarika%20Singh,%20I%20would%20like%20to%20consult%20at%20Dhanwantri%20Clinic.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-[#062c1e] text-sm font-extrabold px-5 py-2.5 rounded-xl transition duration-200 shadow-md shadow-black/20 flex items-center gap-2"
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}