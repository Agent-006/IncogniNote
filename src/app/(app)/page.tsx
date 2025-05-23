"use client";

import React, { useEffect, useState } from "react";
import Particles from "@/Backgrounds/Particles/Particles";
import RotatingText from "@/TextAnimations/RotatingText/RotatingText";
import InfiniteScroll from "@/components/InfiniteScroll/InfiniteScroll";

const items = [
    {
        content:
            "I really appreciate the effort you put into your work — it doesn't go unnoticed!",
    },
    {
        content: (
            <p>Your presentations are always clear and engaging — great job!</p>
        ),
    },
    {
        content:
            "Sometimes your tone comes off a bit harsh in meetings. Just a heads-up.",
    },
    { content: <p>It would help if deadlines were communicated earlier.</p> },
    { content: "You're doing a great job leading the project. Keep it up!" },
    {
        content: (
            <p>
                Sometimes it feels like only a few voices are heard in
                discussions.
            </p>
        ),
    },
    {
        content:
            "It would be awesome if we had more transparent communication within the team.",
    },
    {
        content: (
            <p>Thanks for staying calm under pressure — it&apos;s inspiring.</p>
        ),
    },
    {
        content:
            "I feel overwhelmed with the current workload. Can we revisit the task distribution?",
    },
    { content: <p>Could we get more regular updates on project progress?</p> },
    {
        content:
            "Thanks for always being approachable and supportive — it makes a big difference.",
    },
    {
        content: (
            <p>
                You&apos;re an awesome mentor. I&apos;ve learned a lot from you.
            </p>
        ),
    },
    {
        content:
            "Can we have shorter stand-ups? They sometimes drag on unnecessarily.",
    },
    {
        content: (
            <p>
                The new workflow is confusing. Maybe we could do a quick
                walkthrough?
            </p>
        ),
    },
];

