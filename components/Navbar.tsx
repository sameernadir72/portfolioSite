"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Button from "./ui/Button";
import IconButton from "./ui/IconButton";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

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

  return (
    <nav className="w-full border-b bg-white/60 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">Sameer Nadir</Link>
        <div className="flex items-center gap-4">
          <Link href="/projects" className="text-sm hover:underline">Projects</Link>
          <Link href="/resume" className="text-sm hover:underline">Resume</Link>
          <Link href="/contact" className="text-sm hover:underline">Contact</Link>
          {userEmail ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-700 flex items-center gap-2"><User size={16} />{userEmail}</span>
              <IconButton onClick={signOut} title="Sign out">
                <LogOut size={16} className="text-red-600" />
              </IconButton>
            </div>
          ) : (
            <Button onClick={() => (window.location.href = '/login')}>Login</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
