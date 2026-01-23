import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle, Send, MapPin, Phone, Clock } from 'lucide-react';

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email Us",
            content: "support@rumeresume.com",
            description: "We'll respond within 24 hours"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Call Us",
            content: "+1 (555) 123-4567",
            description: "Mon-Fri, 9AM-6PM EST"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Visit Us",
            content: "123 Resume Street, Suite 100",
            description: "New York, NY 10001"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Business Hours",
            content: "Monday - Friday",
            description: "9:00 AM - 6:00 PM EST"
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
                        <MessageCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">Get in Touch</h1>
                    <p className="text-lg text-text-muted">
                        Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-surface border border-border-main rounded-lg p-8">
                                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                                {submitted ? (
                                    <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                                        <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Send className="w-8 h-8 text-green-600 dark:text-green-200" />
                                        </div>
                                        <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">Message Sent!</h3>
                                        <p className="text-green-700 dark:text-green-300">
                                            Thank you for contacting us. We'll get back to you soon.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Your Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-border-main bg-app-bg focus:border-primary focus:outline-none transition-colors"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-border-main bg-app-bg focus:border-primary focus:outline-none transition-colors"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Subject</label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-border-main bg-app-bg focus:border-primary focus:outline-none transition-colors"
                                                placeholder="How can we help?"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Message</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows="6"
                                                className="w-full px-4 py-3 rounded-lg border border-border-main bg-app-bg focus:border-primary focus:outline-none transition-colors resize-none"
                                                placeholder="Tell us more about your inquiry..."
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-lg hover:opacity-90 transition-all font-semibold shadow-lg"
                                        >
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="bg-surface border border-border-main rounded-lg p-6 hover:border-primary transition-colors">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                                        {info.icon}
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                                    <p className="font-semibold mb-1">{info.content}</p>
                                    <p className="text-sm text-text-muted">{info.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
