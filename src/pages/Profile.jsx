import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import appwriteService from '../appwrite/config'
import { Container, Button, PostCard } from '../components'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaPen } from 'react-icons/fa'
import profileImg from '../images/user.png'

function Profile() {
    const { username } = useParams()
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const currentUser = useSelector(state => state.auth.userData)

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true)
                const profile = await appwriteService.getProfileByUsername(username)

                if (!profile) {
                    setProfile(null)
                    return
                }

                setProfile(profile)

                const postsData = await appwriteService.getPosts([
                    Query.equal("userId", profile.userId),
                    Query.equal("status", "active"),
                    Query.orderDesc("$createdAt")
                ])
                setPosts(postsData?.documents || [])

            } catch (error) {
                console.error("Profile Error:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProfileData()
    }, [username])

    const getSocialUrl = (platform, value) => {
        const baseUrls = {
            instagram: 'https://instagram.com/',
            twitter: 'https://twitter.com/',
            linkedin: 'https://linkedin.com/in/',
            github: 'https://github.com/'
        }
        
        if (platform === 'linkedin' && value.startsWith('http')) {
            return value
        }
        return `${baseUrls[platform]}${value}`
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    <span className="absolute inset-0 flex items-center justify-center font-medium text-blue-500 animate-pulse">
                        Loading...
                    </span>
                </div>
                <p className="text-center text-gray-600">
                    Fetching {username}'s profile<br />
                    <span className="text-sm opacity-75">This may take a moment</span>
                </p>
            </div>
        )
    }

    if (!profile) {
        return (
            <Container>
                <div className="py-8 text-center">
                    <h2 className="text-2xl font-bold">Profile not found</h2>
                    <Button onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                </div>
            </Container>
        )
    }

    const isOwner = currentUser?.$id === profile.userId
    const avatarUrl = profile.avatar 
        ? appwriteService.getAvatarPreview(profile.avatar)
        : '/default-avatar.jpg'

        return (
            <Container>
                <div className="max-w-5xl mx-auto">
                    {/* Profile Header */}
                    <div className="relative px-6 pt-20 pb-16 mb-12 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl">
                        <div className="absolute inset-0 pointer-events-none bg-noise opacity-10"></div>
                        
                        <div className="relative flex flex-col items-center gap-8 lg:flex-row">
                            <div className="relative -mt-12 group">
                                <div className="absolute inset-0 transition-opacity opacity-50 rounded-3xl bg-gradient-to-br from-blue-200 to-purple-300 blur-xl group-hover:opacity-70"></div>
                                <img 
                                    src={profileImg}
                                    alt={profile.username}
                                    className="relative z-10 object-cover w-32 h-32 transition-transform duration-300 border-4 border-white shadow-xl rounded-2xl hover:scale-105"
                                />
                                {isOwner && (
                                    <button 
                                        onClick={() => navigate('/edit-profile')}
                                        className="absolute z-20 p-2 transition-colors rounded-full shadow-md bottom-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white"
                                    >
                                        <FaPen className="w-4 h-4 text-gray-700" />
                                    </button>
                                )}
                            </div>
    
                            <div className="space-y-3 text-center lg:text-left">
                                <h1 className="text-4xl font-bold text-gray-900 font-[Inter]">
                                    {profile.name}
                                    <span className="ml-3 text-2xl font-medium text-gray-500">
                                        @{profile.username}
                                    </span>
                                </h1>
                                
                                {profile.bio && (
                                    <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                                        {profile.bio}
                                    </p>
                                )}
    
                                {/* Social Links */}
                                {(profile.social_instagram || profile.social_twitter || 
                                 profile.social_linkedin || profile.social_github) && (
                                    <div className="flex flex-wrap justify-center gap-3 mt-6 lg:justify-start">
                                        {profile.social_instagram && (
                                            <a
                                                href={getSocialUrl('instagram', profile.social_instagram)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm transition-all bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-md hover:-translate-y-0.5"
                                            >
                                                <FaInstagram className="text-pink-600 w-[18px] h-[18px]" />
                                                <span className="font-medium text-gray-700">@{profile.social_instagram}</span>
                                            </a>
                                        )}
    
                                        {profile.social_twitter && (
                                            <a
                                                href={getSocialUrl('twitter', profile.social_twitter)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm transition-all bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-md hover:-translate-y-0.5"
                                            >
                                                <FaTwitter className="text-blue-400 w-[18px] h-[18px]" />
                                                <span className="font-medium text-gray-700">@{profile.social_twitter}</span>
                                            </a>
                                        )}
    
                                        {profile.social_linkedin && (
                                            <a
                                                href={getSocialUrl('linkedin', profile.social_linkedin)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm transition-all bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-md hover:-translate-y-0.5"
                                            >
                                                <FaLinkedin className="text-blue-600 w-[18px] h-[18px]" />
                                                <span className="font-medium text-gray-700">
                                                    {profile.social_linkedin.includes('/in/') 
                                                        ? profile.social_linkedin.split('/in/')[1]
                                                        : profile.social_linkedin}
                                                </span>
                                            </a>
                                        )}
    
                                        {profile.social_github && (
                                            <a
                                                href={getSocialUrl('github', profile.social_github)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm transition-all bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-md hover:-translate-y-0.5"
                                            >
                                                <FaGithub className="text-gray-800 w-[18px] h-[18px]" />
                                                <span className="font-medium text-gray-700">@{profile.social_github}</span>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
    
                    {/* Posts Section */}
                    <div className="px-6">
                        <div className="pb-8">
                            <h3 className="flex items-center mb-8 text-2xl font-bold text-gray-900">
                                <span className="w-3 h-8 mr-3 rounded-full bg-gradient-to-b from-blue-500 to-purple-600"></span>
                                Latest Creations
                            </h3>
                            
                            {posts.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {posts.map(post => (
                                        <PostCard 
                                            key={post.$id} 
                                            {...post} 
                                            className="transition-transform hover:scale-[1.02] hover:shadow-lg"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50">
                                    <p className="text-lg text-gray-500">
                                        {isOwner ? "Your creative space is waiting..." : "No posts yet"}
                                    </p>
                                    {isOwner && (
                                        <Link 
                                            to="/add-post"
                                            className="inline-block mt-4 font-medium text-blue-600 hover:text-blue-700 group"
                                        >
                                            Start creating →
                                            <span className="block h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
    
    export default Profile