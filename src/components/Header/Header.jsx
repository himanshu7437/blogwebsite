import React, { useState, useEffect } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import appwriteService from '../../appwrite/config'

function Header() {
  const [profile, setProfile] = useState(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      if (userData?.$id) {
        const profileData = await appwriteService.getProfileByUserId(userData.$id)
        setProfile(profileData)
      }
    }
    fetchProfile()
  }, [userData])

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: 'About',
      slug: "/about",
      active: !authStatus,
    }, 
    {
      name: 'Contact',
      slug: "/contact",
      active: !authStatus,
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "My Profile",
      slug: profile?.username ? `/profile/${profile.username}` : "#",
      active: authStatus && !!profile?.username,
    },    
  ]

  return (
    <header className="text-gray-300 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 border-t border-gray-700">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Logo width="90px" className="text-white transition-opacity hover:opacity-80" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-6 md:flex">
            <ul className="flex items-center space-x-4">
              {navItems.map((item) => 
                item.active && (
                  <li key={`${item.name}-${item.slug}`}>
                    <button
                      onClick={() => {
                        if (item.slug.startsWith('/profile') && !profile?.username) return
                        navigate(item.slug)
                        setShowMobileMenu(false)
                      }}
                      className="relative px-4 py-2 text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-white group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px transition-all bg-white group-hover:w-full"></span>
                    </button>
                  </li>
                )
              )}
              {authStatus && (
                <li className="ml-4">
                  <LogoutBtn className="text-gray-400 transition-colors duration-200 hover:text-white" />
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="absolute left-0 right-0 z-50 bg-gray-900 border-b border-gray-800 md:hidden top-16">
              <ul className="flex flex-col items-center py-4 space-y-4">
                {navItems.map((item) => 
                  item.active && (
                    <li key={`mobile-${item.name}-${item.slug}`}>
                      <button
                        onClick={() => {
                          if (item.slug.startsWith('/profile') && !profile?.username) return
                          navigate(item.slug)
                          setShowMobileMenu(false)
                        }}
                        className="px-4 py-2 text-base font-medium text-gray-400 transition-colors hover:text-white"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
                )}
                {authStatus && (
                  <li className="mt-2">
                    <LogoutBtn className="text-gray-400 transition-colors hover:text-white" />
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Profile Badge */}
          {authStatus && profile && (
            <div className="items-center hidden ml-4 md:flex">
              <Link 
                to={`/profile/${profile.username}`}
                className="flex items-center space-x-2 group"
              >
                {profile?.profileImage ? (
                  <img 
                    src={appwriteService.getFilePreview(profile.profileImage)} 
                    alt={profile.username}
                    className="object-cover w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full">
                    <span className="text-sm text-white">
                      {profile.username[0]?.toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-sm text-gray-400 transition-colors group-hover:text-white">
                  {profile.username}
                </span>
              </Link>
            </div>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header