import React from 'react';

export const ExecutiveTemplate = ({ data, hasData, style }) => {
    const primaryColor = style?.primaryColor || '#1e3a5f';
    const fontSize = style?.fontSize || 12;

    return (
        <div
            className="w-[210mm] bg-white shadow-2xl relative overflow-hidden text-left flex"
            style={{
                fontFamily: style?.fontFamily || "'Inter', sans-serif",
                fontSize: `${fontSize}px`,
                minHeight: '297mm',
                lineHeight: '1.4',
            }}
        >
            {/* Left Sidebar */}
            <div
                className="w-[35%] text-white p-6 flex flex-col"
                style={{ backgroundColor: primaryColor }}
            >
                {/* Profile Image */}
                <div className="w-28 h-28 bg-white/20 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white/30">
                    {data.personal.photo ? (
                        <img src={data.personal.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/50 text-xs">
                            Photo
                        </div>
                    )}
                </div>

                {/* Contact */}
                <div className="mb-6">
                    <h3
                        className="font-bold uppercase tracking-wider mb-3 pb-2 border-b border-white/30"
                        style={{ fontSize: `${fontSize * 0.95}px` }}
                    >
                        Contact
                    </h3>
                    <div className="space-y-2" style={{ fontSize: `${fontSize * 0.9}px` }}>
                        {data.personal.email && (
                            <div className="flex items-start gap-2">
                                <span>✉</span>
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-2">
                                <span>☎</span>
                                <span>{data.personal.phone}</span>
                            </div>
                        )}
                        {data.personal.website && (
                            <div className="flex items-start gap-2">
                                <span>🌐</span>
                                <span className="break-all">{data.personal.website}</span>
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-start gap-2">
                                <span>📍</span>
                                <span>{data.personal.address}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills */}
                {hasData(data.skills) && (
                    <div className="mb-6">
                        <h3
                            className="font-bold uppercase tracking-wider mb-3 pb-2 border-b border-white/30"
                            style={{ fontSize: `${fontSize * 0.95}px` }}
                        >
                            Skills
                        </h3>
                        <div className="space-y-2">
                            {data.skills.map((skill, index) => (
                                skill && (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="flex-1">
                                            <div className="text-sm mb-1">{skill}</div>
                                            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-white rounded-full"
                                                    style={{ width: `${80 + Math.random() * 20}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {hasData(data.education) && (
                    <div className="mb-6">
                        <h3
                            className="font-bold uppercase tracking-wider mb-3 pb-2 border-b border-white/30"
                            style={{ fontSize: `${fontSize * 0.95}px` }}
                        >
                            Education
                        </h3>
                        <div className="space-y-3">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <div className="font-semibold" style={{ fontSize: `${fontSize * 0.95}px` }}>
                                        {edu.degree}
                                    </div>
                                    <div className="opacity-80" style={{ fontSize: `${fontSize * 0.85}px` }}>
                                        {edu.school}
                                    </div>
                                    <div className="opacity-60" style={{ fontSize: `${fontSize * 0.8}px` }}>
                                        {edu.year}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {hasData(data.certifications) && (
                    <div className="mt-auto">
                        <h3
                            className="font-bold uppercase tracking-wider mb-3 pb-2 border-b border-white/30"
                            style={{ fontSize: `${fontSize * 0.95}px` }}
                        >
                            Certifications
                        </h3>
                        <div className="space-y-2">
                            {data.certifications.map((cert, index) => (
                                <div key={index} style={{ fontSize: `${fontSize * 0.85}px` }}>
                                    <div className="font-medium">{cert.name}</div>
                                    <div className="opacity-70">{cert.issuer}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="w-[65%] p-8">
                {/* Header */}
                <div className="mb-6 pb-4 border-b-2" style={{ borderColor: primaryColor }}>
                    <h1
                        className="font-light mb-1"
                        style={{ fontSize: `${fontSize * 2.8}px`, color: primaryColor }}
                    >
                        {data.personal.fullName || "Your Name"}
                    </h1>
                    <h2
                        className="font-medium text-gray-600 uppercase tracking-widest"
                        style={{ fontSize: `${fontSize * 1.1}px` }}
                    >
                        {data.personal.jobTitle || "Professional Title"}
                    </h2>
                </div>

                {/* Summary */}
                {data.personal.summary && (
                    <div className="mb-6">
                        <h3
                            className="font-bold uppercase tracking-wider mb-3"
                            style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px` }}
                        >
                            Profile
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-justify">
                            {data.personal.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {hasData(data.experience) && (
                    <div className="mb-6">
                        <h3
                            className="font-bold uppercase tracking-wider mb-4"
                            style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px` }}
                        >
                            Work Experience
                        </h3>
                        <div className="space-y-5">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="relative pl-5 border-l-2 border-gray-200">
                                    <div
                                        className="absolute left-[-6px] top-0 w-2.5 h-2.5 rounded-full"
                                        style={{ backgroundColor: primaryColor }}
                                    ></div>
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h4
                                                className="font-bold text-gray-900"
                                                style={{ fontSize: `${fontSize * 1.05}px` }}
                                            >
                                                {exp.position}
                                            </h4>
                                            <div className="font-medium" style={{ color: primaryColor }}>
                                                {exp.company}
                                            </div>
                                        </div>
                                        <span
                                            className="text-gray-500 whitespace-nowrap text-sm px-2 py-0.5 rounded"
                                            style={{ backgroundColor: `${primaryColor}15` }}
                                        >
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 mt-2 whitespace-pre-line" style={{ fontSize: `${fontSize * 0.95}px` }}>
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
                            className="font-bold uppercase tracking-wider mb-4"
                            style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px` }}
                        >
                            Projects
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {data.projects.map((proj, index) => (
                                <div
                                    key={index}
                                    className="p-3 rounded-lg border"
                                    style={{ borderColor: `${primaryColor}30` }}
                                >
                                    <h4 className="font-bold text-gray-900">{proj.name}</h4>
                                    {proj.role && (
                                        <div className="text-gray-500 text-sm italic">{proj.role}</div>
                                    )}
                                    <p className="text-gray-700 mt-1" style={{ fontSize: `${fontSize * 0.9}px` }}>
                                        {proj.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
