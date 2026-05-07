"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isInitializing } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Check initial position on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ${scrolled || isMobileMenuOpen
        ? "bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm"
        : "bg-transparent border-transparent shadow-none"
        }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Image src={logo}
              alt="Logo"
              width={100}
              height={100}
              priority
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/#portfolio" className="transition-colors hover:text-primary">作品集</Link>
          <Link href="/#about" className="transition-colors hover:text-primary">關於</Link>
          <Link href="/#bookingInfo" className="transition-colors hover:text-primary">預約須知</Link>
        </div>

        {/* CTA Button & Mobile Toggle Container */}
        <div className="flex items-center gap-4">
          <Button size="sm" asChild className="rounded-full px-6 shadow-sm">
            <Link href="/booking">立即預約</Link>
          </Button>

          {isInitializing ? (
            <div className="hidden md:block w-12 h-6 animate-pulse bg-muted/60 rounded-md"></div>
          ) : user ? (
            <div className="relative group hidden md:block">
              <button className="font-bold hover:text-primary transition-colors py-2 hover:cursor-pointer">
                Hi, {user.name}
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-surface border border-border/50 shadow-soft rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                {user.role === "OWNER" ? (
                  <Link href="/admin" className="block px-4 py-3 text-sm hover:bg-accent-primary/5 transition-colors">後台系統</Link>
                ) : (
                  <Link href="/history" className="block px-4 py-3 text-sm hover:bg-accent-primary/5 transition-colors">預約紀錄</Link>
                )}
                <button onClick={logout} className="w-full text-left px-4 py-3 text-sm text-destructive hover:bg-destructive/5 transition-colors cursor-pointer">登出</button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">登入</Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-foreground focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 bg-background" : "max-h-0"
          }`}
      >
        <div className="container mx-auto px-6 flex flex-col space-y-2 pb-4">
          <Link
            href="/#portfolio"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-medium transition-colors hover:text-primary py-3 border-b border-border/30"
          >
            作品集
          </Link>
          <Link
            href="/#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-medium transition-colors hover:text-primary py-3 border-b border-border/30"
          >
            關於
          </Link>
          <Link
            href="/#bookingInfo"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-medium transition-colors hover:text-primary py-3 border-b border-border/30"
          >
            預約須知
          </Link>
          {isInitializing ? (
            <div className="py-3 flex flex-col gap-3">
              <div className="w-16 h-5 animate-pulse bg-muted/60 rounded"></div>
              <div className="w-16 h-5 animate-pulse bg-muted/60 rounded"></div>
            </div>
          ) : user ? (
            <>
              {user.role === "OWNER" ? (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium transition-colors hover:text-primary py-3 border-b border-border/30"
                >
                  後台系統
                </Link>
              ) : (
                <Link
                  href="/history"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium transition-colors hover:text-primary py-3 border-b border-border/30"
                >
                  預約紀錄
                </Link>
              )}
              <button
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="text-left text-sm font-medium text-destructive transition-colors hover:text-destructive/80 py-3 cursor-pointer"
              >
                登出
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium transition-colors hover:text-primary py-3"
            >
              登入
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
