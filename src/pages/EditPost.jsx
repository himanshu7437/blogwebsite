import React, { useState, useEffect } from 'react'
import { Container, PostForm, Loader } from '../components'
import appwriteService from '../appwrite/config'
import { useParams, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { FaArrowLeft, FaExclamationCircle } from 'react-icons/fa'

function EditPost() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true)
                if (slug) {
                    const postData = await appwriteService.getPost(slug)
                    
                    if (!postData) {
                        navigate('/')
                        return
                    }

                    if (postData.userId !== userData?.$id) {
                        navigate('/')
                        return
                    }

                    setPost(postData)
                }
            } catch (error) {
                setError(error.message)
                console.error("Fetch post error:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [slug, navigate, userData])

    const handleSuccess = () => {
        // Force refresh profile page with cache busting
        navigate(`/profile/${userData.name}?refresh=${Date.now()}`)
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Loader className="w-12 h-12 text-blue-600" />
                <p className="text-gray-600 animate-pulse">
                    Loading post details...
                </p>
            </div>
        )
    }

    if (error) {
        return (
            <Container>
                <div className="max-w-2xl p-8 mx-auto mt-12 text-center bg-red-50 rounded-xl">
                    <FaExclamationCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
                    <h2 className="mb-4 text-2xl font-bold text-red-700">
                        Error Loading Post
                    </h2>
                    <p className="mb-6 text-gray-600">{error}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-6 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                    >
                        <FaArrowLeft />
                        Return to Safety
                    </button>
                </div>
            </Container>
        )
    }

    return post ? (
        <Container>
            <div className="py-8">
                <div className="max-w-4xl p-6 mx-auto bg-white shadow-sm rounded-xl">
                    <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
                        Edit Post
                    </h1>
                    <PostForm 
                        post={post} 
                        onSuccess={handleSuccess}
                        onCancel={() => navigate(-1)}
                    />
                </div>
            </div>
        </Container>
    ) : null
}

export default EditPost