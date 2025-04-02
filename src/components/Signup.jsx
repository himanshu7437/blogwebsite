import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router'
import { Button, Input } from './index'
import { useForm } from 'react-hook-form'
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit } = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const create = async(data) => {
        setError("")
        setIsSubmitting(true);
        try {
            const userData = await authService.createAccount(data)
            navigate("/verify-email")
        } catch (error) {
            setError(error.message)
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex flex-col items-center mb-8">
                    <div className="mb-4 text-xl font-bold">
                        BlogSphere
                    </div>
                    <h1 className="mb-2 text-2xl font-semibold text-gray-800">Create your account</h1>
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 transition-colors hover:text-blue-800"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                {error && <div className="p-3 mb-4 text-sm text-red-700 rounded-md bg-red-50">{error}</div>}

                <form onSubmit={handleSubmit(create)} className="space-y-4">
                    <div className="space-y-3">
                        <div className="relative">
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                {...register("name", { required: true })}
                                className="pl-9 pr-4 py-2.5 w-full"
                            />
                            <FaUser className="absolute text-sm text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        </div>

                        <div className="relative">
                            <Input
                                label="Email address"
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => 
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Invalid email address",
                                    }
                                })}
                                className="pl-9 pr-4 py-2.5 w-full"
                            />
                            <FaEnvelope className="absolute text-sm text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        </div>

                        <div className="relative">
                            <Input
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password", { required: true })}
                                className="pl-9 pr-9 py-2.5 w-full"
                            />
                            <FaLock className="absolute text-sm text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-blue-600"
                            >
                                {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className={`w-full ${
                            isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        } text-white py-2.5 rounded-md transition-colors font-medium`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                                <span>Creating Account...</span>
                            </div>
                        ) : (
                            'Create Account'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Signup