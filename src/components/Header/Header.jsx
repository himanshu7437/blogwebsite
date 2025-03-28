import React, { useState, useEffect } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import appwriteService from '../../appwrite/config' 

function Header() {
  const [profile, setProfile] = useState(null) // ✅ State for profile data
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()

  // ✅ Fetch Profile Data when user logs in
  useEffect(() => {
    const fetchProfile = async () => {
        if (userData?.$id) {
            const profileData = await appwriteService.getProfileByUserId(userData.$id);
            
            setProfile(profileData); // ✅ Ensure profile updates
        }
    };

    fetchProfile();
}, [userData]);


  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
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
      active: authStatus && !!profile?.username, // ✅ Ensure profile exists before enabling
    },    
  ]

  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-lg">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Logo width="90px" className="text-white" />
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <ul className="flex items-center space-x-4">
              {navItems.map((item) => 
                item.active ? (
                  <li key={`${item.name}-${item.slug}`}> {/* ✅ Safe unique key */}
                    <button
                      onClick={() => {
                        if (item.slug.startsWith('/profile') && !profile?.username) {
                          return // ✅ Prevent navigating to undefined profile
                        }
                        navigate(item.slug)
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-white"
                      disabled={item.slug === "#"} // ✅ Disable if invalid
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="ml-4">
                  <LogoutBtn className="text-gray-400 transition-colors duration-200 hover:text-white" />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
