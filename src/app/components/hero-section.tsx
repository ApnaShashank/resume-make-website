import { motion } from "motion/react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import RotatingText from "./ui/RotatingText";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-app-bg pt-24 pb-16 lg:pt-32 lg:pb-24 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl lg:text-6xl font-bold text-text-main mb-6 leading-tight">
                            Create Professional Resumes That Get You{" "}
                            <RotatingText
                                texts={['Hired', 'Noticed', 'Selected', 'Success']}
                                mainClassName="px-3 sm:px-3 md:px-4 bg-primary text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg inline-flex min-w-[180px] align-middle ml-2"
                                staggerFrom={"last"}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={2000}
                            />
                        </h1>

                        <p className="text-xl text-text-muted mb-8 leading-relaxed">
                            Smart resume builder for freshers and professionals with dynamic sections,
                            live preview, and ATS-friendly templates. Build your perfect resume in minutes.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/builder"
                                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg hover:opacity-90 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 font-semibold"
                            >
                                Create Your Resume
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>

                            <Link
                                to="/enhance"
                                className="inline-flex items-center justify-center px-8 py-4 bg-surface text-text-main border-2 border-border-main rounded-lg hover:border-primary transition-colors font-semibold shadow-sm"
                            >
                                <PlayCircle className="mr-2 h-5 w-5" />
                                Enhance Resume
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative">
                            {/* Background decoration */}
                            <div className="absolute -top-8 -right-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
                            <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-secondary/10 rounded-full blur-3xl opacity-50" />

                            {/* Resume mockup */}
                            <div className="relative bg-surface rounded-2xl shadow-2xl p-4 border border-border-main hover:border-primary/50 transition-colors duration-300">
                                <img
                                    src="/hero-resume.png"
                                    alt="Professional Resume Preview"
                                    className="w-full rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
