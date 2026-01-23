import { motion } from "motion/react";
import { GraduationCap, Briefcase, Laptop, Search } from "lucide-react";

const userTypes = [
    {
        icon: <GraduationCap className="w-10 h-10 text-primary" />,
        title: "Freshers",
        description: "Create your first professional resume and apply confidently for your first job."
    },
    {
        icon: <Briefcase className="w-10 h-10 text-primary" />,
        title: "Working Professionals",
        description: "Upgrade your resume to grow your career and switch to better opportunities."
    },
    {
        icon: <Laptop className="w-10 h-10 text-primary" />,
        title: "Freelancers",
        description: "Build impressive resumes and proposals to win more clients."
    },
    {
        icon: <Search className="w-10 h-10 text-primary" />,
        title: "Students",
        description: "Make clean resumes for internships, placements, and academic applications."
    }
];

export function PerfectForEveryoneSection() {
    return (
        <section className="bg-app-bg py-16 lg:py-24 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-3xl lg:text-4xl font-bold text-text-main mb-4"
                    >
                        Perfect for Everyone
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-lg text-text-muted max-w-2xl mx-auto"
                    >
                        Rume AI is designed to help everyone create a job-ready resume in minutes.
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {userTypes.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-surface rounded-xl p-8 shadow-lg border border-border-main hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
                        >
                            {/* Icon */}
                            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-text-main mb-3">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-text-muted text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
