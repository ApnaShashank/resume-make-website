import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './app/components/navbar'
import { HeroSection } from './app/components/hero-section'
import { Footer } from './app/components/footer'
import { SelectTemplateSection } from './app/components/select-template-section'
import { PerfectForEveryoneSection } from './app/components/perfect-for-everyone-section'
import ResumeBuilderPage from "./app/builder/page";
import TemplatesPage from "./app/pages/templates-page";
import LoginPage from "./app/pages/login-page";
import DashboardPage from "./app/pages/dashboard-page";
import AiResumeBuilderPage from "./app/pages/ai-resume-builder-page";
import HelpCenterPage from "./app/pages/help-center-page";
import PrivacyPolicyPage from "./app/pages/privacy-policy-page";
import TermsOfServicePage from "./app/pages/terms-of-service-page";
import ContactUsPage from "./app/pages/contact-us-page";

function LandingPage() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <SelectTemplateSection />
                <PerfectForEveryoneSection />
            </main>
            <Footer />
        </>
    );
}

import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="min-h-screen bg-app-bg font-sans text-text-main transition-colors duration-300">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/builder" element={<ResumeBuilderPage />} />
                        <Route path="/templates" element={<TemplatesPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/enhance" element={<AiResumeBuilderPage />} />
                        <Route path="/help" element={<HelpCenterPage />} />
                        <Route path="/privacy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms" element={<TermsOfServicePage />} />
                        <Route path="/contact" element={<ContactUsPage />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default App
