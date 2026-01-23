import { Link } from "react-router-dom";
import { FileText, Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white pt-12">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                                <span className="text-white font-bold text-xl">R</span>
                            </div>
                            <span className="text-xl font-bold">Rume Resume Maker</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                            Create stunning, professional resumes in minutes. Our smart builder helps
                            job seekers craft ATS-friendly resumes that get noticed by top companies.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/templates" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Templates
                                </Link>
                            </li>
                            <li>
                                <Link to="/builder" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Resume Builder
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/help" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Professional Resume Maker. All rights reserved.
                        </p>
                        <p className="flex item-center gap-2 text-gray-500 text-sm whitespace-nowrap">
                            Made with <Heart className="w-5 h-5 text-primary" /> for job seekers everywhere
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
