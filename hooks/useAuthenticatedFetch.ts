import { useCallback } from 'react';

/**
 * The Company HQ — no auth needed, just fetch directly.
 */
export function useAuthenticatedFetch() {
  const authenticatedFetch = useCallback(async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    return fetch(url, options);
  }, []);

  return authenticatedFetch;
}
