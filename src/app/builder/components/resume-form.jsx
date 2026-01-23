import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical, Image, X, Edit2, Check } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";

// Default section configuration
const defaultSections = [
    { id: "personal", title: "Personal Information", isFixed: true },
    { id: "experience", title: "Experience" },
    { id: "education", title: "Education" },
    { id: "skills", title: "Skills" },
    { id: "projects", title: "Projects" },
    { id: "certifications", title: "Certifications" },
];

export function ResumeForm({ data, updateData, mode }) {
    const [expandedSection, setExpandedSection] = useState("personal");
    const [sectionOrder, setSectionOrder] = useState(defaultSections);
    const [editingTitle, setEditingTitle] = useState(null);
    const [tempTitle, setTempTitle] = useState("");
    const fileInputRef = useRef(null);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleChange = (section, field, value) => {
        updateData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleArrayChange = (section, index, field, value) => {
        updateData((prev) => {
            const newArray = [...prev[section]];
            newArray[index] = { ...newArray[index], [field]: value };
            return { ...prev, [section]: newArray };
        });
    };

    const addItem = (section, initialItem) => {
        updateData((prev) => ({
            ...prev,
            [section]: [...prev[section], initialItem],
        }));
    };

    const removeItem = (section, index) => {
        updateData((prev) => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index),
        }));
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateData((prev) => ({
                    ...prev,
                    personal: {
                        ...prev.personal,
                        photo: reader.result
                    }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        updateData((prev) => ({
            ...prev,
            personal: {
                ...prev.personal,
                photo: null
            }
        }));
    };

    // Handle section title edit
    const startEditingTitle = (sectionId, currentTitle) => {
        setEditingTitle(sectionId);
        setTempTitle(currentTitle);
    };

    const saveTitle = (sectionId) => {
        setSectionOrder(prev => prev.map(s =>
            s.id === sectionId ? { ...s, title: tempTitle } : s
        ));
        setEditingTitle(null);
    };

    const SectionHeader = ({ section }) => (
        <div className="flex items-center gap-2 w-full">
            {/* Drag Handle */}
            {!section.isFixed && (
                <div className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600">
                    <GripVertical className="w-4 h-4" />
                </div>
            )}

            <button
                onClick={() => toggleSection(section.id)}
                className="flex-1 flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
            >
                <div className="flex items-center gap-2">
                    {editingTitle === section.id ? (
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <input
                                type="text"
                                value={tempTitle}
                                onChange={(e) => setTempTitle(e.target.value)}
                                className="px-2 py-1 border border-blue-500 rounded text-sm font-semibold focus:outline-none"
                                autoFocus
                            />
                            <span
                                onClick={(e) => { e.stopPropagation(); saveTitle(section.id); }}
                                className="p-1 text-green-600 hover:text-green-800 cursor-pointer"
                            >
                                <Check className="w-4 h-4" />
                            </span>
                        </div>
                    ) : (
                        <>
                            <span className="font-semibold text-gray-700">{section.title}</span>
                            {!section.isFixed && (
                                <span
                                    onClick={(e) => { e.stopPropagation(); startEditingTitle(section.id, section.title); }}
                                    className="p-1 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 cursor-pointer"
                                >
                                    <Edit2 className="w-3 h-3" />
                                </span>
                            )}
                        </>
                    )}
                </div>
                {expandedSection === section.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
            </button>
        </div>
    );

    const renderPersonalSection = () => (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
            {/* Photo Upload */}
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300">
                        {data.personal.photo ? (
                            <>
                                <img
                                    src={data.personal.photo}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={removeImage}
                                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full transform translate-x-1/4 -translate-y-1/4"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                <Image className="w-8 h-8 mb-1" />
                                <span className="text-xs">Add Photo</span>
                            </button>
                        )}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>

                <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={data.personal.fullName}
                            onChange={(e) => handleChange("personal", "fullName", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input
                            type="text"
                            value={data.personal.jobTitle}
                            onChange={(e) => handleChange("personal", "jobTitle", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Software Engineer"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={data.personal.email}
                        onChange={(e) => handleChange("personal", "email", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        type="tel"
                        value={data.personal.phone}
                        onChange={(e) => handleChange("personal", "phone", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                        type="text"
                        value={data.personal.website || ""}
                        onChange={(e) => handleChange("personal", "website", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="www.yoursite.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                        type="text"
                        value={data.personal.address || ""}
                        onChange={(e) => handleChange("personal", "address", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="City, Country"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Summary / Career Objective</label>
                    <textarea
                        value={data.personal.summary}
                        onChange={(e) => handleChange("personal", "summary", e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Brief professional summary..."
                    />
                </div>
            </div>
        </div>
    );

    const renderExperienceSection = () => (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
            {data.experience.map((exp, index) => (
                <div key={index} className="p-4 bg-white rounded border border-gray-200 relative group">
                    <button
                        onClick={() => removeItem("experience", index)}
                        className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => handleArrayChange("experience", index, "company", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                            <input
                                type="text"
                                value={exp.position}
                                onChange={(e) => handleArrayChange("experience", index, "position", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => handleArrayChange("experience", index, "duration", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="2020 - Present"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={exp.description}
                                onChange={(e) => handleArrayChange("experience", index, "description", e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="• Key achievement 1&#10;• Key achievement 2"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={() => addItem("experience", { company: "", position: "", duration: "", description: "" })}
                className="w-full py-2 flex items-center justify-center gap-2 text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
                <Plus className="w-4 h-4" /> Add Experience
            </button>
        </div>
    );

    const renderEducationSection = () => (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
            {data.education.map((edu, index) => (
                <div key={index} className="p-4 bg-white rounded border border-gray-200 relative group">
                    <button
                        onClick={() => removeItem("education", index)}
                        className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School/University</label>
                            <input
                                type="text"
                                value={edu.school}
                                onChange={(e) => handleArrayChange("education", index, "school", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                            <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => handleArrayChange("education", index, "degree", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                            <input
                                type="text"
                                value={edu.year}
                                onChange={(e) => handleArrayChange("education", index, "year", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="2018 - 2022"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">GPA/Grade (Optional)</label>
                            <input
                                type="text"
                                value={edu.gpa || ""}
                                onChange={(e) => handleArrayChange("education", index, "gpa", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="3.8 / 4.0"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={() => addItem("education", { school: "", degree: "", year: "", gpa: "" })}
                className="w-full py-2 flex items-center justify-center gap-2 text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
                <Plus className="w-4 h-4" /> Add Education
            </button>
        </div>
    );

    const renderSkillsSection = () => (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
            <div className="grid grid-cols-2 gap-2">
                {data.skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => {
                                const newSkills = [...data.skills];
                                newSkills[index] = e.target.value;
                                updateData(prev => ({ ...prev, skills: newSkills }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Skill (e.g. React)"
                        />
                        <button
                            onClick={() => {
                                const newSkills = data.skills.filter((_, i) => i !== index);
                                updateData(prev => ({ ...prev, skills: newSkills }));
                            }}
                            className="p-2 text-red-400 hover:text-red-600"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
            <button
                onClick={() => updateData(prev => ({ ...prev, skills: [...prev.skills, ""] }))}
                className="w-full py-2 flex items-center justify-center gap-2 text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
                <Plus className="w-4 h-4" /> Add Skill
            </button>
        </div>
    );

    const renderProjectsSection = () => (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
            {data.projects.map((project, index) => (
                <div key={index} className="p-4 bg-white rounded border border-gray-200 relative group">
                    <button
                        onClick={() => removeItem("projects", index)}
                        className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                            <input
                                type="text"
                                value={project.name}
                                onChange={(e) => handleArrayChange("projects", index, "name", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                            <input
                                type="text"
                                value={project.year || ""}
                                onChange={(e) => handleArrayChange("projects", index, "year", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="2023"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role/Tech Stack</label>
                            <input
                                type="text"
                                value={project.role}
                                onChange={(e) => handleArrayChange("projects", index, "role", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={project.description}
                                onChange={(e) => handleArrayChange("projects", index, "description", e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={() => addItem("projects", { name: "", role: "", description: "", year: "" })}
                className="w-full py-2 flex items-center justify-center gap-2 text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
                <Plus className="w-4 h-4" /> Add Project
            </button>
        </div>
    );

    const renderCertificationsSection = () => (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
            {data.certifications.map((cert, index) => (
                <div key={index} className="p-4 bg-white rounded border border-gray-200 relative group">
                    <button
                        onClick={() => removeItem("certifications", index)}
                        className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => handleArrayChange("certifications", index, "name", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                            <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => handleArrayChange("certifications", index, "issuer", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                            <input
                                type="text"
                                value={cert.year}
                                onChange={(e) => handleArrayChange("certifications", index, "year", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={() => addItem("certifications", { name: "", issuer: "", year: "" })}
                className="w-full py-2 flex items-center justify-center gap-2 text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
                <Plus className="w-4 h-4" /> Add Certification
            </button>
        </div>
    );

    const renderSectionContent = (sectionId) => {
        switch (sectionId) {
            case "personal":
                return renderPersonalSection();
            case "experience":
                return renderExperienceSection();
            case "education":
                return renderEducationSection();
            case "skills":
                return renderSkillsSection();
            case "projects":
                return renderProjectsSection();
            case "certifications":
                return renderCertificationsSection();
            default:
                return null;
        }
    };

    return (
        <div className="space-y-3">
            {/* Tip for drag and drop */}
            <div className="text-xs text-gray-500 flex items-center gap-2 px-2">
                <GripVertical className="w-3 h-3" />
                <span>Drag sections to reorder. Click section title to edit name.</span>
            </div>

            <Reorder.Group
                axis="y"
                values={sectionOrder}
                onReorder={setSectionOrder}
                className="space-y-3"
            >
                {sectionOrder.map((section) => (
                    <Reorder.Item
                        key={section.id}
                        value={section}
                        className="group"
                        dragListener={!section.isFixed}
                    >
                        <div className="space-y-2">
                            <SectionHeader section={section} />
                            <AnimatePresence>
                                {expandedSection === section.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        {renderSectionContent(section.id)}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
}
