export function safeReturnPath(value: unknown): string {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || /[\\\u0000-\u0020]/.test(value)) return '/';
  const pathname = value.split(/[?#]/)[0];
  if (pathname === '/auth' || pathname === '/reset-password') return '/';
  return value;
}

export async function requireSignedInUser<T>(readUser: () => Promise<T | null>): Promise<T> {
  const user = await readUser();
  if (!user) throw new Error('SIGN_IN_REQUIRED');
  return user;
}