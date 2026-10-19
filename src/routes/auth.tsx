import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useAccount } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { safeReturnPath } from '@/lib/auth-access';
import '@lovable.dev/cloud-auth-js/styles.css';

export const Route = createFileRoute('/auth')({
  validateSearch: (search: Record<string, unknown>) => ({ mode: search['mode'] === 'register' ? 'register' : 'signin', redirect: safeReturnPath(search['redirect']) }),
  head: () => ({ meta: [{ title: 'Sign In & Register | Routebook' }, { name: 'description', content: 'Sign in to your Routebook account to explore stays, flights, rentals and attractions.' }, { property: 'og:title', content: 'Your Routebook Account' }, { property: 'og:description', content: 'Create your personal account and plan your next journey.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }] }),
  component: AuthPage,
});
const schema = z.object({ email: z.string().trim().email('Enter a valid email address').max(255), password: z.string().min(8, 'Use at least 8 characters').max(128) });

function AuthPage() {
  const navigate = useNavigate();
  const { mode, redirect } = Route.useSearch();
  const { user } = useAccount();
  const register = mode === 'register';
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (user) void navigate({ href: redirect, replace: true }); }, [user, redirect, navigate]);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setMessage('');
    const result = schema.safeParse({ email, password });
    if (!result.success) { setMessage(result.error.issues[0]?.message ?? 'Check your details.'); return; }
    if (register && !name.trim()) { setMessage('Enter your name.'); return; }
    setBusy(true);
    try {
      if (register) {
        const { data, error } = await supabase.auth.signUp({ ...result.data, options: { data: { display_name: name.trim() }, emailRedirectTo: `${window.location.origin}/auth?redirect=${encodeURIComponent(redirect)}` } });
        if (error) setMessage(error.message);
        else if (!data.session) setMessage('Check your email for a confirmation link before signing in.');
        else await navigate({ href: redirect, replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword(result.data);
        if (error) setMessage(error.message); else await navigate({ href: redirect, replace: true });
      }
    } catch { setMessage('We couldn’t sign you in. Please try again.'); }
    finally { setBusy(false); }
  };
  const social = async (provider: 'google' | 'lovable') => {
    setMessage(''); setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/auth?redirect=${encodeURIComponent(redirect)}` });
      if (result.error) setMessage(result.error.message);
      else if (!result.redirected) { const { data } = await supabase.auth.getUser(); if (data.user) await navigate({ href: redirect, replace: true }); }
    } catch { setMessage('Sign-in couldn’t start. Please try again.'); }
    finally { setBusy(false); }
  };
  const forgotPassword = async () => {
    if (!z.string().email().safeParse(email.trim()).success) { setMessage('Enter your email address first.'); return; }
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
      setMessage(error ? error.message : 'If an account exists, a password reset link has been sent.');
    } catch { setMessage('Please try again.'); }
    finally { setBusy(false); }
  };
  return <><header className="border-b border-border px-6 py-5"><span className="font-display text-2xl font-semibold">Routebook<span className="text-primary">.</span></span></header><main className="mx-auto max-w-md px-6 py-12 sm:py-16"><p className="text-xs font-semibold uppercase text-terra-deep">Your next journey starts here</p><h1 className="mt-3 font-display text-4xl font-semibold">{register ? 'Create your account' : 'Welcome to Routebook'}</h1><p className="mt-3 text-muted-foreground">Sign in to explore stays, flights, car rentals and attractions.</p><div className="mt-7 flex border-b border-border">{(['signin', 'register'] as const).map((value) => <Button key={value} variant="ghost" asChild className={`flex-1 rounded-none ${mode === value ? 'border-b-2 border-primary' : ''}`}><Link to="/auth" search={{ mode: value, redirect }}>{value === 'signin' ? 'Sign In' : 'Register'}</Link></Button>)}</div><form onSubmit={submit} className="mt-6 space-y-4">{register && <label className="block text-sm font-medium">Full name<input className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 focus:ring-2 focus:ring-ring" autoComplete="name" required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} /></label>}<label className="block text-sm font-medium">Email address<input className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 focus:ring-2 focus:ring-ring" type="email" autoComplete="email" required maxLength={255} value={email} onChange={(event) => setEmail(event.target.value)} /></label><label className="block text-sm font-medium">Password<input className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 focus:ring-2 focus:ring-ring" type="password" autoComplete={register ? 'new-password' : 'current-password'} required minLength={8} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} /></label><Button disabled={busy} type="submit" className="h-11 w-full">{busy ? 'Please wait…' : register ? 'Create account' : 'Sign In'}</Button>{!register && <Button variant="link" type="button" disabled={busy} onClick={forgotPassword}>Forgot password?</Button>}</form>{message && <p role="status" className="mt-4 text-sm text-terra-deep">{message}</p>}<div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div><div className="space-y-3"><Button variant="outline" disabled={busy} className="h-11 w-full" onClick={() => social('google')}>Continue with Google</Button><Button disabled={busy} className="lovable-auth-button w-full" onClick={() => social('lovable')}>Continue with Lovable</Button></div></main></>;
}
