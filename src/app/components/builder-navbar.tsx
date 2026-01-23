import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { Download, Type, Plus, Minus, Palette, ArrowLeft, User } from 'lucide-react';

// Font options
const fontFamilies = [
    { name: "Inter", value: "'Inter', sans-serif" },
    { name: "Roboto", value: "'Roboto', sans-serif" },
    { name: "Poppins", value: "'Poppins', sans-serif" },
    { name: "Open Sans", value: "'Open Sans', sans-serif" },
    { name: "Lato", value: "'Lato', sans-serif" },
    { name: "Montserrat", value: "'Montserrat', sans-serif" },
    { name: "Georgia", value: "Georgia, serif" },
    { name: "Times New Roman", value: "'Times New Roman', serif" },
];

// Color themes
const colorThemes = [
    { name: "Blue", primary: "#2563eb", secondary: "#3b82f6" },
    { name: "Green", primary: "#059669", secondary: "#10b981" },
    { name: "Purple", primary: "#7c3aed", secondary: "#8b5cf6" },
    { name: "Red", primary: "#dc2626", secondary: "#ef4444" },
    { name: "Orange", primary: "#ea580c", secondary: "#f97316" },
    { name: "Teal", primary: "#0d9488", secondary: "#14b8a6" },
    { name: "Indigo", primary: "#4f46e5", secondary: "#6366f1" },
    { name: "Gray", primary: "#374151", secondary: "#4b5563" },
];

interface BuilderNavbarProps {
    resumeStyle: {
        fontFamily: string;
        fontSize: number;
        primaryColor: string;
        secondaryColor: string;
    };
    setResumeStyle: React.Dispatch<React.SetStateAction<{
        fontFamily: string;
        fontSize: number;
        primaryColor: string;
        secondaryColor: string;
    }>>;
    onDownload: () => void;
}

