import React, { useState, useEffect } from 'react'
import { Container, PostForm, Loader } from '../components'
import appwriteService from '../appwrite/config'
import { useParams, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

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
                if (slug) {
                    const postData = await appwriteService.getPost(slug)
                    if (postData) {
                        // Check if current user is the author
                        if (postData.userId !== userData?.$id) {
                            navigate('/')
                            return
                        }
                        setPost(postData)
                    } else {
                        navigate('/')
                    }
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [slug, navigate, userData])

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <Container>
                <div className="p-4 mt-8 mb-4 text-sm text-center text-red-700 bg-red-100 rounded-lg">
                    Error loading post: {error}
                </div>
                <div className="text-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="font-medium text-blue-600 hover:text-blue-800"
                    >
                        Go Back
                    </button>
                </div>
            </Container>
        )
    }

    return post ? (
        <Container>
            <div className="py-8">
                <h1 className="mb-8 text-3xl font-bold text-center">Edit Post</h1>
                <PostForm post={post} />
            </div>
        </Container>
    ) : null
}

export default EditPost