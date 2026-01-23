import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef(null);
    const cardsRef = useRef([]);
    const tlRef = useRef(null);
    const navigate = useNavigate();

    const items = [
        {
            label: "Explore",
            className: "bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100",
            links: [
                { label: "Home", href: "/", ariaLabel: "Go to Home" },
                { label: "Templates", href: "/templates", ariaLabel: "View Templates" },
                { label: "Features", href: "/#features", ariaLabel: "See Features" }
            ]
        },
        {
            label: "Build",
            className: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100",
            links: [
                { label: "Resume Builder", href: "/builder", ariaLabel: "Go to Builder" },
                { label: "My Dashboard", href: "/dashboard", ariaLabel: "Go to Dashboard" }
            ]
        },
        {
            label: "Account",
            className: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-100",
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
            const contentEl = navEl.querySelector('.card-nav-content');
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

    const setCardRef = (i) => (el) => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[900px] z-[99]">
            <div className="flex items-center gap-3">
                
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="flex-shrink-0 w-12 h-12 bg-surface hover:bg-app-bg text-text-main rounded-full flex items-center justify-center border border-border-main shadow-lg transition-all active:scale-95"
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Main Floating Navbar */}
                <nav
                    ref={navRef}
                    className="flex-1 bg-surface/90 backdrop-blur-md border border-border-main shadow-xl rounded-2xl relative overflow-hidden will-change-[height] transition-colors duration-300"
                >
                    {/* Top Bar */}
                    <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 md:px-6 z-[2]">
                        {/* Hamburger */}
                        <div
                            className="group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-1 md:order-none"
                            onClick={toggleMenu}
                            role="button"
                            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                            tabIndex={0}
                        >
                            <div className={`w-[24px] h-[2px] bg-text-main transition-all duration-300 ${isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''}`} />
                            <div className={`w-[24px] h-[2px] bg-text-main transition-all duration-300 ${isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''}`} />
                        </div>

                        {/* Logo (Centered) */}
                        <div className="flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 order-2 md:order-none">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-lg">R</span>
                                </div>
                                <span className="hidden sm:inline text-lg font-bold text-text-main whitespace-nowrap">
                                    Rume Resume Maker
                                </span>
                            </Link>
                        </div>
                        
                        {/* Right Space Balancer / Mobile Hidden */}
                        <div className="w-6 hidden md:block"></div>
                    </div>

                    {/* Expanded Content */}
                    <div
                        className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col md:flex-row items-stretch md:items-end gap-2 z-[1] ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}
                        aria-hidden={!isExpanded}
                    >
                        {items.map((item, idx) => (
                            <div
                                key={`${item.label}-${idx}`}
                                className={`flex flex-col gap-2 p-4 rounded-xl flex-1 min-h-[100px] md:h-full justify-between transition-transform ${item.className}`}
                                ref={setCardRef(idx)}
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
                                            onClick={toggleMenu}
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

                {/* User/Login Island */}
                <Link
                    to="/login"
                    className="flex-shrink-0 w-12 h-12 bg-surface hover:bg-app-bg text-text-main rounded-full flex items-center justify-center border border-border-main shadow-lg transition-all active:scale-95"
                    title="Account"
                >
                    <User className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
};

export { Navbar };
