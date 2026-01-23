import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Chrome } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-50 grid lg:grid-cols-2">
            {/* Left: Branding */}
            <div className="hidden lg:flex flex-col justify-between bg-blue-600 p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative">
                    <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit">
                        <ArrowLeft className="w-5 h-5" /> Back to Home
                    </Link>
                </div>

                <div className="relative">
                    <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain mb-6 bg-white rounded-2xl p-2 shadow-xl" />
                    <h1 className="text-4xl font-bold mb-4">Start Building Your Future</h1>
                    <p className="text-blue-100 text-lg max-w-md">
                        Join thousands of professionals who have landed their dream jobs with our smart resume builder.
                    </p>
                </div>

                <div className="relative text-sm text-blue-200">
                    © 2026 Resume Maker. All rights reserved.
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="lg:hidden text-center mb-8">
                        <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 hidden lg:block">Welcome back</h2>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Forgot password?</a>
                                </div>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            <Link
                                to="/dashboard"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                Sign in
                            </Link>
                        </form>

                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <Github className="w-5 h-5 mr-2" /> GitHub
                                </button>
                                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <Chrome className="w-5 h-5 mr-2 text-blue-500" /> Google
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up for free
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
