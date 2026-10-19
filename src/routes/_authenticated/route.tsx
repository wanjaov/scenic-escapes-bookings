import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { requireSignedInUser, safeReturnPath } from '@/lib/auth-access';
import { SiteNav } from '@/components/SiteNav';

export const Route = createFileRoute('/_authenticated')({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const user = await requireSignedInUser(async () => {
      const { data, error } = await supabase.auth.getUser();
      return error ? null : data.user;
    }).catch(() => null);
    if (!user) throw redirect({ to: '/auth', search: { mode: 'signin', redirect: safeReturnPath(location.href) } });
    return { user };
  },
  component: () => <><SiteNav /><Outlet /></>,
});