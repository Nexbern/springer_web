'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, GraduationCap, LogIn } from 'lucide-react';
import { navigation, schoolInfo } from '@/data/siteData';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div
        className={`bg-springer-charcoal text-white transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto py-2'
          }`}
      >
        <div className="section-padding">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-4">
              <a href={`tel:${schoolInfo.phone}`} className="flex items-center gap-1.5 hover:text-springer-red transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span>{schoolInfo.phone}</span>
              </a>
              <a href={`mailto:${schoolInfo.email}`} className="flex items-center gap-1.5 hover:text-springer-red transition-colors hidden sm:flex">
                <Mail className="w-3.5 h-3.5" />
                <span>{schoolInfo.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white text-xs">{schoolInfo.affiliation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft py-3'
          : 'bg-white py-4'
          }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-springer-red to-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display font-bold text-lg leading-tight text-springer-charcoal">
                  {schoolInfo.name}
                </h1>
                <p className="text-xs text-springer-gray">Excellence in Education</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isActive(item.href)
                    ? 'text-springer-red bg-red-50'
                    : 'text-springer-charcoal hover:text-springer-red hover:bg-gray-50'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Login Buttons & CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="#"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-springer-charcoal hover:text-springer-red border border-gray-300 rounded-lg hover:border-springer-red transition-all"
              >
                <LogIn className="w-4 h-4" />
                Teacher Login
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-springer-red text-white hover:bg-springer-darkred border border-gray-300 rounded-lg hover:border-springer-red transition-all"
              >
                <LogIn className="w-4 h-4" />
                Parent Login
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-springer-charcoal" />
              ) : (
                <Menu className="w-6 h-6 text-springer-charcoal" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="section-padding py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${isActive(item.href)
                  ? 'text-springer-red bg-red-50'
                  : 'text-springer-charcoal hover:text-springer-red hover:bg-gray-50'
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <a
                href="#"
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-springer-charcoal border border-gray-300 rounded-lg hover:border-springer-red hover:text-springer-red transition-all"
              >
                <LogIn className="w-4 h-4" />
                Teacher Login
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-springer-charcoal border border-gray-300 rounded-lg hover:border-springer-red hover:text-springer-red transition-all"
              >
                <LogIn className="w-4 h-4" />
                Parent Login
              </a>
              <Link
                href="/admissions"
                className="btn-primary w-full text-center text-sm"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
