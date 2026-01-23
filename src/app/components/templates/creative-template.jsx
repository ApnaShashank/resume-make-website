import React from 'react';

export const CreativeTemplate = ({ data, hasData, style }) => {
    const primaryColor = style?.primaryColor || '#ea580c';
    const fontSize = style?.fontSize || 12;

    return (
        <div
            className="w-[210mm] shadow-2xl relative overflow-hidden text-left"
            style={{
                fontFamily: style?.fontFamily || "'Inter', sans-serif",
                fontSize: `${fontSize}px`,
                minHeight: '297mm',
                lineHeight: '1.4',
                background: 'linear-gradient(135deg, #fefefe 0%, #f8f8f8 100%)',
            }}
        >
            {/* Header Banner */}
            <div
                className="px-8 py-6 text-white relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                }}
            >
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="relative flex items-center gap-6">
                    {/* Photo */}
                    <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white/50 bg-white/20 flex-shrink-0">
                        {data.personal.photo ? (
                            <img src={data.personal.photo} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/50 text-xs">
                                Your Photo
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h1
                            className="font-bold uppercase tracking-wide mb-1"
                            style={{ fontSize: `${fontSize * 2.5}px` }}
                        >
                            {data.personal.fullName || "Your Name"}
                        </h1>
                        <h2
                            className="font-light tracking-wider mb-3 uppercase opacity-90"
                            style={{ fontSize: `${fontSize * 1.2}px` }}
                        >
                            {data.personal.jobTitle || "Your Title"}
                        </h2>
                        <div className="flex flex-wrap gap-4 text-sm opacity-90">
                            {data.personal.email && <span> {data.personal.email}</span>}
                            {data.personal.phone && <span> {data.personal.phone}</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex">
                {/* Left Column (65%) */}
                <div className="w-[65%] p-6">
                    {/* Summary */}
                    {data.personal.summary && (
                        <div className="mb-6">
                            <h3
                                className="font-bold uppercase tracking-wider mb-3 flex items-center gap-3"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px` }}
                            >
                                <span className="w-8 h-1 rounded" style={{ backgroundColor: primaryColor }}></span>
                                About Me
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {data.personal.summary}
                            </p>
                        </div>
                    )}

                    {/* Experience */}
                    {hasData(data.experience) && (
                        <div className="mb-6">
                            <h3
                                className="font-bold uppercase tracking-wider mb-4 flex items-center gap-3"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px` }}
                            >
                                <span className="w-8 h-1 rounded" style={{ backgroundColor: primaryColor }}></span>
                                Experience
                            </h3>
                            <div className="space-y-4">
                                {data.experience.map((exp, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg border-l-4"
                                        style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}05` }}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-gray-900" style={{ fontSize: `${fontSize * 1.05}px` }}>
                                                {exp.position}
                                            </h4>
                                            <span
                                                className="px-2 py-0.5 rounded text-white text-xs"
                                                style={{ backgroundColor: primaryColor }}
                                            >
                                                {exp.duration}
                                            </span>
                                        </div>
                                        <div className="font-medium text-gray-600 mb-2">{exp.company}</div>
                                        <p className="text-gray-700 whitespace-pre-line" style={{ fontSize: `${fontSize * 0.9}px` }}>
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {hasData(data.projects) && (
                        <div>
                            <h3
                                className="font-bold uppercase tracking-wider mb-4 flex items-center gap-3"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px` }}
                            >
                                <span className="w-8 h-1 rounded" style={{ backgroundColor: primaryColor }}></span>
                                Projects
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {data.projects.map((proj, index) => (
                                    <div
                                        key={index}
                                        className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                                    >
                                        <h4 className="font-bold text-gray-900 mb-1">{proj.name}</h4>
                                        {proj.year && (
                                            <div className="text-xs text-gray-500 mb-1">{proj.year}</div>
                                        )}
                                        <p className="text-gray-600" style={{ fontSize: `${fontSize * 0.85}px` }}>
                                            {proj.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column (35%) */}
                <div className="w-[35%] p-6 bg-gray-50">
                    {/* Education */}
                    {hasData(data.education) && (
                        <div className="mb-6">
                            <h3
                                className="font-bold uppercase tracking-wider mb-3"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1}px` }}
                            >
                                 Education
                            </h3>
                            <div className="space-y-3">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="p-3 bg-white rounded-lg shadow-sm">
                                        <div className="font-bold text-gray-900" style={{ fontSize: `${fontSize * 0.95}px` }}>
                                            {edu.degree}
                                        </div>
                                        <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.85}px` }}>
                                            {edu.school}
                                        </div>
                                        <div className="text-gray-500 text-xs mt-1">{edu.year}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {hasData(data.skills) && (
                        <div className="mb-6">
                            <h3
                                className="font-bold uppercase tracking-wider mb-3"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1}px` }}
                            >
                                 Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    skill && (
                                        <span
                                            key={index}
                                            className="px-2 py-1 rounded-full text-white font-medium"
                                            style={{
                                                backgroundColor: primaryColor,
                                                fontSize: `${fontSize * 0.75}px`,
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {hasData(data.certifications) && (
                        <div className="mb-6">
                            <h3
                                className="font-bold uppercase tracking-wider mb-3"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1}px` }}
                            >
                                 Certifications
                            </h3>
                            <div className="space-y-2">
                                {data.certifications.map((cert, index) => (
                                    <div key={index} className="p-2 bg-white rounded shadow-sm">
                                        <div className="font-semibold text-gray-900" style={{ fontSize: `${fontSize * 0.9}px` }}>
                                            {cert.name}
                                        </div>
                                        <div className="text-gray-500" style={{ fontSize: `${fontSize * 0.8}px` }}>
                                            {cert.issuer}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Contact */}
                    <div>
                        <h3
                            className="font-bold uppercase tracking-wider mb-3"
                            style={{ color: primaryColor, fontSize: `${fontSize * 1}px` }}
                        >
                             Contact
                        </h3>
                        <div className="space-y-2 text-gray-700" style={{ fontSize: `${fontSize * 0.9}px` }}>
                            {data.personal.website && (
                                <div> {data.personal.website}</div>
                            )}
                            {data.personal.address && (
                                <div> {data.personal.address}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
