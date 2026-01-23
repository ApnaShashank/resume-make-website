import React from 'react';

export const ClassicTemplate = ({ data, hasData, style }) => {
    const primaryColor = style?.primaryColor || '#0f766e';
    const fontSize = style?.fontSize || 12;

    return (
        <div
            className="w-[210mm] bg-white shadow-2xl relative overflow-hidden text-left"
            style={{
                fontFamily: style?.fontFamily || "'Georgia', serif",
                fontSize: `${fontSize}px`,
                minHeight: '297mm',
                lineHeight: '1.5',
            }}
        >
            {/* Top Border */}
            <div className="h-2" style={{ backgroundColor: primaryColor }}></div>

            {/* Header */}
            <div className="px-10 pt-8 pb-6 text-center border-b border-gray-200">
                <h1
                    className="font-bold text-gray-900 mb-2"
                    style={{ fontSize: `${fontSize * 2.8}px`, letterSpacing: '2px' }}
                >
                    {data.personal.fullName || "Your Name"}
                </h1>
                <h2
                    className="font-normal tracking-wide mb-4"
                    style={{ color: primaryColor, fontSize: `${fontSize * 1.4}px` }}
                >
                    {data.personal.jobTitle || "Professional Title"}
                </h2>
                <div
                    className="flex flex-wrap justify-center gap-6 text-gray-600"
                    style={{ fontSize: `${fontSize * 0.95}px` }}
                >
                    {data.personal.email && <span>{data.personal.email}</span>}
                    {data.personal.phone && <span>•</span>}
                    {data.personal.phone && <span>{data.personal.phone}</span>}
                    {data.personal.website && <span>•</span>}
                    {data.personal.website && <span>{data.personal.website}</span>}
                </div>
            </div>

            {/* Main Content */}
            <div className="px-10 py-6">
                {/* Career Objective / Summary */}
                {data.personal.summary && (
                    <div className="mb-6">
                        <h3
                            className="font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                            style={{ color: primaryColor, fontSize: `${fontSize * 1.15}px` }}
                        >
                            <span className="w-8 h-0.5" style={{ backgroundColor: primaryColor }}></span>
                            Career Objective
                            <span className="flex-1 h-0.5" style={{ backgroundColor: primaryColor }}></span>
                        </h3>
                        <p className="text-gray-700 text-justify leading-relaxed italic">
                            {data.personal.summary}
                        </p>
                    </div>
                )}

                {/* Two Column Content */}
                <div className="flex gap-8">
                    {/* Left Column (60%) */}
                    <div className="w-[60%]">
                        {/* Experience */}
                        {hasData(data.experience) && (
                            <div className="mb-6">
                                <h3
                                    className="font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
                                    style={{ color: primaryColor, fontSize: `${fontSize * 1.15}px` }}
                                >
                                    <span className="w-8 h-0.5" style={{ backgroundColor: primaryColor }}></span>
                                    Experience
                                    <span className="flex-1 h-0.5" style={{ backgroundColor: primaryColor }}></span>
                                </h3>
                                <div className="space-y-5">
                                    {data.experience.map((exp, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <h4 className="font-bold text-gray-900" style={{ fontSize: `${fontSize * 1.05}px` }}>
                                                        {exp.position}
                                                    </h4>
                                                    <div className="font-semibold" style={{ color: primaryColor }}>
                                                        {exp.company}
                                                    </div>
                                                </div>
                                                <span
                                                    className="text-gray-500 whitespace-nowrap ml-4 px-2 py-0.5 bg-gray-100 rounded"
                                                    style={{ fontSize: `${fontSize * 0.85}px` }}
                                                >
                                                    {exp.duration}
                                                </span>
                                            </div>
                                            <p
                                                className="text-gray-700 whitespace-pre-line mt-2"
                                                style={{ fontSize: `${fontSize * 0.95}px` }}
                                            >
                                                {exp.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {hasData(data.projects) && (
                            <div className="mb-6">
                                <h3
                                    className="font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
                                    style={{ color: primaryColor, fontSize: `${fontSize * 1.15}px` }}
                                >
                                    <span className="w-8 h-0.5" style={{ backgroundColor: primaryColor }}></span>
                                    Projects
                                    <span className="flex-1 h-0.5" style={{ backgroundColor: primaryColor }}></span>
                                </h3>
                                <div className="space-y-4">
                                    {data.projects.map((proj, index) => (
                                        <div key={index}>
                                            <h4 className="font-bold text-gray-900">{proj.name}</h4>
                                            {proj.role && (
                                                <div className="text-gray-600 italic" style={{ fontSize: `${fontSize * 0.9}px` }}>
                                                    {proj.role}
                                                </div>
                                            )}
                                            <p className="text-gray-700 mt-1" style={{ fontSize: `${fontSize * 0.95}px` }}>
                                                {proj.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column (40%) */}
                    <div className="w-[40%]">
                        {/* Education */}
                        {hasData(data.education) && (
                            <div className="mb-6">
                                <h3
                                    className="font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
                                    style={{ color: primaryColor, fontSize: `${fontSize * 1.15}px` }}
                                >
                                    Education
                                </h3>
                                <div className="space-y-4">
                                    {data.education.map((edu, index) => (
                                        <div key={index} className="pl-4 border-l-2" style={{ borderColor: primaryColor }}>
                                            <h4 className="font-bold text-gray-900" style={{ fontSize: `${fontSize * 0.95}px` }}>
                                                {edu.degree}
                                            </h4>
                                            <div className="text-gray-700">{edu.school}</div>
                                            <div className="text-gray-500" style={{ fontSize: `${fontSize * 0.85}px` }}>
                                                {edu.year}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Skills */}
                        {hasData(data.skills) && (
                            <div className="mb-6">
                                <h3
                                    className="font-bold uppercase tracking-wider mb-4"
                                    style={{ color: primaryColor, fontSize: `${fontSize * 1.15}px` }}
                                >
                                    Skills
                                </h3>
                                <ul className="space-y-1">
                                    {data.skills.map((skill, index) => (
                                        skill && (
                                            <li
                                                key={index}
                                                className="flex items-center gap-2 text-gray-700"
                                                style={{ fontSize: `${fontSize * 0.95}px` }}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                                                {skill}
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Certifications */}
                        {hasData(data.certifications) && (
                            <div>
                                <h3
                                    className="font-bold uppercase tracking-wider mb-4"
                                    style={{ color: primaryColor, fontSize: `${fontSize * 1.15}px` }}
                                >
                                    Certifications
                                </h3>
                                <div className="space-y-3">
                                    {data.certifications.map((cert, index) => (
                                        <div key={index}>
                                            <div className="font-semibold text-gray-900">{cert.name}</div>
                                            <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.9}px` }}>
                                                {cert.issuer} • {cert.year}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Border */}
            <div className="absolute bottom-0 left-0 right-0 h-2" style={{ backgroundColor: primaryColor }}></div>
        </div>
    );
};
