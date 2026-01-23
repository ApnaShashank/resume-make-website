import { Link } from 'react-router-dom';
import { FileText, Plus, MoreVertical, Download, Edit, Trash2, LogOut } from 'lucide-react';
import { Navbar } from '../components/navbar';

const mockResumes = [
    { id: 1, name: 'Senior Software Engineer', template: 'Modern', lastEdited: '2 days ago' },
    { id: 2, name: 'Product Manager Role', template: 'Classic', lastEdited: '5 days ago' },
    { id: 3, name: 'Applying to Google', template: 'Modern', lastEdited: '1 week ago' },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2">
                                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                                <span className="text-lg font-bold text-gray-900">Resume Maker</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">Welcome, User</span>
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">U</div>
                            <Link to="/" className="text-gray-500 hover:text-gray-700">
                                <LogOut className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
                    <Link
                        to="/builder"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                    >
                        <Plus className="w-4 h-4" /> Create New Resume
                    </Link>
                </div>

                {/* Resume Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Create New Card */}
                    <Link
                        to="/builder"
                        className="group flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
                    >
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Plus className="w-8 h-8 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-600 group-hover:text-blue-600">Create New Resume</span>
                    </Link>

                    {/* Resume Cards */}
                    {mockResumes.map((resume) => (
                        <div key={resume.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                            <div className="h-32 bg-gray-100 border-b border-gray-100 relative group">
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                                    <Link to="/builder" className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:text-blue-600">
                                        Edit Resume
                                    </Link>
                                </div>
                                {/* Mock thumbnail representation */}
                                <div className="w-3/4 h-full mx-auto bg-white shadow-sm mt-4 rounded-t-lg mx-8" />
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">{resume.name}</h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600">{resume.template}</span>
                                        <span>• Edited {resume.lastEdited}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                    <Link to="/builder" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                        <Edit className="w-3 h-3" /> Edit
                                    </Link>
                                    <div className="flex gap-2">
                                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
