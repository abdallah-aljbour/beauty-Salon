import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#e8dce1] to-white">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <div className="flex items-center">
              <span className="text-3xl font-bold">BeautySalon</span>
            </div>

            <p className="mt-6 max-w-md text-gray-600">
              Your one-stop destination for all beauty services. Book appointments with the best salons in your area.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 transition hover:text-gray-900"
              >
                <Facebook className="h-6 w-6" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 transition hover:text-gray-900"
              >
                <Instagram className="h-6 w-6" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 transition hover:text-gray-900"
              >
                <Twitter className="h-6 w-6" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 transition hover:text-gray-900"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3">
            <div>
              <p className="font-medium text-gray-900">Services</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link to="/catalog" className="text-gray-700 transition hover:opacity-75">
                    Browse Salons
                  </Link>
                </li>
                <li>
                  <Link to="/appointments" className="text-gray-700 transition hover:opacity-75">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-700 transition hover:opacity-75">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-700 transition hover:opacity-75">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Company</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link to="/about" className="text-gray-700 transition hover:opacity-75">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-700 transition hover:opacity-75">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-700 transition hover:opacity-75">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-700 transition hover:opacity-75">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Support</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link to="/help" className="text-gray-700 transition hover:opacity-75">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-700 transition hover:opacity-75">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-700 transition hover:opacity-75">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-700 transition hover:opacity-75">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-300 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500">
              <span className="block sm:inline">All rights reserved.</span>
              &nbsp;
              <Link 
                to="/terms" 
                className="inline-block text-red-300 underline transition hover:text-red-400"
              >
                Terms & Conditions
              </Link>
              &nbsp;•&nbsp;
              <Link 
                to="/privacy" 
                className="inline-block text-red-300 underline transition hover:text-red-400"
              >
                Privacy Policy
              </Link>
            </p>

            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              &copy; 2024 BeautySalon
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
