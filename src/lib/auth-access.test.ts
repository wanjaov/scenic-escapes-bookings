import { describe, expect, it } from 'bun:test';
import { requireSignedInUser, safeReturnPath } from './auth-access';

describe('account-only access', () => {
  it('denies signed-out visitors', async () => {
    await expect(requireSignedInUser(async () => null)).rejects.toThrow('SIGN_IN_REQUIRED');
  });
  it('allows a verified signed-in user', async () => {
    expect(await requireSignedInUser(async () => ({ id: 'user-123' }))).toEqual({ id: 'user-123' });
  });
  it('preserves the requested stay search after login', () => {
    expect(safeReturnPath('/stays?destination=Diani&adults=2')).toBe('/stays?destination=Diani&adults=2');
  });
  it('rejects off-site login destinations', () => {
    for (const path of ['https://example.com', '//example.com', '/\\example.com', '/auth']) expect(safeReturnPath(path)).toBe('/');
  });
});