import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function TermsOfServicePage() {
    const terms = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using Rume Resume Maker, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service."
        },
        {
            title: "2. Use License",
            content: "We grant you a personal, non-transferable, non-exclusive license to use our platform for creating and managing your resumes. You may not modify, distribute, or reverse-engineer any part of our service."
        },
        {
            title: "3. User Accounts",
            content: "You are responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account. Notify us immediately of any unauthorized use."
        },
        {
            title: "4. Content Ownership",
            content: "You retain all rights to the resume content you create. We do not claim ownership of your resumes. However, by using our service, you grant us a license to store and process your content to provide our services."
        },
        {
            title: "5. Prohibited Uses",
            content: "You may not use our service for any illegal purposes, to transmit harmful code, to violate intellectual property rights, or to harass other users. We reserve the right to terminate accounts that violate these terms."
        },
        {
            title: "6. Service Availability",
            content: "We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. We reserve the right to modify or discontinue features with or without notice. We are not liable for any service interruptions."
        },
        {
            title: "7. Limitation of Liability",
            content: "Rume Resume Maker shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service."
        },
        {
            title: "8. Changes to Terms",
            content: "We reserve the right to modify these terms at any time. We will notify users of significant changes via email. Continued use of the service after changes constitutes acceptance of the new terms."
        }
    ];

    return (
        <div className="min-h-screen bg-app-bg text-text-main transition-colors duration-300">
            {/* Header */}
            <header className="bg-surface border-b border-border-main py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">R</span>
                        </div>
                        <span className="text-xl font-bold">Rume Resume Maker</span>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="bg-gradient-to-b from-primary/10 to-transparent py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">Terms of Service</h1>
                    <p className="text-lg text-text-muted">
                        Last updated: January 20, 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Introduction */}
                    <div className="mb-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg mb-2">Please Read Carefully</h3>
                                <p className="text-text-muted">
                                    These Terms of Service govern your use of Rume Resume Maker. By using our platform,
                                    you agree to comply with these terms. If you have any questions, please contact our
                                    support team.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="space-y-6">
                        {terms.map((term, index) => (
                            <div key={index} className="bg-surface border border-border-main rounded-lg p-6 hover:border-primary transition-colors">
                                <h2 className="text-xl font-bold mb-3">{term.title}</h2>
                                <p className="text-text-muted leading-relaxed">{term.content}</p>
                            </div>
                        ))}
                    </div>

                    {/* Summary Cards */}
                    <div className="mt-12 grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                                <h3 className="font-bold text-green-900 dark:text-green-100">You Can</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                                <li>• Create unlimited resumes</li>
                                <li>• Export in multiple formats</li>
                                <li>• Use AI assistance</li>
                                <li>• Customize templates</li>
                            </ul>
                        </div>
                        <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <XCircle className="w-6 h-6 text-red-600" />
                                <h3 className="font-bold text-red-900 dark:text-red-100">You Cannot</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
                                <li>• Share your account</li>
                                <li>• Resell our templates</li>
                                <li>• Scrape our content</li>
                                <li>• Violate copyright laws</li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="mt-12 p-6 bg-surface border border-border-main rounded-lg text-center">
                        <h3 className="text-xl font-bold mb-3">Questions About These Terms?</h3>
                        <p className="text-text-muted mb-6">
                            Our legal team is here to help clarify any questions you may have.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-all font-semibold"
                        >
                            Contact Legal Team
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
