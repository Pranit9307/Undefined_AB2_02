'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/app/providers/AuthProvider';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { register, user, error, clearError, isLoading } = useAuth();
    const router = useRouter();
    
    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            console.log("User already logged in, redirecting to createui");
            window.location.href = '/createui';
        }
    }, [user]);
    
    // Clear auth errors when component mounts
    useEffect(() => {
        clearError();
    }, [clearError]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Form validation
        if (!name || !email || !password || !confirmPassword) {
            return;
        }
        
        if (password !== confirmPassword) {
            return;
        }
        
        if (password.length < 6) {
            return;
        }
        
        if (!termsAccepted) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const success = await register(name, email, password);
            if (success) {
                console.log("Registration successful, redirecting to createui");
                // Force navigation after successful registration
                window.location.href = '/createui';
            }
        } catch (err) {
            console.error('Registration error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 page-content">
                <div className="w-full max-w-md space-y-6 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-sm">
                    <div>
                        <Link href="/" className="flex justify-center text-2xl font-bold text-orange-600 dark:text-orange-500 mb-2">
                            <span className="bg-orange-600 dark:bg-gradient-to-br dark:from-orange-600 dark:to-orange-700 text-white w-8 h-8 rounded flex items-center justify-center mr-2 text-lg">UI</span>
                            Designer
                        </Link>
                        <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-zinc-50">
                            Create your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-zinc-400">
                            Already have an account?{' '}
                            <Link href="/signin" className="font-medium text-orange-600 dark:text-orange-500 hover:text-orange-500 dark:hover:text-orange-400">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                    
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}
                    
                    <form className="mt-6 sm:mt-8 space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Full name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="h-5 w-5 text-gray-400 dark:text-zinc-500" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 dark:placeholder-zinc-500 text-gray-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-600 focus:border-orange-500 dark:focus:border-orange-600 focus:z-10 sm:text-sm"
                                        placeholder="Full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="h-5 w-5 text-gray-400 dark:text-zinc-500" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 dark:placeholder-zinc-500 text-gray-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-600 focus:border-orange-500 dark:focus:border-orange-600 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="h-5 w-5 text-gray-400 dark:text-zinc-500" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 dark:placeholder-zinc-500 text-gray-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-600 focus:border-orange-500 dark:focus:border-orange-600 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="sr-only">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="h-5 w-5 text-gray-400 dark:text-zinc-500" />
                                    </div>
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 dark:placeholder-zinc-500 text-gray-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-600 focus:border-orange-500 dark:focus:border-orange-600 focus:z-10 sm:text-sm"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 text-orange-600 dark:text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600 border-gray-300 dark:border-zinc-700 rounded"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                />
                            </div>
                            <div className="ml-2 text-sm">
                                <label htmlFor="terms" className="text-gray-900 dark:text-zinc-300">
                                    I agree to the{' '}
                                    <a href="#" className="font-medium text-orange-600 dark:text-orange-500 hover:text-orange-500 dark:hover:text-orange-400">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="font-medium text-orange-600 dark:text-orange-500 hover:text-orange-500 dark:hover:text-orange-400">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit" 
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 dark:bg-gradient-to-r dark:from-orange-700 dark:to-orange-600 dark:hover:from-orange-600 dark:hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:focus:ring-orange-600 transition-all"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignUp;