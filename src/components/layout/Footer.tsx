import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  Heart
} from 'lucide-react';
import { schoolInfo, navigation } from '@/data/siteData';
import Image from 'next/image';

export function Footer() {
  const quickLinks = navigation.slice(0, 6);

  return (
    <footer className="bg-springer-charcoal text-white">
      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* School Info - Takes more space */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <div className="relative w-[25rem] h-16 rounded-lg overflow-hidden">
                <Image
                  src="/images/springer_asset/logo.png"
                  alt={schoolInfo.name}
                  fill
                  className="object-cover object-left"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-md">
              Shaping minds and building futures through quality education,
              innovative learning, and strong values since 1992.
            </p>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-springer-red transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-springer-red transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-springer-red transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-springer-red transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="font-display font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-springer-red flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{schoolInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-springer-red flex-shrink-0" />
                <a href={`tel:${schoolInfo.phone}`} className="text-gray-400 text-sm hover:text-white transition-colors">
                  {schoolInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-springer-red flex-shrink-0" />
                <a href={`mailto:${schoolInfo.email}`} className="text-gray-400 text-sm hover:text-white transition-colors">
                  {schoolInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="section-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} {schoolInfo.name}. All rights reserved.
            </p>
            <a
              href="https://www.nexbern.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm transition-colors flex items-center gap-2 hover:text-gray-300"
            >
              <span>Designed & Developed by</span>
              <span className="font-semibold text-red-500 hover:text-red-400 transition-colors">Nexbern Technologies</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
