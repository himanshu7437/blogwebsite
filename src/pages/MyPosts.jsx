import React, { useEffect, useState } from 'react'
import { Container, PostCard, Loader } from '../components'
import appwriteService from '../appwrite/config'
import { Query } from 'appwrite'
import { useSelector } from 'react-redux'
import { FaFile, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router'

function MyPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const userData = useSelector(state => state.auth.userData)
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await appwriteService.getPosts([
                    Query.equal("userId", userData.$id),
                    Query.orderDesc("$createdAt")
                ])
                if(posts) {
                    setPosts(posts.documents)
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        
        fetchPosts()
    }, [userData])

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
                <Loader className="w-16 h-16 text-blue-600" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
                <Container>
                    <div className="max-w-2xl mx-auto mt-12">
                        <div className="p-6 bg-white shadow-sm rounded-xl">
                            <div className="flex items-center gap-3 p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
                                <FaFile className="flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Error loading posts</h3>
                                    <p>{error}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <Container>
                <div className="max-w-6xl py-12 mx-auto">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">My Posts</h1>
                        <p className="max-w-xl mx-auto text-gray-600">
                            Manage and review all your published articles in one place
                        </p>
                    </div>

                    {posts.length === 0 ? (
                        <div className="p-8 text-center bg-white shadow-sm rounded-xl">
                            <div className="max-w-md mx-auto">
                                <div className="mb-4 text-blue-600">
                                    <FaFile className="w-16 h-16 mx-auto opacity-50" />
                                </div>
                                <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                                    No Posts Found
                                </h3>
                                <p className="mb-6 text-gray-600">
                                    You haven't created any posts yet. Let's get started!
                                </p>
                                <Link
                                    to="/add-post"
                                    className="inline-flex items-center gap-2 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    <FaPlus className="text-lg" />
                                    Create New Post
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <div 
                                    key={post.$id} 
                                    className="transition-transform duration-300 hover:scale-105"
                                >
                                    <PostCard {...post} showStatus={true} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default MyPosts