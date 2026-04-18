"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      <div className="glass-card w-full max-w-md p-8 rounded-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tighter text-primary">BASE<span className="text-foreground">CRM</span></h1>
          <p className="text-slate-500 font-semibold uppercase text-[10px] tracking-widest">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400">Email Address</label>
            <div className="flex items-center gap-3 rounded-xl border bg-white px-3 py-2 text-slate-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all dark:bg-slate-900">
              <Mail size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com" 
                className="bg-transparent text-sm outline-none w-full text-foreground"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400">Password</label>
            <div className="flex items-center gap-3 rounded-xl border bg-white px-3 py-2 text-slate-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all dark:bg-slate-900">
              <Lock size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="bg-transparent text-sm outline-none w-full text-foreground"
                required
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-danger/10 p-3 text-xs font-bold text-danger">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="text-center">
            <p className="text-[10px] font-black uppercase text-slate-400">Default Auth: Use your Supabase Credentials</p>
        </div>
      </div>
    </div>
  );
}
