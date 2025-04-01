import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import authService from '../appwrite/auth';
import { FaEnvelopeOpenText, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import { Button } from './index';

function VerifyEmail() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Check verification status on mount
    useEffect(() => {
        const checkVerification = async () => {
            try {
                const user = await authService.getCurrentUser();
                if(user?.emailVerification) navigate('/');
            } catch (error) {
                setError("Failed to check verification status");
            }
        };
        checkVerification();
    }, [navigate]);

    const handleResend = async () => {
        setLoading(true);
        setError('');
        try {
            await authService.sendVerificationEmail();
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex flex-col items-center mb-8">
                    <FaEnvelopeOpenText className="w-16 h-16 mb-6 text-blue-600" />
                    
                    <h1 className="mb-4 text-2xl font-semibold text-center text-gray-800">
                        Verify Your Email Address
                    </h1>
                    
                    <div className="text-center text-gray-600">
                        <p className="mb-4">
                            We've sent a verification link to your email address. 
                            Please check your inbox and spam folder.
                        </p>
                    </div>

                    {/* Status Messages */}
                    {error && (
                        <div className="w-full p-3 mb-4 text-sm text-red-700 rounded-md bg-red-50">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="flex items-center w-full p-3 mb-4 text-sm text-green-700 rounded-md bg-green-50">
                            <FaCheckCircle className="mr-2" />
                            New verification email sent!
                        </div>
                    )}

                    {/* Resend Button */}
                    <Button
                        onClick={handleResend}
                        disabled={loading}
                        className="w-full gap-2 py-2.5 font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <ImSpinner8 className="animate-spin" />
                                Sending...
                            </div>
                        ) : (
                            <>
                                Resend Verification Email
                                <FaEnvelopeOpenText />
                            </>
                        )}
                    </Button>

                    {/* Back to Login */}
                    <Link
                        to="/login"
                        className="flex items-center gap-1 mt-4 text-sm text-blue-600 hover:text-blue-800"
                    >
                        <FaArrowLeft />
                        Return to Login Page
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;