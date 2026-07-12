import React from "react";
import Link from "next/link";
import { Shield, Mail, Phone, MapPin } from "lucide-react";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="bg-slate-900 border-t border-slate-800 text-slate-300"
      role="contentinfo"
      aria-label="Informasi footer"
    >
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md"
            >
              <Shield className="h-6 w-6 text-emerald-500" aria-hidden="true" />
              <span className="text-xl font-bold text-white tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm">
              {APP_DESCRIPTION}
            </p>
          </div>

          <nav aria-label="Tautan fitur utama">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Fitur Utama</h3>
            <ul className="mt-4 space-y-2 text-sm" role="list">
              <li role="listitem">
                <Link
                  href="/cek-legalitas"
                  className="hover:text-emerald-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                >
                  Cek Status Legalitas
                </Link>
              </li>
              <li role="listitem">
                <Link
                  href="/panduan"
                  className="hover:text-emerald-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                >
                  Panduan Perizinan
                </Link>
              </li>
              <li role="listitem">
                <Link
                  href="/kalkulator-pajak"
                  className="hover:text-emerald-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                >
                  Kalkulator Pajak UMKM
                </Link>
              </li>
              <li role="listitem">
                <Link
                  href="/template-surat"
                  className="hover:text-emerald-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                >
                  Pembuat Surat
                </Link>
              </li>
            </ul>
          </nav>

          <address className="not-italic">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Kontak & Bantuan</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400" role="list">
              <li className="flex items-center space-x-2" role="listitem">
                <Mail className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                <a
                  href="mailto:kontak@umkmlegal.id"
                  className="hover:text-emerald-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                  aria-label="Kirim email ke kontak@umkmlegal.id"
                >
                  kontak@umkmlegal.id
                </a>
              </li>
              <li className="flex items-center space-x-2" role="listitem">
                <Phone className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                <a
                  href="tel:+6281234567890"
                  className="hover:text-emerald-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                  aria-label="Hubungi +62 812-3456-7890"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center space-x-2" role="listitem">
                <MapPin className="h-4 w-4 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </address>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
