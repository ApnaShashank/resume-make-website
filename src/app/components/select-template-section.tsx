import CircularGallery from './ui/CircularGallery';
import { Link } from 'react-router-dom';

const templateItems = [
    // ATS Templates
    {
        image: '/templates/template-2.png',
        text: 'Modern ATS',
        templateId: 'modern-ats'
    },
    {
        image: '/templates/template-5.png',
        text: 'Classic ATS',
        templateId: 'classic-ats'
    },
    {
        image: '/templates/template-1.png',
        text: 'Executive ATS',
        templateId: 'executive-ats'
    },
    {
        image: '/templates/template-3.png',
        text: 'Elegant ATS',
        templateId: 'elegant-ats'
    },
    {
        image: '/templates/template-4.png',
        text: 'Creative ATS',
        templateId: 'creative-ats'
    },
    // Original Templates
    {
        image: '/templates/template-1.png',
        text: 'Executive',
        templateId: 'executive'
    },
    {
        image: '/templates/template-2.png',
        text: 'Modern',
        templateId: 'modern'
    },
    {
        image: '/templates/template-3.png',
        text: 'Elegant',
        templateId: 'elegant'
    },
    {
        image: '/templates/template-4.png',
        text: 'Creative',
        templateId: 'creative'
    },
    {
        image: '/templates/template-5.png',
        text: 'Classic',
        templateId: 'classic'
    }
];

export function SelectTemplateSection() {
    return (
        <section className="relative bg-gradient-to-b from-gray-900 to-gray-950 py-16 lg:py-24 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-12 px-6">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Select Your Template
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Browse through our collection of professionally designed resume templates.
                        Drag to explore and find the perfect style for your career.
                    </p>
                </div>

                {/* Circular Gallery */}
                <div style={{ height: '500px', position: 'relative' }}>
                    <CircularGallery
                        items={templateItems}
                        bend={3}
                        textColor="#ffffff"
                        borderRadius={0.05}
                        scrollSpeed={2}
                        scrollEase={0.05}
                        font="bold 24px Inter, sans-serif"
                    />
                </div>

                {/* Template Cards Grid (Clickable) */}
                <div className="mt-12 px-6">
                    <h3 className="text-2xl font-semibold text-white text-center mb-8">
                        Click to Use Template
                    </h3>
                    <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {templateItems.map((template) => (
                            <Link
                                key={template.templateId}
                                to={`/builder?template=${template.templateId}`}
                                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img
                                        src={template.image}
                                        alt={`${template.text} Template`}
                                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                                    <span className="text-white font-semibold text-sm bg-primary px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Use {template.text}
                                    </span>
                                </div>
                                <div className="p-3 text-center bg-gray-50">
                                    <span className="text-gray-900 font-medium text-sm">{template.text}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12 px-6">
                    <Link
                        to="/templates"
                        className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 font-semibold"
                    >
                        View All Templates
                    </Link>
                </div>
            </div>
        </section>
    );
}