function Home() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 150);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <main
            className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden border-t border-primary/10 shadow-2xl overflow-hidden
            bg-gradient-to-br
            from-primary/5 via-background/30 to-primary/0
            dark:from-primary/10 dark:via-background/20 dark:to-primary/0
        "
        >
            {/* Particles as the main background */}
            <div
                style={{ width: "100%", height: "800px" }}
                className="absolute z-10 top-0 left-0"
            >
                <Particles
                    particleColors={[
                        "#6366f1",
                        "#f472b6",
                        "#a1a1aa",
                        "#d1d5db",
                        "#38bdf8",
                        "#fbbf24",
                        "#10b981",
                    ]}
                    particleCount={250}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>

            <section className="relative z-10 flex flex-col items-center w-full max-w-3xl px-10">
                <div className="w-full flex flex-col items-center text-center pt-32 pb-14">
                    <span className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                        <svg
                            width="18"
                            height="18"
                            fill="none"
                            className="inline-block"
                        >
                            <circle
                                cx="9"
                                cy="9"
                                r="8"
                                stroke="currentColor"
                                className="text-primary"
                                strokeWidth="2"
                            />
                        </svg>
                        IncogniNote
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight drop-shadow-sm text-center">
                        <RotatingText
                            texts={[
                                "Anonymous Feedback for Modern Teams",
                                "Empower Your Team with Honest Insights",
                                "Frictionless, Safe, and Insightful",
                                "Feedback, Reimagined for SaaS Workflows",
                            ]}
                            mainClassName="inline"
                            staggerFrom="last"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden"
                            transition={{
                                type: "spring",
                                damping: 30,
                                stiffness: 400,
                            }}
                            rotationInterval={3200}
                        />
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10">
                        IncogniNote enables your team to share candid feedback,
                        anonymously and securely. Foster a culture of trust and
                        improvement with a modern, privacy-first approach.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                        <a
                            href="/sign-up"
                            className="inline-block bg-primary text-foreground font-semibold px-7 py-3 shadow-lg hover:bg-primary/90 transition focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-lg"
                        >
                            Get Started Free
                        </a>
                        <a
                            href="/learn-more"
                            className="inline-block border border-border bg-background/80 text-foreground font-semibold px-7 py-3 hover:bg-muted/40 transition focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
                        >
                            Learn More
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">
                            No credit card required
                        </span>
                        <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                        <span className="text-xs text-muted-foreground">
                            Start in 30 seconds
                        </span>
                    </div>
                </div>

                <div className="w-full rounded-2xl bg-background/80 dark:bg-background/60 shadow-xl border border-border backdrop-blur-md flex flex-col items-center py-8 px-2 md:px-8 transition-all hover:shadow-2xl hover:border-primary/30">
                    <h2 className="text-lg font-semibold text-foreground mb-4 tracking-tight flex items-center gap-2">
                        <svg
                            width="20"
                            height="20"
                            fill="none"
                            className="text-primary"
                        >
                            <path
                                d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z"
                                fill="currentColor"
                            />
                        </svg>
                        What people are saying
                    </h2>
                    <div className="w-full">
                        <InfiniteScroll
                            items={items}
                            isTilted={false}
                            tiltDirection="left"
                            autoplay={true}
                            autoplaySpeed={0.08}
                            autoplayDirection="down"
                            pauseOnHover={true}
                        />
                    </div>
                </div>
            </section>
            <footer className="mt-24 w-full px-0">
                <div className="relative w-full max-w-none px-0 py-12 bg-gradient-to-br from-primary/20 via-background/90 to-background/70 dark:from-primary/30 dark:via-background/80 dark:to-background/50 border-t border-primary/20 shadow-2xl flex flex-col items-center overflow-hidden">
                    {/* Decorative background accents */}
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <div className="w-80 h-80 bg-primary/20 rounded-full blur-3xl absolute -top-32 -left-32 opacity-70"></div>
                        <div className="w-56 h-56 bg-primary/30 rounded-full blur-2xl absolute -bottom-24 -right-24 opacity-60"></div>
                        <div className="w-32 h-32 bg-primary/10 rounded-full blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-4 w-full">
                        {/* Brand and tagline */}
                        <div className="flex items-center gap-4 mb-2">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/30 text-primary shadow-lg">
                                <svg
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </span>
                            <span className="text-2xl font-extrabold text-primary tracking-tight drop-shadow-sm">
                                IncogniNote
                            </span>
                        </div>
                        <p className="text-base text-muted-foreground/90 font-medium mb-2 text-center max-w-xl">
                            Feedback, reimagined for SaaS teams.
                        </p>
                        {/* Social links */}
                        <div className="flex items-center gap-5 mt-2">
                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition"
                                aria-label="Twitter"
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M17.316 6.246c.008.112.008.225.008.338 0 3.44-2.62 7.404-7.404 7.404v-.002A7.36 7.36 0 013 13.07a5.21 5.21 0 003.85-1.08 2.6 2.6 0 01-2.43-1.808c.4.076.81.062 1.2-.045a2.6 2.6 0 01-2.08-2.55v-.033c.35.195.75.312 1.18.326a2.6 2.6 0 01-.805-3.47 7.38 7.38 0 005.36 2.72 2.6 2.6 0 014.43-2.37 5.18 5.18 0 001.65-.63 2.6 2.6 0 01-1.14 1.43 5.19 5.19 0 001.49-.41 5.56 5.56 0 01-1.3 1.35z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition"
                                aria-label="Facebook"
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.883h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition"
                                aria-label="LinkedIn"
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.75 1.75-1.75s1.75.78 1.75 1.75c0 .97-.784 1.76-1.75 1.76zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v4.74z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition"
                                aria-label="GitHub"
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </a>
                            <a
                                href="mailto:hello@incogninote.com"
                                className="hover:text-primary transition"
                                aria-label="Email"
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M3.5 5A2.5 2.5 0 016 2.5h8A2.5 2.5 0 0116.5 5v10A2.5 2.5 0 0114 17.5H6A2.5 2.5 0 013.5 15V5zm1.75.5v.511l4.75 3.239 4.75-3.239V5.5a1 1 0 00-1-1H6.25a1 1 0 00-1 1zm10.25 1.489l-4.5 3.07a1 1 0 01-1.1 0l-4.5-3.07V15a1 1 0 001 1h8a1 1 0 001-1V6.989z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </a>
                        </div>
                        {/* Divider */}
                        <div className="w-full border-t border-border/40 my-6"></div>
                        {/* Copyright */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full text-xs text-muted-foreground/80 px-2">
                            <span>
                                &copy; {new Date().getFullYear()} IncogniNote
                            </span>
                            <span className="hidden md:inline w-1 h-1 rounded-full bg-primary/30 mx-2"></span>
                            <span>All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Decorative accent at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] h-24 pointer-events-none z-0">
                <div className="w-full h-full bg-gradient-to-t from-primary/10 via-background/0 to-transparent rounded-t-3xl blur-2xl" />
            </div>

            {/* Scroll to top button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary/90 text-white shadow-lg hover:bg-primary transition-all duration-300 md:hidden ${
                    showScrollTop
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10 pointer-events-none"
                }`}
                aria-label="Scroll to top"
            >
                <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                </svg>
            </button>
        </main>
    );
}

export default Home;
