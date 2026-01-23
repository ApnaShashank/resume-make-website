import React from 'react';

export const ElegantATSTemplate = ({ data, hasData, style }) => {
    const primaryColor = style?.primaryColor || '#4a5568';
    const fontSize = style?.fontSize || 11;
    const fontFamily = "'Georgia', 'Times New Roman', serif";

    return (
        <div
            className="w-[210mm] bg-white shadow-2xl text-left"
            style={{
                fontFamily: fontFamily,
                fontSize: `${fontSize}pt`,
                minHeight: '297mm',
                lineHeight: '1.6',
                padding: '20mm 25mm',
            }}
        >
            <header style={{ textAlign: 'center', marginBottom: '18pt' }}>
                <h1 style={{ fontSize: `${fontSize * 2.5}pt`, fontWeight: 'normal', color: '#1a1a1a', marginBottom: '6pt', letterSpacing: '3px', textTransform: 'uppercase' }}>
                    {data.personal.fullName || "Your Name"}
                </h1>
                {data.personal.jobTitle && (
                    <h2 style={{ fontSize: `${fontSize * 1.2}pt`, fontWeight: 'normal', color: primaryColor, marginBottom: '10pt', fontStyle: 'italic' }}>
                        {data.personal.jobTitle}
                    </h2>
                )}
                <div style={{ fontSize: `${fontSize * 0.95}pt`, color: '#555555' }}>
                    {[data.personal.email, data.personal.phone, data.personal.address, data.personal.website].filter(Boolean).join(' — ')}
                </div>
            </header>

            <div style={{ borderTop: `1px solid ${primaryColor}`, width: '60%', margin: '0 auto 18pt auto' }}></div>

            {data.personal.summary && (
                <section style={{ marginBottom: '18pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.1}pt`, fontWeight: 'bold', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8pt', textAlign: 'center' }}>
                        Profile
                    </h3>
                    <p style={{ color: '#333333', textAlign: 'justify' }}>{data.personal.summary}</p>
                </section>
            )}

            {hasData(data.experience) && (
                <section style={{ marginBottom: '18pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.1}pt`, fontWeight: 'bold', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10pt', textAlign: 'center' }}>
                        Experience
                    </h3>
                    {data.experience.map((exp, index) => (
                        <div key={index} style={{ marginBottom: '12pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ color: '#1a1a1a', fontSize: `${fontSize * 1.05}pt` }}>{exp.position}</strong>
                                <span style={{ color: primaryColor, fontStyle: 'italic' }}>{exp.duration}</span>
                            </div>
                            <div style={{ color: primaryColor, marginBottom: '4pt' }}>{exp.company}</div>
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

            {hasData(data.education) && (
                <section style={{ marginBottom: '18pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.1}pt`, fontWeight: 'bold', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10pt', textAlign: 'center' }}>
                        Education
                    </h3>
                    {data.education.map((edu, index) => (
                        <div key={index} style={{ marginBottom: '8pt', textAlign: 'center' }}>
                            <strong style={{ color: '#1a1a1a' }}>{edu.degree}</strong>
                            <div style={{ color: '#333333' }}>{edu.school}</div>
                            <div style={{ color: primaryColor, fontStyle: 'italic' }}>
                                {edu.year}{edu.gpa && ` | GPA: ${edu.gpa}`}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {hasData(data.skills) && (
                <section style={{ marginBottom: '18pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.1}pt`, fontWeight: 'bold', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8pt', textAlign: 'center' }}>
                        Skills
                    </h3>
                    <p style={{ color: '#333333', textAlign: 'center' }}>{data.skills.filter(Boolean).join(' | ')}</p>
                </section>
            )}

            {hasData(data.projects) && (
                <section style={{ marginBottom: '18pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.1}pt`, fontWeight: 'bold', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10pt', textAlign: 'center' }}>
                        Projects
                    </h3>
                    {data.projects.map((proj, index) => (
                        <div key={index} style={{ marginBottom: '8pt' }}>
                            <strong style={{ color: '#1a1a1a' }}>{proj.name}</strong>
                            {proj.year && <span style={{ color: primaryColor }}> — {proj.year}</span>}
                            {proj.role && <div style={{ color: primaryColor, fontStyle: 'italic' }}>{proj.role}</div>}
                            {proj.description && <p style={{ color: '#333333', marginTop: '2pt' }}>{proj.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            {hasData(data.certifications) && (
                <section>
                    <h3 style={{ fontSize: `${fontSize * 1.1}pt`, fontWeight: 'bold', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8pt', textAlign: 'center' }}>
                        Certifications
                    </h3>
                    <div style={{ textAlign: 'center', color: '#333333' }}>
                        {data.certifications.map((cert, index) => (
                            <div key={index} style={{ marginBottom: '4pt' }}>
                                <strong>{cert.name}</strong>
                                {cert.issuer && ` — ${cert.issuer}`}
                                {cert.year && ` (${cert.year})`}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
