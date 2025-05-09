import React from 'react'
import { Link } from 'react-router'
import Logo from '../Logo'
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="text-gray-300 bg-gray-900 border-t border-gray-700">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center mb-6">
              <Logo width="120px" className="text-white" />
            </div>
            <p className="mb-6 text-sm text-gray-400">
              Empowering creators worldwide to share their stories and connect with audiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Blog & Tutorials
                </Link>
              </li>
              <li>
                <Link to="/developers" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Developer API
                </Link>
              </li>
              <li>
                <Link to="/help-center" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-400 transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Contact Sales
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="mb-4 font-semibold text-white">Stay Updated</h3>
            <form className="mb-6">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 text-sm bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="pt-6 border-t border-gray-800">
              <h3 className="mb-4 font-semibold text-white">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-12 text-center border-t border-gray-800">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Your Blog Platform. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Proudly open source. MIT Licensed.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer