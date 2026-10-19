CREATE TABLE public.profiles (
 id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
 display_name text NOT NULL DEFAULT '' CHECK (char_length(display_name) <= 100),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Create own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE FUNCTION public.create_user_profile() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 INSERT INTO public.profiles (id, display_name) VALUES (NEW.id, left(coalesce(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', ''),100));
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.create_user_profile() FROM PUBLIC;
CREATE TRIGGER routebook_create_profile AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_user_profile();
INSERT INTO public.profiles (id, display_name) SELECT id, left(coalesce(raw_user_meta_data->>'display_name', raw_user_meta_data->>'full_name', ''),100) FROM auth.users ON CONFLICT (id) DO NOTHING;