const BuilderNavbar = ({ resumeStyle, setResumeStyle, onDownload }: BuilderNavbarProps) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showEditTools, setShowEditTools] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const navigate = useNavigate();

    const items = [
        {
            label: "Explore",
            bgColor: "#eff6ff",
            textColor: "#1e3a8a",
            links: [
                { label: "Home", href: "/", ariaLabel: "Go to Home" },
                { label: "Templates", href: "/templates", ariaLabel: "View Templates" },
            ]
        },
        {
            label: "Build",
            bgColor: "#f0fdf4",
            textColor: "#14532d",
            links: [
                { label: "Resume Builder", href: "/builder", ariaLabel: "Go to Builder" },
                { label: "My Dashboard", href: "/dashboard", ariaLabel: "Go to Dashboard" }
            ]
        },
        {
            label: "Account",
            bgColor: "#fdf2f8",
            textColor: "#831843",
            links: [
                { label: "Sign In", href: "/login", ariaLabel: "Login" },
                { label: "Support", href: "#", ariaLabel: "Contact Support" }
            ]
        }
    ];

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 260;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = 'visible';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';

                contentEl.offsetHeight;

                const topBar = 60;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 260;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.4,
            ease: 'power3.out'
        });

        tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08 }, '-=0.1');

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
    }, []);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });

                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[i] = el;
    };

    const increaseFontSize = useCallback(() => {
        setResumeStyle(prev => ({
            ...prev,
            fontSize: Math.min(prev.fontSize + 1, 20)
        }));
    }, [setResumeStyle]);

    const decreaseFontSize = useCallback(() => {
        setResumeStyle(prev => ({
            ...prev,
            fontSize: Math.max(prev.fontSize - 1, 10)
        }));
    }, [setResumeStyle]);

    const handleColorChange = useCallback((theme: { primary: string; secondary: string }) => {
        setResumeStyle(prev => ({
            ...prev,
            primaryColor: theme.primary,
            secondaryColor: theme.secondary
        }));
    }, [setResumeStyle]);

    const handleFontChange = useCallback((fontValue: string) => {
        setResumeStyle(prev => ({
            ...prev,
            fontFamily: fontValue
        }));
    }, [setResumeStyle]);

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[900px] z-[99]">
            {/* Main container with back and login buttons */}
            <div className="flex items-center gap-3">
                {/* Back Button - Black Circle */}
                <Link
                    to="/"
                    className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center border-2 border-white shadow-lg hover:bg-gray-800 transition-colors"
                    title="Go to Home"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </Link>

                {/* Main Navbar */}
                <nav
                    ref={navRef}
                    className={`flex-1 bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl relative overflow-hidden will-change-[height]`}
                >
                    {/* Top Bar */}
                    <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 md:px-6 z-[2]">

                        {/* Hamburger */}
                        <div
                            className={`group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-1 md:order-none`}
                            onClick={toggleMenu}
                            role="button"
                            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                            tabIndex={0}
                        >
                            <div
                                className={`w-[24px] h-[2px] bg-gray-900 transition-all duration-300 ease-linear origin-center ${isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
                                    }`}
                            />
                            <div
                                className={`w-[24px] h-[2px] bg-gray-900 transition-all duration-300 ease-linear origin-center ${isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
                                    }`}
                            />
                        </div>

                        {/* Logo / Title (Centered) */}
                        <div className="flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 order-2 md:order-none">
                            <Link to="/" className="flex items-center ">
                                <img src="/logo.png" alt="Logo" className="w-10 h-10 md:w-14 md:h-14 object-contain" />
                                <span className="hidden sm:inline text-sm md:text-base font-bold text-gray-900 whitespace-nowrap">
                                    Create Resume Live Preview
                                </span>
                            </Link>
                        </div>

                        {/* Right Side Buttons */}
                        <div className="flex items-center gap-2 order-3">
                            {/* Edit Button */}
                            <button
                                onClick={() => setShowEditTools(!showEditTools)}
                                className={`inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-colors ${showEditTools
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                                    }`}
                            >
                                Edit
                            </button>

                            {/* Download Button */}
                            <button
                                onClick={onDownload}
                                className="inline-flex items-center justify-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Download className="w-3 h-3 md:w-4 md:h-4" />
                                <span className="hidden sm:inline">Download</span>
                            </button>
                        </div>
                    </div>

                    {/* Expanded Content (Cards) */}
                    <div
                        className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col md:flex-row items-stretch md:items-end gap-2 z-[1] ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
                            }`}
                        aria-hidden={!isExpanded}
                    >
                        {items.map((item, idx) => (
                            <div
                                key={`${item.label}-${idx}`}
                                className="flex flex-col gap-2 p-4 rounded-xl flex-1 min-h-[100px] md:h-full justify-between transition-transform"
                                ref={setCardRef(idx)}
                                style={{ backgroundColor: item.bgColor, color: item.textColor }}
                            >
                                <div className="font-semibold text-xl tracking-tight opacity-80">
                                    {item.label}
                                </div>
                                <div className="flex flex-col gap-2 mt-auto">
                                    {item.links.map((lnk, i) => (
                                        <Link
                                            key={`${lnk.label}-${i}`}
                                            to={lnk.href}
                                            className="inline-flex items-center gap-2 text-sm md:text-base hover:underline decoration-2 underline-offset-2"
                                            onClick={() => {
                                                toggleMenu();
                                            }}
                                        >
                                            <GoArrowUpRight className="shrink-0" />
                                            {lnk.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </nav>

                {/* Login Button - Black Circle */}
                <Link
                    to="/login"
                    className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center border-2 border-white shadow-lg hover:bg-gray-800 transition-colors"
                    title="Login"
                >
                    <User className="w-5 h-5 text-white" />
                </Link>
            </div>

            {/* Edit Tools Panel */}
            {showEditTools && (
                <div className="mt-3 ml-15 mr-15 bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-3 md:p-4 overflow-x-auto">
                    <div className="flex items-center gap-3 md:gap-4 min-w-max">
                        {/* Font Family */}
                        <div className="flex items-center gap-2">
                            <Type className="w-4 h-4 text-gray-500 hidden sm:block" />
                            <select
                                value={resumeStyle.fontFamily}
                                onChange={(e) => handleFontChange(e.target.value)}
                                className="text-xs md:text-sm border border-gray-300 rounded-lg px-2 md:px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            >
                                {fontFamilies.map((font) => (
                                    <option key={font.name} value={font.value}>
                                        {font.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Divider */}
                        <div className="h-6 w-px bg-gray-300"></div>

                        {/* Font Size */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs md:text-sm text-gray-600 hidden sm:inline">Size:</span>
                            <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={decreaseFontSize}
                                    className="px-2 py-1.5 hover:bg-gray-100 transition-colors"
                                    title="Decrease Font Size"
                                >
                                    <Minus className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                                <span className="px-2 md:px-3 py-1.5 text-xs md:text-sm font-medium bg-gray-50 border-x border-gray-300">
                                    {resumeStyle.fontSize}
                                </span>
                                <button
                                    onClick={increaseFontSize}
                                    className="px-2 py-1.5 hover:bg-gray-100 transition-colors"
                                    title="Increase Font Size"
                                >
                                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-6 w-px bg-gray-300"></div>

                        {/* Color Theme */}
                        <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4 text-gray-500 hidden sm:block" />
                            <div className="flex items-center gap-1">
                                {colorThemes.map((theme) => (
                                    <button
                                        key={theme.name}
                                        onClick={() => handleColorChange(theme)}
                                        className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 transition-all ${resumeStyle.primaryColor === theme.primary
                                            ? "border-gray-900 scale-110"
                                            : "border-transparent hover:border-gray-400"
                                            }`}
                                        style={{ backgroundColor: theme.primary }}
                                        title={theme.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export { BuilderNavbar };
