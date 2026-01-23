import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
    const sections = [
        {
            icon: <Database className="w-6 h-6" />,
            title: "Information We Collect",
            content: [
                "Personal information you provide (name, email, phone number)",
                "Resume content and professional information",
                "Usage data and analytics",
                "Device and browser information"
            ]
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "How We Use Your Information",
            content: [
                "To provide and improve our resume building services",
                "To personalize your experience",
                "To communicate with you about updates and features",
                "To analyze usage patterns and improve our platform"
            ]
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Data Security",
            content: [
                "We use industry-standard encryption (SSL/TLS)",
                "Regular security audits and updates",
                "Secure data storage with access controls",
                "No sharing of personal data with third parties without consent"
            ]
        },
        {
            icon: <UserCheck className="w-6 h-6" />,
            title: "Your Rights",
            content: [
                "Access your personal data at any time",
                "Request data deletion",
                "Export your resume data",
                "Opt-out of marketing communications"
            ]
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Cookies and Tracking",
            content: [
                "We use essential cookies for functionality",
                "Analytics cookies to improve our service",
                "You can manage cookie preferences in your browser",
                "No third-party advertising cookies"
            ]
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
                        <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-lg text-text-muted">
                        Last updated: January 20, 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Introduction */}
                    <div className="mb-12 p-6 bg-surface border border-border-main rounded-lg">
                        <p className="text-lg leading-relaxed">
                            At Rume Resume Maker, we take your privacy seriously. This Privacy Policy explains how we collect,
                            use, disclose, and safeguard your information when you use our resume building platform. Please read
                            this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do
                            not access the site.
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <div key={index} className="bg-surface border border-border-main rounded-lg p-6 hover:border-primary transition-colors">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl font-bold">{section.title}</h2>
                                </div>
                                <ul className="space-y-3">
                                    {section.content.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                            <span className="text-text-muted">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact */}
                    <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                        <h3 className="text-xl font-bold mb-3">Questions About Privacy?</h3>
                        <p className="text-text-muted mb-4">
                            If you have questions or concerns about our privacy practices, please contact us at:
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-all font-semibold"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
