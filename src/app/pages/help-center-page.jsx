import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Book, Video, MessageCircle, FileText, Zap, Shield } from 'lucide-react';

export default function HelpCenterPage() {
    const faqs = [
        {
            category: "Getting Started",
            icon: <Zap className="w-5 h-5" />,
            questions: [
                {
                    q: "How do I create my first resume?",
                    a: "Click on 'Create Your Resume' button on the homepage. You can either start from scratch or upload an existing resume to enhance it."
                },
                {
                    q: "Can I use AI to build my resume?",
                    a: "Yes! Our AI Resume Builder guides you through a conversational interface to create a professional resume in minutes."
                },
                {
                    q: "Are the templates ATS-friendly?",
                    a: "Absolutely! All our templates are designed to pass Applicant Tracking Systems while looking professional."
                }
            ]
        },
        {
            category: "Templates & Customization",
            icon: <FileText className="w-5 h-5" />,
            questions: [
                {
                    q: "How many templates are available?",
                    a: "We offer 5 professionally designed templates: Executive, Modern, Elegant, Creative, and Classic."
                },
                {
                    q: "Can I change colors and fonts?",
                    a: "Yes! You can customize colors, font sizes, and font families in the resume builder."
                },
                {
                    q: "Can I switch templates after starting?",
                    a: "Yes, you can switch between templates at any time without losing your data."
                }
            ]
        },
        {
            category: "Account & Privacy",
            icon: <Shield className="w-5 h-5" />,
            questions: [
                {
                    q: "Is my data secure?",
                    a: "Yes, we use industry-standard encryption and never share your personal information with third parties."
                },
                {
                    q: "Do I need to create an account?",
                    a: "You can create a resume without an account, but creating one allows you to save and access your resumes anytime."
                },
                {
                    q: "How do I delete my account?",
                    a: "Go to Settings > Account > Delete Account. This action is permanent and will remove all your data."
                }
            ]
        }
    ];

    const resources = [
        {
            icon: <Book className="w-6 h-6" />,
            title: "Resume Writing Guide",
            description: "Learn best practices for writing compelling resumes",
            link: "#"
        },
        {
            icon: <Video className="w-6 h-6" />,
            title: "Video Tutorials",
            description: "Watch step-by-step guides on using our platform",
            link: "#"
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            title: "Community Forum",
            description: "Connect with other job seekers and share tips",
            link: "#"
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

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-primary/10 to-transparent py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">How can we help you?</h1>
                    <p className="text-lg text-text-muted mb-8">
                        Search our knowledge base or browse categories below
                    </p>
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-border-main bg-surface focus:border-primary focus:outline-none transition-colors"
                        />
                    </div>
                </div>
            </section>

            {/* Resources */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Popular Resources</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {resources.map((resource, index) => (
                            <a
                                key={index}
                                href={resource.link}
                                className="p-6 bg-surface border border-border-main rounded-lg hover:border-primary transition-all hover:shadow-lg"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                                    {resource.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                                <p className="text-text-muted text-sm">{resource.description}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-12 px-6 bg-surface/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-8">
                        {faqs.map((category, catIndex) => (
                            <div key={catIndex}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-primary">{category.icon}</div>
                                    <h3 className="text-xl font-bold">{category.category}</h3>
                                </div>
                                <div className="space-y-4">
                                    {category.questions.map((faq, qIndex) => (
                                        <details
                                            key={qIndex}
                                            className="bg-surface border border-border-main rounded-lg p-4 hover:border-primary transition-colors"
                                        >
                                            <summary className="font-semibold cursor-pointer">
                                                {faq.q}
                                            </summary>
                                            <p className="mt-3 text-text-muted">{faq.a}</p>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Support */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
                    <p className="text-text-muted mb-8">
                        Our support team is here to assist you
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:opacity-90 transition-all font-semibold shadow-lg"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Contact Support
                    </Link>
                </div>
            </section>
        </div>
    );
}
