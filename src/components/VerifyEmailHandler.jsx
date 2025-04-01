import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import authService from '../appwrite/auth';
import { ImSpinner8 } from 'react-icons/im';

export default function VerifyEmailHandler() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            const userId = params.get('userId');
            const secret = params.get('secret');
            
            if (!userId || !secret) {
                setError('Invalid verification link - missing parameters');
                setLoading(false);
                return;
            }

            try {
                // Decode URL-encoded secret
                const decodedSecret = decodeURIComponent(secret);
                
                await authService.verifyEmail(userId, decodedSecret);
                
                // Clear existing sessions and redirect
                await authService.logout();
                navigate('/login?verified=true', { replace: true });
                
            } catch (error) {
                console.error('Verification error:', error);
                const errorMessage = error?.message?.includes('invalid') 
                    ? 'Invalid or expired verification link'
                    : 'Verification failed. Please try again.';
                
                navigate(`/verify-email?error=${encodeURIComponent(errorMessage)}`, { 
                    state: { userId },
                    replace: true 
                });
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [params, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
                {loading ? (
                    <div className="flex flex-col items-center gap-4">
                        <ImSpinner8 className="w-12 h-12 text-blue-600 animate-spin" />
                        <p className="text-gray-600">Verifying your email...</p>
                    </div>
                ) : (
                    error && (
                        <div className="p-4 text-red-600 rounded-lg bg-red-50">
                            {error}
                            <div className="mt-4">
                                <button
                                    onClick={() => navigate('/verify-email')}
                                    className="text-blue-600 hover:underline"
                                >
                                    Try resending verification email
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}