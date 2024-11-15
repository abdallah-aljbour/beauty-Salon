import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#e8dce1] to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-center sm:justify-start">
              <span className="text-2xl sm:text-3xl font-bold">BeautySalon</span>
            </div>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600 text-center sm:text-left">
              Your one-stop destination for all beauty services. Book appointments with the best salons in your area.
            </p>

            <div className="mt-6 flex justify-center sm:justify-start gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 transition hover:text-gray-900"
              >
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 transition hover:text-gray-900"
              >
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 transition hover:text-gray-900"
              >
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 transition hover:text-gray-900"
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:col-span-3">
            {/* Services Column */}
            <div className="text-center sm:text-left">
              <p className="text-base sm:text-lg font-medium text-gray-900 mb-4">Services</p>
              <ul className="space-y-3">
                <li>
                  <Link to="/catalog" className="text-sm sm:text-base text-gray-700 transition hover:opacity-75">
                    Browse Salons
                  </Link>
                </li>
                <li>
                  <Link to="/appointments" className="text-sm sm:text-base text-gray-700 transition hover:opacity-75">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-sm sm:text-base text-gray-700 transition hover:opacity-75">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm sm:text-base text-gray-700 transition hover:opacity-75">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="text-center sm:text-left">
              <p className="text-base sm:text-lg font-medium text-gray-900 mb-4">Company</p>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm sm:text-base text-gray-700 transition hover:opacity-75">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-sm sm:text-base text-gray-700 transition hover:opacity-75">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-sm sm:text-base text-gray-700 transition hover:opacity-75">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm sm:text-base text-gray-700 transition hover:opacity-75">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="text-center sm:text-left">
              <p className="text-base sm:text-lg font-medium text-gray-900 mb-4">Support</p>
              <ul className="space-y-3">
                <li>
                  <Link to="/help" className="text-sm sm:text-base text-gray-700 transition hover:opacity-75">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm sm:text-base text-gray-700 transition hover:opacity-75">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm sm:text-base text-gray-700 transition hover:opacity-75">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm sm:text-base text-gray-700 transition hover:opacity-75">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-300">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left order-2 sm:order-1">
              &copy; 2024 BeautySalon. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-4 order-1 sm:order-2">
              <Link 
                to="/terms" 
                className="text-xs sm:text-sm text-red-300 underline transition hover:text-red-400"
              >
                Terms & Conditions
              </Link>
              <span className="hidden sm:inline text-gray-500">•</span>
              <Link 
                to="/privacy" 
                className="text-xs sm:text-sm text-red-300 underline transition hover:text-red-400"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
