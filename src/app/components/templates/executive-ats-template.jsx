import React from 'react';

export const ExecutiveATSTemplate = ({ data, hasData, style }) => {
    const primaryColor = style?.primaryColor || '#1e3a5f';
    const fontSize = style?.fontSize || 11;
    const fontFamily = "'Calibri', 'Arial', sans-serif";

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
            <header style={{ marginBottom: '16pt', borderBottom: `3px solid ${primaryColor}`, paddingBottom: '12pt' }}>
                <h1 style={{ fontSize: `${fontSize * 2.4}pt`, fontWeight: 'bold', color: primaryColor, marginBottom: '4pt' }}>
                    {data.personal.fullName || "Your Name"}
                </h1>
                {data.personal.jobTitle && (
                    <h2 style={{ fontSize: `${fontSize * 1.3}pt`, fontWeight: '600', color: '#333333', marginBottom: '10pt' }}>
                        {data.personal.jobTitle}
                    </h2>
                )}
                <div style={{ fontSize: `${fontSize}pt`, color: '#444444' }}>
                    {data.personal.email && <span>Email: {data.personal.email}</span>}
                    {data.personal.phone && <span> | Phone: {data.personal.phone}</span>}
                    {data.personal.address && <span> | {data.personal.address}</span>}
                    {data.personal.website && <span> | {data.personal.website}</span>}
                </div>
            </header>

            {data.personal.summary && (
                <section style={{ marginBottom: '16pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: primaryColor, textTransform: 'uppercase', marginBottom: '8pt', letterSpacing: '1px' }}>
                        Executive Summary
                    </h3>
                    <p style={{ color: '#333333', textAlign: 'justify', lineHeight: '1.6' }}>{data.personal.summary}</p>
                </section>
            )}

            {hasData(data.skills) && (
                <section style={{ marginBottom: '16pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: primaryColor, textTransform: 'uppercase', marginBottom: '8pt', letterSpacing: '1px' }}>
                        Core Competencies
                    </h3>
                    <p style={{ color: '#333333' }}>{data.skills.filter(Boolean).join(' • ')}</p>
                </section>
            )}

            {hasData(data.experience) && (
                <section style={{ marginBottom: '16pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: primaryColor, textTransform: 'uppercase', marginBottom: '8pt', letterSpacing: '1px' }}>
                        Professional Experience
                    </h3>
                    {data.experience.map((exp, index) => (
                        <div key={index} style={{ marginBottom: '12pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: `${fontSize * 1.1}pt`, color: '#000000' }}>{exp.position}</strong>
                                <span style={{ color: '#555555' }}>{exp.duration}</span>
                            </div>
                            <div style={{ color: primaryColor, fontWeight: '600', marginBottom: '6pt' }}>{exp.company}</div>
                            {exp.description && (
                                <ul style={{ margin: '0', paddingLeft: '18pt', color: '#333333' }}>
                                    {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                        <li key={i} style={{ marginBottom: '3pt' }}>{line.replace(/^[-•]\s*/, '')}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {hasData(data.education) && (
                <section style={{ marginBottom: '16pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: primaryColor, textTransform: 'uppercase', marginBottom: '8pt', letterSpacing: '1px' }}>
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

            {hasData(data.projects) && (
                <section style={{ marginBottom: '16pt' }}>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: primaryColor, textTransform: 'uppercase', marginBottom: '8pt', letterSpacing: '1px' }}>
                        Key Projects
                    </h3>
                    {data.projects.map((proj, index) => (
                        <div key={index} style={{ marginBottom: '8pt' }}>
                            <strong style={{ color: '#000000' }}>{proj.name}</strong>
                            {proj.year && <span style={{ color: '#555555' }}> ({proj.year})</span>}
                            {proj.role && <div style={{ color: '#555555', fontStyle: 'italic' }}>{proj.role}</div>}
                            {proj.description && <p style={{ color: '#333333', marginTop: '2pt', marginBottom: '0' }}>{proj.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            {hasData(data.certifications) && (
                <section>
                    <h3 style={{ fontSize: `${fontSize * 1.15}pt`, fontWeight: 'bold', color: primaryColor, textTransform: 'uppercase', marginBottom: '8pt', letterSpacing: '1px' }}>
                        Certifications & Licenses
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
