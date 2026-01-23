import { Link } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { Star } from 'lucide-react';
import { useState } from 'react';

const templates = [
    // ATS-Optimized Templates
    {
        id: 'modern-ats',
        name: 'Modern ATS',
        description: 'ATS-optimized single-column design with Arial font. Perfect for job portals. Score: 90+',
        category: 'ats',
        image: '/templates/template-2.png',
        tags: ['ATS 90+', 'Single Column', 'Job Portals'],
        popular: true,
        isATS: true
    },
    {
        id: 'classic-ats',
        name: 'Classic ATS',
        description: 'Traditional Times New Roman layout optimized for ATS systems. Score: 90+',
        category: 'ats',
        image: '/templates/template-5.png',
        tags: ['ATS 90+', 'Traditional', 'Professional'],
        popular: true,
        isATS: true
    },
    {
        id: 'executive-ats',
        name: 'Executive ATS',
        description: 'Professional Calibri-based design for executives. ATS-friendly. Score: 90+',
        category: 'ats',
        image: '/templates/template-1.png',
        tags: ['ATS 90+', 'Executive', 'Calibri'],
        popular: false,
        isATS: true
    },
    {
        id: 'elegant-ats',
        name: 'Elegant ATS',
        description: 'Georgia serif font with centered elegant design. ATS-optimized. Score: 90+',
        category: 'ats',
        image: '/templates/template-3.png',
        tags: ['ATS 90+', 'Elegant', 'Serif'],
        popular: false,
        isATS: true
    },
    {
        id: 'creative-ats',
        name: 'Creative ATS',
        description: 'Modern Verdana design with clean sections. ATS-friendly. Score: 90+',
        category: 'ats',
        image: '/templates/template-4.png',
        tags: ['ATS 90+', 'Modern', 'Clean'],
        popular: false,
        isATS: true
    },
    // Original Visual Templates
    {
        id: 'executive',
        name: 'Executive Visual',
        description: 'Bold two-column design with visual elements for direct submissions.',
        category: 'professional',
        image: '/templates/template-1.png',
        tags: ['Visual Design', 'Executive', 'Two-Column'],
        popular: false,
        isATS: false
    },
    {
        id: 'modern',
        name: 'Modern Visual',
        description: 'Clean two-column structured design with colorful skill tags.',
        category: 'professional',
        image: '/templates/template-2.png',
        tags: ['Visual Design', 'Modern', 'Colorful'],
        popular: false,
        isATS: false
    },
    {
        id: 'elegant',
        name: 'Elegant Visual',
        description: 'Sophisticated two-column design with gradient accents.',
        category: 'professional',
        image: '/templates/template-3.png',
        tags: ['Visual Design', 'Elegant', 'Gradient'],
        popular: false,
        isATS: false
    },
    {
        id: 'creative',
        name: 'Creative Visual',
        description: 'Fresh creative layout with visual elements for creative roles.',
        category: 'beginner',
        image: '/templates/template-4.png',
        tags: ['Visual Design', 'Creative', 'Fresh'],
        popular: false,
        isATS: false
    },
    {
        id: 'classic',
        name: 'Classic Visual',
        description: 'Classic two-column design with bold teal accents.',
        category: 'beginner',
        image: '/templates/template-5.png',
        tags: ['Visual Design', 'Classic', 'Bold'],
        popular: false,
        isATS: false
    }
];

export default function TemplatesPage() {
    const [filter, setFilter] = useState('all');

    const filteredTemplates = templates.filter(t =>
        filter === 'all' ? true : t.category === filter
    );

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Choose Your Perfect Resume Template
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Professionally designed, ATS-friendly templates to help you stand out.
                        </p>
                    </div>

                    {/* Filter */}
                    <div className="flex justify-center gap-4 mb-12">
                        {['all', 'ats', 'professional', 'beginner'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all capitalize ${filter === f
                                    ? f === 'ats' 
                                        ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                                        : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {f === 'ats' ? 'ATS 90+' : `${f} Templates`}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTemplates.map((template) => (
                            <div
                                key={template.id}
                                className="group relative bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all overflow-hidden"
                            >
                                {template.popular && (
                                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-current" /> Popular
                                    </div>
                                )}

                                <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
                                    <img
                                        src={template.image}
                                        alt={template.name}
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Link
                                            to={`/builder?template=${template.id}`}
                                            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                                        >
                                            Use This Template
                                        </Link>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {template.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                                        {template.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
