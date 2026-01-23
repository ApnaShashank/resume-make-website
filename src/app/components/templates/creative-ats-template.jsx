import React from 'react';

export const CreativeATSTemplate = ({ data, hasData, style }) => {
    const primaryColor = style?.primaryColor || '#6366f1';
    const fontSize = style?.fontSize || 11;
    const fontFamily = "'Verdana', 'Arial', sans-serif";

    return (
        <div
            className="w-[210mm] bg-white shadow-2xl text-left"
            style={{
                fontFamily: fontFamily,
                fontSize: `${fontSize}pt`,
                minHeight: '297mm',
                lineHeight: '1.5',
                padding: '18mm 22mm',
            }}
        >
            <header style={{ marginBottom: '16pt', paddingBottom: '14pt', borderBottom: `2px solid ${primaryColor}` }}>
                <h1 style={{ fontSize: `${fontSize * 2.2}pt`, fontWeight: 'bold', color: primaryColor, marginBottom: '4pt' }}>
                    {data.personal.fullName || "Your Name"}
                </h1>
                {data.personal.jobTitle && (
                    <h2 style={{ fontSize: `${fontSize * 1.25}pt`, fontWeight: '600', color: '#333333', marginBottom: '10pt' }}>
                        {data.personal.jobTitle}
                    </h2>
                )}
                <div style={{ fontSize: `${fontSize}pt`, color: '#555555' }}>
                    {[
                        data.personal.email && `Email: ${data.personal.email}`,
                        data.personal.phone && `Phone: ${data.personal.phone}`,
                        data.personal.website,
                        data.personal.address
                    ].filter(Boolean).join(' | ')}
                </div>
            </header>

            {data.personal.summary && (
                <section style={{ marginBottom: '16pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: primaryColor, marginBottom: '8pt', paddingBottom: '4pt', borderBottom: '1px solid #e5e5e5' }}>
                        ABOUT ME
                    </h3>
                    <p style={{ color: '#333333', textAlign: 'justify' }}>{data.personal.summary}</p>
                </section>
            )}

            {hasData(data.skills) && (
                <section style={{ marginBottom: '16pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: primaryColor, marginBottom: '8pt', paddingBottom: '4pt', borderBottom: '1px solid #e5e5e5' }}>
                        SKILLS & EXPERTISE
                    </h3>
                    <p style={{ color: '#333333' }}>{data.skills.filter(Boolean).join(', ')}</p>
                </section>
            )}

            {hasData(data.experience) && (
                <section style={{ marginBottom: '16pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: primaryColor, marginBottom: '10pt', paddingBottom: '4pt', borderBottom: '1px solid #e5e5e5' }}>
                        WORK EXPERIENCE
                    </h3>
                    {data.experience.map((exp, index) => (
                        <div key={index} style={{ marginBottom: '12pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ color: '#1a1a1a', fontSize: `${fontSize * 1.05}pt` }}>{exp.position}</strong>
                                <span style={{ color: '#666666' }}>{exp.duration}</span>
                            </div>
                            <div style={{ color: primaryColor, fontWeight: '600', marginBottom: '4pt' }}>{exp.company}</div>
                            {exp.description && (
                                <ul style={{ margin: '4pt 0', paddingLeft: '18pt', color: '#333333' }}>
                                    {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                        <li key={i} style={{ marginBottom: '2pt' }}>{line.replace(/^[-•]\s*/, '')}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {hasData(data.projects) && (
                <section style={{ marginBottom: '16pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: primaryColor, marginBottom: '10pt', paddingBottom: '4pt', borderBottom: '1px solid #e5e5e5' }}>
                        PROJECTS
                    </h3>
                    {data.projects.map((proj, index) => (
                        <div key={index} style={{ marginBottom: '10pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ color: '#1a1a1a' }}>{proj.name}</strong>
                                {proj.year && <span style={{ color: '#666666' }}>{proj.year}</span>}
                            </div>
                            {proj.role && <div style={{ color: primaryColor }}>{proj.role}</div>}
                            {proj.description && <p style={{ color: '#333333', marginTop: '2pt' }}>{proj.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            {hasData(data.education) && (
                <section style={{ marginBottom: '16pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: primaryColor, marginBottom: '10pt', paddingBottom: '4pt', borderBottom: '1px solid #e5e5e5' }}>
                        EDUCATION
                    </h3>
                    {data.education.map((edu, index) => (
                        <div key={index} style={{ marginBottom: '8pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ color: '#1a1a1a' }}>{edu.degree}</strong>
                                <span style={{ color: '#666666' }}>{edu.year}</span>
                            </div>
                            <div style={{ color: '#333333' }}>{edu.school}</div>
                            {edu.gpa && <div style={{ color: '#666666', fontSize: `${fontSize * 0.9}pt` }}>GPA: {edu.gpa}</div>}
                        </div>
                    ))}
                </section>
            )}

            {hasData(data.certifications) && (
                <section>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: primaryColor, marginBottom: '8pt', paddingBottom: '4pt', borderBottom: '1px solid #e5e5e5' }}>
                        CERTIFICATIONS
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '18pt', color: '#333333' }}>
                        {data.certifications.map((cert, index) => (
                            <li key={index} style={{ marginBottom: '4pt' }}>
                                <strong>{cert.name}</strong>
                                {cert.issuer && ` - ${cert.issuer}`}
                                {cert.year && ` (${cert.year})`}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};
