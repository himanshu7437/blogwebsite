import React, { useState, useEffect } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import appwriteService from '../../appwrite/config';

// Import Heroicons (you might need to install @heroicons/react if not already)
import {
  HomeIcon,
  InformationCircleIcon,
  PhoneIcon,
  DocumentTextIcon,
  PencilIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

function Header() {
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (userData?.$id) {
        setProfileLoading(true);
        try {
          const profileData = await appwriteService.getProfileByUserId(userData.$id);
          setProfile(profileData);
        } catch (error) {
          // console.error("Error fetching profile:", error);
        } finally {
          setProfileLoading(false);
        }
      }
    };
    fetchProfile();
  }, [userData, authStatus]);

  // Navigation items for the center section
  const centerNavItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
      icon: <HomeIcon className="w-5 h-5" />
    }, 
    {
      name: 'About',
      slug: "/about",
      active: !authStatus,
      icon: <InformationCircleIcon className="w-5 h-5" />
    }, 
    {
      name: 'Contact',
      slug: "/contact",
      active: !authStatus,
      icon: <PhoneIcon className="w-5 h-5" />
    }, 
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
      icon: <DocumentTextIcon className="w-5 h-5" />
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: <PencilIcon className="w-5 h-5" />
    },
    {
      name: "My Profile",
      slug: profile?.username ? `/profile/${profile.username}` : "#",
      active: authStatus,
      icon: <UserCircleIcon className="w-5 h-5" />
    }, 
  ];

  // Navigation items for the right section
  const rightNavItems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      isButton: true,
      icon: <ArrowRightOnRectangleIcon className="w-5 h-5" />
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      isButton: true,
      isPrimary: true,
      icon: <UserIcon className="w-5 h-5" />
    }
  ];

  const handleProfileNavigation = (slug) => {
    if (slug.startsWith('/profile') && profileLoading) {
      return; // Don't navigate if profile is still loading
    }
    navigate(slug);
    setShowMobileMenu(false);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700">
      <Container>
        <nav className="relative flex flex-wrap items-center justify-between py-3 md:flex-nowrap">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 mr-4">
            <Link to="/" className="flex items-center">
              <Logo width="100px" className="text-white transition-opacity hover:opacity-90" />
            </Link>
          </div>

          {/* Desktop Navigation - Centered items */}
          <div className="flex-grow hidden md:flex md:justify-center">
            <ul className="flex items-center space-x-1">
              {centerNavItems.map((item) => 
                item.active && (
                  <li key={`${item.name}-${item.slug}`}>
                    <button
                      onClick={() => handleProfileNavigation(item.slug)}
                      disabled={item.slug.startsWith('/profile') && profileLoading}
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-200 rounded-lg hover:bg-gray-800 hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                      {item.slug.startsWith('/profile') && profileLoading && (
                        <span className="ml-2">
                          <svg className="w-4 h-4 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                      )}
                      <span className="absolute bottom-0 left-1/4 w-1/2 h-0.5 bg-blue-500 transition-all scale-x-0 group-hover:scale-x-100"></span>
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Right side items (Login/Signup when not authenticated, Profile/Logout when authenticated) */}
          <div className="items-center hidden space-x-3 md:flex">
            {/* Login/Signup buttons when not authenticated */}
            {!authStatus && (
              <div className="flex items-center space-x-2">
                {rightNavItems.map((item) => 
                  item.active && (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.slug)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${
                        item.isPrimary 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </button>
                  )
                )}
              </div>
            )}
            
            {/* Profile and Logout when authenticated */}
            {authStatus && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 group p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  {profileLoading ? (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-400">Loading...</span>
                    </div>
                  ) : (
                    <Link 
                      to={profile?.username ? `/profile/${profile.username}` : "#"}
                      className="flex items-center space-x-2"
                    >
                      {profile?.profileImage ? (
                        <img 
                          src={appwriteService.getFilePreview(profile.profileImage)} 
                          alt={profile.username}
                          className="object-cover w-8 h-8 rounded-full border-2 border-gray-700 group-hover:border-blue-500 transition-colors"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full">
                          <span className="text-sm font-medium text-white">
                            {profile?.username?.[0]?.toUpperCase() || 'U'}
                          </span>
                        </div>
                      )}
                      <span className="text-sm text-gray-300 transition-colors group-hover:text-white">
                        {profile?.username || 'User'}
                      </span>
                    </Link>
                  )}
                </div>
                
                <div className="h-6 border-l border-gray-700"></div>
                
                <LogoutBtn className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-500 rounded-lg transition-all duration-200 hover:from-red-700 hover:to-red-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center">
                  <ArrowRightOnRectangleIcon className="w-5 h-5 mr-1" />
                  Logout
                </LogoutBtn>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-400 bg-gray-800 rounded-lg hover:text-white hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="absolute left-0 right-0 z-50 bg-gray-900 border-b border-gray-800 shadow-xl md:hidden top-full">
              <div className="px-4 py-5">
                <ul className="flex flex-col space-y-3">
                  {/* Center navigation items */}
                  {centerNavItems.map((item) => 
                    item.active && (
                      <li key={`mobile-${item.name}-${item.slug}`}>
                        <button
                          onClick={() => handleProfileNavigation(item.slug)}
                          disabled={item.slug.startsWith('/profile') && profileLoading}
                          className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-300 transition-colors rounded-lg bg-gray-800 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                          {item.slug.startsWith('/profile') && profileLoading && (
                            <span className="ml-2">
                              <svg className="w-4 h-4 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            </span>
                          )}
                        </button>
                      </li>
                    )
                  )}
                  
                  {/* Right navigation items */}
                  {!authStatus && rightNavItems.map((item) => 
                    item.active && (
                      <li key={`mobile-${item.name}-${item.slug}`}>
                        <button
                          onClick={() => {
                            navigate(item.slug);
                            setShowMobileMenu(false);
                          }}
                          className={`flex items-center w-full px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                            item.isPrimary 
                              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600' 
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
                          }`}
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                        </button>
                      </li>
                    )
                  )}
                  
                  {/* Profile and logout for mobile */}
                  {authStatus && (
                    <li className="flex items-center px-4 py-3 rounded-lg bg-gray-800">
                      {profileLoading ? (
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-300">Loading profile...</span>
                        </div>
                      ) : (
                        <>
                          {profile?.profileImage ? (
                            <img 
                              src={appwriteService.getFilePreview(profile.profileImage)} 
                              alt={profile.username}
                              className="object-cover w-10 h-10 rounded-full border-2 border-gray-700"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full">
                              <span className="text-sm font-medium text-white">
                                {profile?.username?.[0]?.toUpperCase() || 'U'}
                              </span>
                            </div>
                          )}
                          <span className="ml-3 text-sm font-medium text-gray-300">
                            {profile?.username || 'User'}
                          </span>
                        </>
                      )}
                    </li>
                  )}
                  
                  {authStatus && (
                    <li className="mt-2">
                      <LogoutBtn className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-red-600 to-red-500 rounded-lg transition-colors hover:from-red-700 hover:to-red-600">
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                        Logout
                      </LogoutBtn>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;