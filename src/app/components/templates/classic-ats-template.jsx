import React from 'react';

export const ClassicATSTemplate = ({ data, hasData, style }) => {
    const primaryColor = style?.primaryColor || '#1a365d';
    const fontSize = style?.fontSize || 11;
    const fontFamily = "'Times New Roman', 'Georgia', serif";

    return (
        <div
            className="w-[210mm] bg-white shadow-2xl text-left"
            style={{
                fontFamily: fontFamily,
                fontSize: `${fontSize}pt`,
                minHeight: '297mm',
                lineHeight: '1.5',
                padding: '20mm',
            }}
        >
            <header style={{ textAlign: 'center', marginBottom: '14pt' }}>
                <h1 style={{ fontSize: `${fontSize * 2.2}pt`, fontWeight: 'bold', color: primaryColor, marginBottom: '6pt', letterSpacing: '2px' }}>
                    {data.personal.fullName || "Your Name"}
                </h1>
                {data.personal.jobTitle && (
                    <h2 style={{ fontSize: `${fontSize * 1.2}pt`, fontWeight: 'normal', color: '#333333', marginBottom: '8pt', fontStyle: 'italic' }}>
                        {data.personal.jobTitle}
                    </h2>
                )}
                <div style={{ fontSize: `${fontSize}pt`, color: '#444444' }}>
                    {[data.personal.email, data.personal.phone, data.personal.address, data.personal.website].filter(Boolean).join(' | ')}
                </div>
            </header>

            <div style={{ borderTop: `1px solid ${primaryColor}`, borderBottom: `1px solid ${primaryColor}`, height: '3px', marginBottom: '14pt' }}></div>

            {data.personal.summary && (
                <section style={{ marginBottom: '14pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.1}pt`, fontWeight: 'bold', color: primaryColor, textTransform: 'uppercase', marginBottom: '6pt', borderBottom: '1px solid #cccccc', paddingBottom: '4pt' }}>
                        Career Objective
                    </h3>
                    <p style={{ color: '#333333', textAlign: 'justify' }}>{data.personal.summary}</p>
                </section>
            )}

            {hasData(data.education) && (
                <section style={{ marginBottom: '14pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.1}pt`, fontWeight: 'bold', color: primaryColor, textTransform: 'uppercase', marginBottom: '6pt', borderBottom: '1px solid #cccccc', paddingBottom: '4pt' }}>
                        Education
                    </h3>
                    {data.education.map((edu, index) => (
                        <div key={index} style={{ marginBottom: '8pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ color: '#000000' }}>{edu.degree}</strong>
                                <span style={{ color: '#555555' }}>{edu.year}</span>
                            </div>
                            <div style={{ color: '#333333' }}>{edu.school}</div>
                            {edu.gpa && <div style={{ color: '#555555', fontSize: `${fontSize * 0.9}pt` }}>GPA: {edu.gpa}</div>}
                        </div>
                    ))}
                </section>
            )}

            {hasData(data.experience) && (
                <section style={{ marginBottom: '14pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.1}pt`, fontWeight: 'bold', color: primaryColor, textTransform: 'uppercase', marginBottom: '6pt', borderBottom: '1px solid #cccccc', paddingBottom: '4pt' }}>
                        Professional Experience
                    </h3>
                    {data.experience.map((exp, index) => (
                        <div key={index} style={{ marginBottom: '10pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ color: '#000000' }}>{exp.position}</strong>
                                <span style={{ color: '#555555' }}>{exp.duration}</span>
                            </div>
                            <div style={{ color: '#333333', fontStyle: 'italic', marginBottom: '4pt' }}>{exp.company}</div>
                            {exp.description && (
                                <ul style={{ margin: '4pt 0', paddingLeft: '20pt', color: '#333333' }}>
                                    {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                        <li key={i} style={{ marginBottom: '2pt' }}>{line.replace(/^[-•]\s*/, '')}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {hasData(data.skills) && (
                <section style={{ marginBottom: '14pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.1}pt`, fontWeight: 'bold', color: primaryColor, textTransform: 'uppercase', marginBottom: '6pt', borderBottom: '1px solid #cccccc', paddingBottom: '4pt' }}>
                        Technical Skills
                    </h3>
                    <p style={{ color: '#333333' }}>{data.skills.filter(Boolean).join(', ')}</p>
                </section>
            )}

            {hasData(data.projects) && (
                <section style={{ marginBottom: '14pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.1}pt`, fontWeight: 'bold', color: primaryColor, textTransform: 'uppercase', marginBottom: '6pt', borderBottom: '1px solid #cccccc', paddingBottom: '4pt' }}>
                        Projects
                    </h3>
                    {data.projects.map((proj, index) => (
                        <div key={index} style={{ marginBottom: '8pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ color: '#000000' }}>{proj.name}</strong>
                                {proj.year && <span style={{ color: '#555555' }}>{proj.year}</span>}
                            </div>
                            {proj.role && <div style={{ color: '#555555', fontStyle: 'italic' }}>{proj.role}</div>}
                            {proj.description && <p style={{ color: '#333333', marginTop: '2pt' }}>{proj.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            {hasData(data.certifications) && (
                <section>
                    <h3 style={{ fontSize: `${fontSize * 1.1}pt`, fontWeight: 'bold', color: primaryColor, textTransform: 'uppercase', marginBottom: '6pt', borderBottom: '1px solid #cccccc', paddingBottom: '4pt' }}>
                        Certifications
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '20pt', color: '#333333' }}>
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
