import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { supabase } from "../integrations/supabase/client";
import { lovable } from "../integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({ mode: search.mode === "register" ? "register" : "signin" }),
  head: () => ({ meta: [{ title: "Register or Sign In | Routebook" }, { name: "description", content: "Create a Routebook account or sign in to plan your next stay." }, { property: "og:title", content: "Register or Sign In | Routebook" }, { property: "og:description", content: "Create a Routebook account or sign in to plan your next stay." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: AuthPage,
});
const schema = z.object({ email: z.string().trim().email("Enter a valid email address").max(255), password: z.string().min(8, "Use at least 8 characters").max(128) });

function AuthPage() {
  const navigate = useNavigate();
  const { mode } = Route.useSearch();
  const [register, setRegister] = useState(mode === "register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setSignedIn(Boolean(data.user))); const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session))); return () => listener.subscription.unsubscribe(); }, []);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setMessage("");
    const result = schema.safeParse({ email, password });
    if (!result.success) { setMessage(result.error.issues[0]?.message || "Please check your details."); return; }
    setBusy(true);
    try {
      if (register) {
        const { data, error } = await supabase.auth.signUp({ email: result.data.email, password: result.data.password });
        if (error) setMessage(error.message);
        else if (!data.session) setMessage("Check your email for a confirmation link, then sign in.");
        else navigate({ to: "/" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: result.data.email, password: result.data.password });
        if (error) setMessage(error.message); else navigate({ to: "/" });
      }
    } catch { setMessage("Something went wrong. Please try again."); }
    finally { setBusy(false); }
  };
  const google = async () => { setMessage(""); setBusy(true); try { const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin }); if (result.error) setMessage(result.error.message); else if (!result.redirected) navigate({ to: "/" }); } catch { setMessage("Google sign-in couldn't start. Please try again."); } finally { setBusy(false); } };
  return <main className="mx-auto max-w-md px-6 py-16 sm:py-24"><p className="text-xs font-semibold uppercase text-terra-deep">Your Routebook</p><h1 className="mt-3 text-4xl">{signedIn ? "Welcome back" : register ? "Create an account" : "Sign in"}</h1><p className="mt-3 text-muted-foreground">{signedIn ? "You're signed in and ready to explore." : "A place to start your next journey."}</p>{signedIn ? <div className="mt-8 space-y-3"><Button asChild className="w-full"><Link to="/">Explore stays</Link></Button><Button variant="outline" className="w-full" onClick={async () => { await supabase.auth.signOut(); setSignedIn(false); }}>Sign out</Button></div> : <><div className="mt-8 flex border-b border-border"><Button variant="ghost" className={`flex-1 rounded-none ${!register ? "border-b-2 border-primary" : ""}`} onClick={() => { setRegister(false); setMessage(""); }}>Sign In</Button><Button variant="ghost" className={`flex-1 rounded-none ${register ? "border-b-2 border-primary" : ""}`} onClick={() => { setRegister(true); setMessage(""); }}>Register</Button></div><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm font-medium">Email address<input type="email" autoComplete="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" /></label><label className="block text-sm font-medium">Password<input type="password" autoComplete={register ? "new-password" : "current-password"} required minLength={8} maxLength={128} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" /></label>{message && <p role="status" className="text-sm text-terra-deep">{message}</p>}<Button disabled={busy} type="submit" className="h-11 w-full">{busy ? "Please wait…" : register ? "Register" : "Sign In"}</Button></form><div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div><Button type="button" variant="outline" disabled={busy} className="h-11 w-full" onClick={google}>Continue with Google</Button></>}</main>;
}
