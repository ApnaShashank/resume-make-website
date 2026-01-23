import React from 'react';
import { ResumePreview } from '../builder/components/resume-preview';
import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

export function ResumeLivePreview({ data, activeTemplate, onTemplateChange, style }) {
    const templates = [
        { id: 'modern-ats', name: 'Modern ATS' },
        { id: 'classic-ats', name: 'Classic ATS' },
        { id: 'executive-ats', name: 'Executive ATS' },
        { id: 'elegant-ats', name: 'Elegant ATS' },
        { id: 'creative-ats', name: 'Creative ATS' },
    ];

    return (
        <div className="h-full flex flex-col bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
            {/* Toolbar */}
            <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview</span>
                    <select
                        value={activeTemplate}
                        onChange={(e) => onTemplateChange(e.target.value)}
                        className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        {templates.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-1">
                    <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md font-medium border border-green-200">
                        Live Updating
                    </div>
                </div>
            </div>

            {/* Preview Area - Scaled to fit */}
            <div className="flex-1 overflow-auto p-4 bg-gray-200/50 flex items-start justify-center">
                <div className="relative transform origin-top scale-[0.55] sm:scale-[0.65] lg:scale-[0.6] xl:scale-[0.7] transition-transform duration-300 ease-in-out mt-4 shadow-2xl">
                    <div className="bg-white w-[210mm] min-h-[297mm]">
                         <ResumePreview
                            data={data}
                            mode="professional"
                            template={activeTemplate}
                            style={style}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
