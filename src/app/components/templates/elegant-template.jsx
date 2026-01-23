import React from 'react';

export const ElegantTemplate = ({ data, hasData, style }) => {
    const primaryColor = style?.primaryColor || '#7c3aed';
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
            {/* Header */}
            <div className="px-10 pt-10 pb-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h1
                            className="font-light tracking-wider mb-2"
                            style={{ fontSize: `${fontSize * 3}px`, letterSpacing: '4px' }}
                        >
                            {data.personal.fullName || "Your Name"}
                        </h1>
                        <h2
                            className="font-normal tracking-wide"
                            style={{ color: primaryColor, fontSize: `${fontSize * 1.3}px` }}
                        >
                            {data.personal.jobTitle || "Professional Title"}
                        </h2>
                    </div>
                    <div className="text-right" style={{ fontSize: `${fontSize * 0.9}px` }}>
                        {data.personal.email && <div className="text-gray-600">{data.personal.email}</div>}
                        {data.personal.phone && <div className="text-gray-600">{data.personal.phone}</div>}
                        {data.personal.website && <div className="text-gray-600">{data.personal.website}</div>}
                        {data.personal.address && <div className="text-gray-500">{data.personal.address}</div>}
                    </div>
                </div>
            </div>

            {/* Decorative Line */}
            <div className="mx-10 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Main Content with Timeline */}
            <div className="px-10 py-6 relative">
                {/* Vertical Line */}
                <div
                    className="absolute left-14 top-10 bottom-10 w-0.5"
                    style={{ backgroundColor: `${primaryColor}30` }}
                ></div>

                {/* Summary */}
                {data.personal.summary && (
                    <div className="mb-8 relative pl-10">
                        <div
                            className="absolute left-[-5px] top-2 w-3 h-3 rounded-full border-2 bg-white"
                            style={{ borderColor: primaryColor }}
                        ></div>
                        <h3
                            className="font-semibold tracking-wider mb-3 uppercase"
                            style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px` }}
                        >
                            About Me
                        </h3>
                        <p className="text-gray-700 leading-relaxed italic">
                            "{data.personal.summary}"
                        </p>
                    </div>
                )}

                {/* Experience */}
                {hasData(data.experience) && (
                    <div className="mb-8 relative pl-10">
                        <div
                            className="absolute left-[-5px] top-2 w-3 h-3 rounded-full border-2 bg-white"
                            style={{ borderColor: primaryColor }}
                        ></div>
                        <h3
                            className="font-semibold tracking-wider mb-4 uppercase"
                            style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px` }}
                        >
                            Professional Experience
                        </h3>
                        <div className="space-y-5">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-gray-900" style={{ fontSize: `${fontSize * 1.05}px` }}>
                                            {exp.position}
                                        </h4>
                                        <span
                                            className="text-sm italic"
                                            style={{ color: primaryColor }}
                                        >
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <div className="font-medium text-gray-600 mb-2">{exp.company}</div>
                                    <p className="text-gray-700 whitespace-pre-line" style={{ fontSize: `${fontSize * 0.95}px` }}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {hasData(data.education) && (
                    <div className="mb-8 relative pl-10">
                        <div
                            className="absolute left-[-5px] top-2 w-3 h-3 rounded-full border-2 bg-white"
                            style={{ borderColor: primaryColor }}
                        ></div>
                        <h3
                            className="font-semibold tracking-wider mb-4 uppercase"
                            style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px` }}
                        >
                            Education
                        </h3>
                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={index} className="flex justify-between items-baseline">
                                    <div>
                                        <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                                        <div className="text-gray-600">{edu.school}</div>
                                    </div>
                                    <span className="text-gray-500 text-sm">{edu.year}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Two Column Bottom */}
                <div className="flex gap-10 pl-10">
                    {/* Skills */}
                    {hasData(data.skills) && (
                        <div className="flex-1">
                            <h3
                                className="font-semibold tracking-wider mb-3 uppercase"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px` }}
                            >
                                Skills & Expertise
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    skill && (
                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full border text-gray-700"
                                            style={{
                                                borderColor: primaryColor,
                                                fontSize: `${fontSize * 0.85}px`,
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
                        <div className="flex-1">
                            <h3
                                className="font-semibold tracking-wider mb-3 uppercase"
                                style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px` }}
                            >
                                Certifications
                            </h3>
                            <div className="space-y-2">
                                {data.certifications.map((cert, index) => (
                                    <div key={index}>
                                        <div className="font-medium text-gray-900">{cert.name}</div>
                                        <div className="text-gray-600 text-sm">{cert.issuer} • {cert.year}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Projects */}
                {hasData(data.projects) && (
                    <div className="mt-8 pl-10">
                        <h3
                            className="font-semibold tracking-wider mb-4 uppercase"
                            style={{ color: primaryColor, fontSize: `${fontSize * 1.1}px` }}
                        >
                            Notable Projects
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {data.projects.map((proj, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-lg"
                                    style={{ backgroundColor: `${primaryColor}08` }}
                                >
                                    <h4 className="font-bold text-gray-900 mb-1">{proj.name}</h4>
                                    {proj.role && (
                                        <div className="text-gray-500 text-sm italic mb-2">{proj.role}</div>
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
        </div>
    );
};
