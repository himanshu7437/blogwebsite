import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import appwriteService from "../appwrite/config";
import { Button, Container, Loader, LikeButton, CommentSection } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [authorProfile, setAuthorProfile] = useState(null);
    const [currentProfile, setcurrentProfile] = useState(null);
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (slug) {
                    const post = await appwriteService.getPost(slug);
                    if (post) {
                        setPost(post);


                    const profile = await appwriteService.getProfileByUserId(post.userId);
                    setAuthorProfile(profile);
                    
                    if (userData) {
                        try {
                            const NewProfile = await appwriteService.getProfileByUserId(userData.$id);
                            setcurrentProfile(NewProfile);
                        } catch (error) {
                            console.error("Error fetching current profile:", error);
                            setcurrentProfile(null);
                        }
                    }

                    
                    } else {
                        navigate("/");
                    }
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug, navigate, userData]);

    const deletePost = async () => {
        try {
            const status = await appwriteService.deletePost(post.$id);
            if (status) {
                await appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                        Error loading post: {error}
                    </div>
                    <Button
                        onClick={() => navigate(-1)}
                        className="text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <FaArrowLeft className="mr-2" /> Go Back
                    </Button>
                </Container>
            </div>
        );
    }

    return post ? (
        <div className="min-h-screen py-12 bg-gray-50">
            <Container>
                <div className="max-w-4xl mx-auto overflow-hidden bg-white shadow-sm rounded-xl">
                    {/* Header Section */}
                    <div className="relative group">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="object-cover object-center w-full h-96"
                            onError={(e) => {
                                e.target.src = '/placeholder-image.jpg';
                            }}
                        />
                        
                        {isAuthor && (
                            <div className="absolute flex gap-3 top-4 right-4">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
                                        <FaEdit /> Edit
                                    </Button>
                                </Link>
                                <Button 
                                    onClick={deletePost}
                                    className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                                >
                                    <FaTrash /> Delete
                                </Button>
                            </div>
                        )}
                    </div>
    
                    {/* Content Section */}
                    <div className="p-8">
                        <div className="mb-8">
                            <Button
                                onClick={() => navigate(-1)}
                                className="flex items-center mb-6 text-blue-600 hover:text-blue-800"
                            >
                                <FaArrowLeft className="mr-2" /> Back to Posts
                            </Button>
                            
                            <h1 className="mb-4 text-4xl font-bold text-gray-900">
                                {post.title}
                            </h1>
                            
                            <div className="flex items-center mb-6 text-sm text-gray-500">
                                <span className="mr-4">
                                    Posted by:{" "}
                                    {authorProfile ? (
                                        <Link 
                                            to={`/profile/${authorProfile.username}`}
                                            className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                                        >
                                            {authorProfile.username}
                                        </Link>
                                    ) : (
                                        "Loading author..."
                                    )}
                                </span>
                                <span>
                                    {new Date(post.$createdAt).toLocaleDateString()}
                                </span>
                            </div>
    
                            {/* Like Button */}
                            <div className="mb-6">
                                <LikeButton postId={post.$id} />
                            </div>
                        </div>
    
                        {/* Article Content */}
                        <article className="pt-8 prose prose-lg border-t max-w-none">
                            {parse(post.content)}
                        </article>
    
    
                    </div>
                    
                </div>
                
                {/* Comments Section - Added at the End with Spacing */}
                <div className="pt-8 mt-12">
                    <CommentSection postId={post.$id} username={currentProfile?.username || "Anonymous"} />
                </div>
            </Container>
        </div>
    ) : null;
    
}