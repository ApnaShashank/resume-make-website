import React from 'react';

export const ModernATSTemplate = ({ data, hasData, style }) => {
    const primaryColor = style?.primaryColor || '#2563eb';
    const fontSize = style?.fontSize || 11;
    const fontFamily = "'Arial', 'Helvetica', sans-serif";

    return (
        <div
            className="w-[210mm] bg-white shadow-2xl text-left"
            style={{
                fontFamily: fontFamily,
                fontSize: `${fontSize}pt`,
                minHeight: '297mm',
                lineHeight: '1.5',
                padding: '15mm 20mm',
            }}
        >
            {/* Header - Name and Contact */}
            <header style={{ marginBottom: '12pt' }}>
                <h1
                    style={{
                        fontSize: `${fontSize * 2}pt`,
                        fontWeight: 'bold',
                        color: '#000000',
                        marginBottom: '4pt',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                    }}
                >
                    {data.personal.fullName || "Your Name"}
                </h1>
                
                {data.personal.jobTitle && (
                    <h2
                        style={{
                            fontSize: `${fontSize * 1.3}pt`,
                            fontWeight: '600',
                            color: primaryColor,
                            marginBottom: '8pt',
                        }}
                    >
                        {data.personal.jobTitle}
                    </h2>
                )}
                
                <div style={{ fontSize: `${fontSize * 0.95}pt`, color: '#333333' }}>
                    {[
                        data.personal.email,
                        data.personal.phone,
                        data.personal.website,
                        data.personal.address
                    ].filter(Boolean).join(' | ')}
                </div>
            </header>

            <hr style={{ border: 'none', borderTop: `2px solid ${primaryColor}`, marginBottom: '12pt' }} />

            {data.personal.summary && (
                <section style={{ marginBottom: '14pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: '#000000', textTransform: 'uppercase', borderBottom: `1px solid ${primaryColor}`, paddingBottom: '4pt', marginBottom: '8pt' }}>
                        Professional Summary
                    </h3>
                    <p style={{ color: '#333333', textAlign: 'justify' }}>{data.personal.summary}</p>
                </section>
            )}

            {hasData(data.experience) && (
                <section style={{ marginBottom: '14pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: '#000000', textTransform: 'uppercase', borderBottom: `1px solid ${primaryColor}`, paddingBottom: '4pt', marginBottom: '8pt' }}>
                        Work Experience
                    </h3>
                    {data.experience.map((exp, index) => (
                        <div key={index} style={{ marginBottom: '10pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: `${fontSize * 1.05}pt`, color: '#000000' }}>{exp.position}</strong>
                                <span style={{ fontSize: `${fontSize * 0.9}pt`, color: '#555555' }}>{exp.duration}</span>
                            </div>
                            <div style={{ fontSize: `${fontSize}pt`, color: primaryColor, fontWeight: '600', marginBottom: '4pt' }}>{exp.company}</div>
                            {exp.description && (
                                <ul style={{ margin: '4pt 0', paddingLeft: '16pt', color: '#333333' }}>
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
                <section style={{ marginBottom: '14pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: '#000000', textTransform: 'uppercase', borderBottom: `1px solid ${primaryColor}`, paddingBottom: '4pt', marginBottom: '8pt' }}>
                        Education
                    </h3>
                    {data.education.map((edu, index) => (
                        <div key={index} style={{ marginBottom: '8pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: `${fontSize * 1.05}pt`, color: '#000000' }}>{edu.degree}</strong>
                                <span style={{ fontSize: `${fontSize * 0.9}pt`, color: '#555555' }}>{edu.year}</span>
                            </div>
                            <div style={{ color: '#333333' }}>{edu.school}</div>
                            {edu.gpa && <div style={{ color: '#555555', fontSize: `${fontSize * 0.9}pt` }}>GPA: {edu.gpa}</div>}
                        </div>
                    ))}
                </section>
            )}

            {hasData(data.skills) && (
                <section style={{ marginBottom: '14pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: '#000000', textTransform: 'uppercase', borderBottom: `1px solid ${primaryColor}`, paddingBottom: '4pt', marginBottom: '8pt' }}>
                        Skills
                    </h3>
                    <p style={{ color: '#333333' }}>{data.skills.filter(Boolean).join(', ')}</p>
                </section>
            )}

            {hasData(data.projects) && (
                <section style={{ marginBottom: '14pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: '#000000', textTransform: 'uppercase', borderBottom: `1px solid ${primaryColor}`, paddingBottom: '4pt', marginBottom: '8pt' }}>
                        Projects
                    </h3>
                    {data.projects.map((proj, index) => (
                        <div key={index} style={{ marginBottom: '8pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ color: '#000000' }}>{proj.name}</strong>
                                {proj.year && <span style={{ color: '#555555', fontSize: `${fontSize * 0.9}pt` }}>{proj.year}</span>}
                            </div>
                            {proj.role && <div style={{ color: primaryColor, fontStyle: 'italic', fontSize: `${fontSize * 0.95}pt` }}>{proj.role}</div>}
                            {proj.description && <p style={{ color: '#333333', marginTop: '2pt' }}>{proj.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            {hasData(data.certifications) && (
                <section>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: '#000000', textTransform: 'uppercase', borderBottom: `1px solid ${primaryColor}`, paddingBottom: '4pt', marginBottom: '8pt' }}>
                        Certifications
                    </h3>
                    {data.certifications.map((cert, index) => (
                        <div key={index} style={{ marginBottom: '6pt' }}>
                            <strong style={{ color: '#000000' }}>{cert.name}</strong>
                            {cert.issuer && <span style={{ color: '#555555' }}> - {cert.issuer}</span>}
                            {cert.year && <span style={{ color: '#555555' }}> ({cert.year})</span>}
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};
