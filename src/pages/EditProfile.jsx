import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'
import { Button, Input } from '../components'
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'

function EditProfile() {
    const [profile, setProfile] = useState({
        username: '',
        name: '',
        bio: '',
        avatarFile: null,
        social_instagram: '',
        social_twitter: '',
        social_linkedin: '',
        social_github: ''
    })
    const [originalUsername, setOriginalUsername] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [previewAvatar, setPreviewAvatar] = useState(null)
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const existingProfile = await appwriteService.getProfileByUserId(userData?.$id)
                if(existingProfile) {
                    setProfile(existingProfile)
                    setOriginalUsername(existingProfile.username)
                    if(existingProfile.avatar) {
                        setPreviewAvatar(appwriteService.getAvatarPreview(existingProfile.avatar))
                    }
                }
            } catch (error) {
                    // console.error("Error fetching profile:", error)
                setError("Failed to load profile data")
            }
        }
        if(userData) fetchProfile()
    }, [userData])

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setPreviewAvatar(reader.result)
            reader.readAsDataURL(file)
            setProfile(prev => ({ ...prev, avatarFile: file }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        try {
            // Username validation
            if (profile.username !== originalUsername) {
                const available = await appwriteService.isUsernameAvailable(profile.username)
                if (!available) throw new Error('Username already taken')
            }

            // Social media validation
            const socialPatterns = {
                instagram: /^[a-zA-Z0-9._]{1,30}$/,
                twitter: /^[a-zA-Z0-9_]{1,15}$/,
                linkedin: /^[a-zA-Z0-9-]{5,30}$/,
                github: /^[a-zA-Z0-9-]{1,39}$/
            }

            const validationErrors = []
            if(profile.social_instagram && !socialPatterns.instagram.test(profile.social_instagram)) 
                validationErrors.push('Invalid Instagram username')
            if(profile.social_twitter && !socialPatterns.twitter.test(profile.social_twitter)) 
                validationErrors.push('Invalid Twitter handle')
            if(profile.social_linkedin && !socialPatterns.linkedin.test(profile.social_linkedin)) 
                validationErrors.push('Invalid LinkedIn profile ID')
            if(profile.social_github && !socialPatterns.github.test(profile.social_github)) 
                validationErrors.push('Invalid GitHub username')

            if(validationErrors.length > 0) {
                setError(validationErrors.join(', '))
                return
            }

            // Update profile
            const updatedProfile = await appwriteService.updateProfile(
                profile.$id, 
                {
                    ...profile,
                    avatarFile: profile.avatarFile,
                    userId: userData.$id
                }
            )
            
            navigate(`/profile/${updatedProfile.username}?refresh=${Date.now()}`)
        } catch (error) {
            setError(error.message)
            // console.error("Update error:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl py-8 mx-auto">
            <h1 className="mb-6 text-2xl font-bold">Edit Profile</h1>
            {error && <div className="p-2 mb-4 text-red-600 bg-red-100 rounded">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Picture Section */}
                <div className="pb-6 border-b">
                    <label className="block mb-4 font-medium">Profile Picture</label>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <img 
                                src={previewAvatar || '/default-avatar.png'}
                                alt="Avatar preview" 
                                className="object-cover w-24 h-24 border-2 border-gray-200 rounded-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center transition-opacity rounded-full opacity-0 bg-black/50 group-hover:opacity-100">
                                <span className="text-sm text-white">Change</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                                Recommended size: 500x500px, JPG/PNG
                            </p>
                        </div>
                    </div>
                </div>

                {/* Basic Info Section */}
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 font-medium">Name</label>
                        <Input
                            type="text"
                            value={profile.name || ''}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Username</label>
                        <Input
                            type="text"
                            value={profile.username}
                            onChange={(e) => setProfile({...profile, username: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Bio</label>
                        <textarea
                            value={profile.bio || ''}
                            onChange={(e) => setProfile({...profile, bio: e.target.value})}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows="4"
                            placeholder="Tell us about yourself..."
                        />
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Social Media</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Instagram */}
                        <div className="relative">
                            <FaInstagram className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                            <Input
                                type="text"
                                value={profile.social_instagram}
                                onChange={(e) => setProfile({...profile, social_instagram: e.target.value})}
                                placeholder="Instagram username"
                                className="pl-10"
                            />
                        </div>

                        {/* Twitter */}
                        <div className="relative">
                            <FaTwitter className="absolute text-blue-400 -translate-y-1/2 left-3 top-1/2" />
                            <Input
                                type="text"
                                value={profile.social_twitter}
                                onChange={(e) => setProfile({...profile, social_twitter: e.target.value})}
                                placeholder="Twitter handle"
                                className="pl-10"
                            />
                        </div>

                        {/* LinkedIn */}
                        <div className="relative">
                            <FaLinkedin className="absolute text-blue-600 -translate-y-1/2 left-3 top-1/2" />
                            <Input
                                type="text"
                                value={profile.social_linkedin}
                                onChange={(e) => setProfile({...profile, social_linkedin: e.target.value})}
                                placeholder="LinkedIn profile ID"
                                className="pl-10"
                            />
                        </div>

                        {/* GitHub */}
                        <div className="relative">
                            <FaGithub className="absolute text-gray-800 -translate-y-1/2 left-3 top-1/2" />
                            <Input
                                type="text"
                                value={profile.social_github}
                                onChange={(e) => setProfile({...profile, social_github: e.target.value})}
                                placeholder="GitHub username"
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                    <Button 
                        type="button" 
                        onClick={() => navigate(-1)}
                        className="text-gray-700 bg-gray-100 hover:bg-gray-200"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                                Saving...
                            </div>
                        ) : 'Save Profile'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile