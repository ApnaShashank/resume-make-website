import html2canvas from 'html2canvas';

export const downloadManager = {
    // Generate PDF using browser's print
    downloadPDF: () => {
        window.print();
    },

    // Generate DOCX via backend
    downloadDOCX: async (resumeData) => {
        try {
            const response = await fetch('http://localhost:5000/api/export-docx', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resumeData)
            });

            if (!response.ok) throw new Error('Failed to generate DOCX');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resume-${resumeData.personal.fullName.replace(/\s+/g, '_')}.docx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            return true;
        } catch (error) {
            console.error('DOCX Download Error:', error);
            throw error;
        }
    },

    // Generate PNG using html2canvas
    downloadPNG: async () => {
        const element = document.getElementById('resume-preview');
        if (!element) throw new Error('Preview element not found');

        try {
             // Wait a bit for external resources
            const canvas = await html2canvas(element, {
                scale: 2, // High resolution
                useCORS: true,
                logging: true,
                backgroundColor: '#ffffff'
            });

            const url = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume-export.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            return true;
        } catch (error) {
            console.error('PNG Download Error:', error);
            throw error;
        }
    }
};
