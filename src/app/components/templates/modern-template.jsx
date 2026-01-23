import React from 'react';

export const ModernTemplate = ({ data, hasData, style }) => {
    const primaryColor = style?.primaryColor || '#2563eb';
    const fontSize = style?.fontSize || 12;

    return (
        <div
            className="w-[210mm] bg-white shadow-2xl relative overflow-hidden text-left"
            style={{
                fontFamily: style?.fontFamily || "'Inter', sans-serif",
                fontSize: `${fontSize}px`,
                minHeight: '297mm',
                lineHeight: '1.4',
            }}
        >
            {/* Header Section */}
            <div className="px-8 pt-8 pb-6 border-b-4" style={{ borderColor: primaryColor }}>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h1
                            className="font-bold text-gray-900 uppercase tracking-wide mb-1"
                            style={{ fontSize: `${fontSize * 2.5}px` }}
                        >
                            {data.personal.fullName || "Your Name"}
                        </h1>
                        <h2
                            className="font-medium tracking-wide mb-3"
                            style={{ color: primaryColor, fontSize: `${fontSize * 1.3}px` }}
                        >
                            {data.personal.jobTitle || "Professional Title"}
                        </h2>
                        <div className="flex flex-wrap gap-4 text-gray-600" style={{ fontSize: `${fontSize * 0.9}px` }}>
                            {data.personal.email && <span> {data.personal.email}</span>}
                            {data.personal.phone && <span> {data.personal.phone}</span>}
                            {data.personal.website && <span> {data.personal.website}</span>}
                            {data.personal.address && <span> {data.personal.address}</span>}
                        </div>
                    </div>
                    {data.personal.photo && (
                        <div className="w-24 h-24 rounded-lg overflow-hidden ml-4 border-2" style={{ borderColor: primaryColor }}>
                            <img src={data.personal.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="flex">
                {/* Left Column - Main Content (70%) */}
                <div className="w-[70%] p-6 pr-4">
                    {/* Summary */}
                    {data.personal.summary && (
                        <div className="mb-5">
                            <h3
                                className="font-bold uppercase tracking-wider mb-2 pb-1 border-b-2"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px`, borderColor: primaryColor }}
                            >
                                Professional Summary
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-justify">
                                {data.personal.summary}
                            </p>
                        </div>
                    )}

                    {/* Experience */}
                    {hasData(data.experience) && (
                        <div className="mb-5">
                            <h3
                                className="font-bold uppercase tracking-wider mb-3 pb-1 border-b-2"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px`, borderColor: primaryColor }}
                            >
                                Work Experience
                            </h3>
                            <div className="space-y-4">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="relative pl-4 border-l-2 border-gray-200">
                                        <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-900">{exp.position}</h4>
                                            <span className="text-gray-500 text-sm whitespace-nowrap ml-2">{exp.duration}</span>
                                        </div>
                                        <div className="font-semibold mb-1" style={{ color: primaryColor, fontSize: `${fontSize * 0.95}px` }}>
                                            {exp.company}
                                        </div>
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
                        <div className="mb-5">
                            <h3
                                className="font-bold uppercase tracking-wider mb-3 pb-1 border-b-2"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px`, borderColor: primaryColor }}
                            >
                                Projects
                            </h3>
                            <div className="space-y-3">
                                {data.projects.map((proj, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-900">{proj.name}</h4>
                                            {proj.year && <span className="text-gray-500 text-sm">{proj.year}</span>}
                                        </div>
                                        {proj.role && (
                                            <div className="text-gray-600 italic mb-1" style={{ fontSize: `${fontSize * 0.85}px` }}>
                                                {proj.role}
                                            </div>
                                        )}
                                        <p className="text-gray-700" style={{ fontSize: `${fontSize * 0.9}px` }}>
                                            {proj.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Sidebar (30%) */}
                <div className="w-[30%] p-6 pl-4 bg-gray-50">
                    {/* Education */}
                    {hasData(data.education) && (
                        <div className="mb-5">
                            <h3
                                className="font-bold uppercase tracking-wider mb-3 pb-1 border-b-2"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px`, borderColor: primaryColor }}
                            >
                                Education
                            </h3>
                            <div className="space-y-3">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <h4 className="font-bold text-gray-900" style={{ fontSize: `${fontSize * 0.95}px` }}>
                                            {edu.degree}
                                        </h4>
                                        <div className="text-gray-700" style={{ fontSize: `${fontSize * 0.9}px` }}>
                                            {edu.school}
                                        </div>
                                        <div className="text-gray-500" style={{ fontSize: `${fontSize * 0.85}px` }}>
                                            {edu.year}
                                        </div>
                                        {edu.gpa && (
                                            <div className="text-gray-600 mt-1" style={{ fontSize: `${fontSize * 0.85}px` }}>
                                                GPA: {edu.gpa}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {hasData(data.skills) && (
                        <div className="mb-5">
                            <h3
                                className="font-bold uppercase tracking-wider mb-3 pb-1 border-b-2"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px`, borderColor: primaryColor }}
                            >
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {data.skills.map((skill, index) => (
                                    skill && (
                                        <span
                                            key={index}
                                            className="px-2 py-0.5 text-white rounded"
                                            style={{ backgroundColor: primaryColor, fontSize: `${fontSize * 0.8}px` }}
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
                        <div>
                            <h3
                                className="font-bold uppercase tracking-wider mb-3 pb-1 border-b-2"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px`, borderColor: primaryColor }}
                            >
                                Certifications
                            </h3>
                            <div className="space-y-2">
                                {data.certifications.map((cert, index) => (
                                    <div key={index} style={{ fontSize: `${fontSize * 0.9}px` }}>
                                        <div className="font-semibold text-gray-900">{cert.name}</div>
                                        <div className="text-gray-600">{cert.issuer}</div>
                                        <div className="text-gray-500" style={{ fontSize: `${fontSize * 0.8}px` }}>{cert.year}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
