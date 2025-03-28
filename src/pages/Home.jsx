import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard, Loader } from '../components'
import { Link } from 'react-router'
import myImage from '../images/HomePage.jpg'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await appwriteService.getPosts()
                if (posts) {
                    setPosts(posts.documents)
                }
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
            <div className="flex items-center justify-center w-full h-screen">
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                        Error loading posts: {error}
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
                <Container>
                    <div className="flex flex-col items-center px-4 py-12 text-center">
                        <img 
                            src={myImage} 
                            alt="No posts" 
                            className="mb-8 h-100 w-180"
                        />
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">
                            Welcome to Our Blog
                        </h1>
                        <p className="max-w-2xl mb-8 text-lg text-gray-600">
                            Discover amazing content and share your thoughts with the community. 
                            Join us to start reading or create your first post!
                        </p>
                        <div className="flex gap-4">
                            <Link 
                                to="/login"
                                className="px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Sign In
                            </Link>
                            <Link 
                                to="/signup"
                                className="px-6 py-3 text-blue-600 transition-colors border-2 border-blue-600 rounded-lg hover:bg-blue-50"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen py-8 bg-gray-50'>
            <Container>
                <div className='mb-12 text-center'>
                    <h1 className='mb-4 text-4xl font-bold text-gray-900'>
                        Latest Posts
                    </h1>
                    <p className='max-w-xl mx-auto text-gray-600'>
                        Explore the most recent articles from our community. Click on any post to read more.
                    </p>
                </div>
                
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {posts.map((post) => (
                        <div 
                            key={post.$id} 
                            className='transition duration-300 transform hover:scale-105'
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>

                <div className='mt-12 text-center'>
                    <h3 className='mb-4 text-xl font-semibold text-gray-900'>
                        Want to see more?
                    </h3>
                    <p className='mb-4 text-gray-600'>
                        Browse through our archive or create your own post!
                    </p>
                    <Link 
                        to="/add-post"
                        className="inline-block px-6 py-3 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                    >
                        Create New Post
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default Home