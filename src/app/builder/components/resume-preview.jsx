import React, { forwardRef } from 'react';
import { ModernTemplate } from '../../components/templates/modern-template';
import { ClassicTemplate } from '../../components/templates/classic-template';
import { ExecutiveTemplate } from '../../components/templates/executive-template';
import { ElegantTemplate } from '../../components/templates/elegant-template';
import { CreativeTemplate } from '../../components/templates/creative-template';
// ATS-Optimized Templates
import { ModernATSTemplate } from '../../components/templates/modern-ats-template';
import { ClassicATSTemplate } from '../../components/templates/classic-ats-template';
import { ExecutiveATSTemplate } from '../../components/templates/executive-ats-template';
import { ElegantATSTemplate } from '../../components/templates/elegant-ats-template';
import { CreativeATSTemplate } from '../../components/templates/creative-ats-template';

export const ResumePreview = forwardRef(({ data, mode, template, style }, ref) => {
    const hasData = (section) => {
        if (Array.isArray(section)) return section.length > 0;
        return Object.values(section).some(val => val && val.trim() !== "");
    };

    const renderTemplate = () => {
        switch (template) {
            // Original Templates
            case 'executive':
                return <ExecutiveTemplate data={data} hasData={hasData} style={style} />;
            case 'modern':
                return <ModernTemplate data={data} hasData={hasData} style={style} />;
            case 'elegant':
                return <ElegantTemplate data={data} hasData={hasData} style={style} />;
            case 'creative':
                return <CreativeTemplate data={data} hasData={hasData} style={style} />;
            case 'classic':
                return <ClassicTemplate data={data} hasData={hasData} style={style} />;
            // ATS-Optimized Templates
            case 'modern-ats':
                return <ModernATSTemplate data={data} hasData={hasData} style={style} />;
            case 'classic-ats':
                return <ClassicATSTemplate data={data} hasData={hasData} style={style} />;
            case 'executive-ats':
                return <ExecutiveATSTemplate data={data} hasData={hasData} style={style} />;
            case 'elegant-ats':
                return <ElegantATSTemplate data={data} hasData={hasData} style={style} />;
            case 'creative-ats':
                return <CreativeATSTemplate data={data} hasData={hasData} style={style} />;
            default:
                return <ModernTemplate data={data} hasData={hasData} style={style} />;
        }
    };

    return (
        <div ref={ref} className="w-full flex justify-center" id="resume-preview">
            {renderTemplate()}
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';
