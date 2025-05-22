"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
    const { data: session } = useSession();
    const { setTheme, theme } = useTheme();

    const user: User = session?.user as User;

    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-lg transition-colors duration-300">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-primary transition-colors duration-300">
                        IncogniNote
                    </span>
                </Link>
                <div className="flex items-center gap-6">
                    {session ? (
                        <>
                            <span
                                className="hidden sm:inline-block font-medium text-base px-3 py-1 rounded-lg"
                                style={{
                                    color: "inherit",
                                    background: "rgba(0,0,0,0.03)",
                                }}
                            >
                                Welcome,{" "}
                                <span className="font-semibold text-primary">
                                    {user?.username || user?.email}
                                </span>
                            </span>
                            <Button
                                className="rounded-full px-5 py-2 font-semibold bg-gradient-to-r from-primary to-secondary text-background shadow-md hover:from-secondary hover:to-primary transition-all duration-200"
                                onClick={() => signOut()}
                            >
                                Logout
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative rounded-full border border-border bg-muted/60 dark:bg-muted/40 hover:bg-primary/10 transition-colors"
                                        aria-label="Toggle theme"
                                    >
                                        <Sun className="h-5 w-5 text-yellow-400 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-5 w-5 text-blue-400 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">
                                            Toggle theme
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="min-w-[8rem]"
                                >
                                    <DropdownMenuItem
                                        onClick={() => setTheme("light")}
                                        className={
                                            theme === "light"
                                                ? "font-bold text-primary"
                                                : ""
                                        }
                                    >
                                        <Sun className="mr-2 h-4 w-4" /> Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setTheme("dark")}
                                        className={
                                            theme === "dark"
                                                ? "font-bold text-primary"
                                                : ""
                                        }
                                    >
                                        <Moon className="mr-2 h-4 w-4" /> Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setTheme("system")}
                                        className={
                                            theme === "system"
                                                ? "font-bold text-primary"
                                                : ""
                                        }
                                    >
                                        <span className="mr-2">🖥️</span> System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in">
                                <Button className="rounded-full px-5 py-2 font-bold bg-gradient-to-r from-primary to-secondary text-foreground shadow-md hover:from-secondary hover:to-primary transition-all duration-200">
                                    Login
                                </Button>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative rounded-full border border-border bg-muted/60 dark:bg-muted/40 hover:bg-primary/10 transition-colors"
                                        aria-label="Toggle theme"
                                    >
                                        <Sun className="h-5 w-5 text-yellow-400 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-5 w-5 text-blue-400 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">
                                            Toggle theme
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="min-w-[8rem]"
                                >
                                    <DropdownMenuItem
                                        onClick={() => setTheme("light")}
                                        className={
                                            theme === "light"
                                                ? "font-bold text-primary"
                                                : ""
                                        }
                                    >
                                        <Sun className="mr-2 h-4 w-4" /> Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setTheme("dark")}
                                        className={
                                            theme === "dark"
                                                ? "font-bold text-primary"
                                                : ""
                                        }
                                    >
                                        <Moon className="mr-2 h-4 w-4" /> Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setTheme("system")}
                                        className={
                                            theme === "system"
                                                ? "font-bold text-primary"
                                                : ""
                                        }
                                    >
                                        <span className="mr-2">🖥️</span> System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
