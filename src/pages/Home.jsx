import { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard, Loader } from '../components'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await appwriteService.getPosts([
                    Query.equal("status", "active"),
                    Query.orderDesc("$createdAt")
                ])
                setPosts(posts?.documents || [])
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen">
                <Loader message="Loading public posts..." />
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
                        Error: {error}
                    </div>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen py-8 bg-gray-50'>
            <Container>
                <div className='mb-12 text-center'>
                    <h1 className='mb-4 text-3xl font-bold md:text-4xl text-gray-900'>
                        {posts.length ? 'Latest Posts' : 'No Posts Yet'}
                    </h1>
                    <p className='max-w-xl mx-auto text-gray-600'>
                        {posts.length 
                            ? 'Explore recent public articles from our community'
                            : 'Be the first to share your knowledge with the community'}
                    </p>
                </div>

                {posts.length > 0 ? (
                    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                        {posts.map((post) => (
                            <PostCard 
                                key={post.$id} 
                                {...post} 
                                className="hover:shadow-lg transition-shadow duration-200"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6 mt-8 text-center">
                        <p className="text-gray-600">
                            {authStatus 
                                ? "Ready to create your first post?" 
                                : "Sign in to start creating posts"}
                        </p>
                        <div className="flex gap-4">
                            {authStatus ? (
                                <button
                                    onClick={() => navigate('/add-post')}
                                    className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700"
                                >
                                    Create New Post
                                </button>
                            ) : (
                                <>
                                    <Link 
                                        to="/login"
                                        className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                    >
                                        Sign In
                                    </Link>
                                    <Link 
                                        to="/signup"
                                        className="px-6 py-3 text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50"
                                    >
                                        Create Account
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Home