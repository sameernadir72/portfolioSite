"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Button from "./ui/Button";
import IconButton from "./ui/IconButton";
import { LogOut, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // @ts-ignore
        const { data } = await supabase.auth.getUser();
        setUserEmail(data?.user?.email ?? null);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    window.location.href = "/";
  };

  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm" 
          : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="font-bold text-xl bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
        >
          Sameer Nadir
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:text-slate-900 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-3">
          {/* {userEmail ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 text-sm">
                <User size={16} className="text-cyan-600 dark:text-cyan-400" />
                <span className="text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{userEmail}</span>
              </div>
              <IconButton 
                onClick={signOut} 
                title="Sign out"
                variant="glow"
              >
                <LogOut size={18} className="text-red-500 dark:text-red-400" />
              </IconButton>
            </>
          ) : (
            <Button 
              onClick={() => (window.location.href = '/login')}
              variant="default"
              size="md"
            >
              Sign In
            </Button>
          )} */}
        </div>

        {/* Mobile Menu Button */}
        <IconButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
          variant="ghost"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </IconButton>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate-200/50 dark:border-slate-700/50 pt-3 mt-3">
              {userEmail ? (
                <>
                  <div className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-2">
                    <User size={16} />
                    {userEmail}
                  </div>
                  <Button 
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <LogOut size={16} className="text-red-500" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => {
                    window.location.href = '/login';
                    setMobileMenuOpen(false);
                  }}
                  variant="default"
                  className="w-full"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
