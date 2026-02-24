import { useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Demo Mode Hook - Detects demo mode and returns appropriate API paths
 * Activates when ?demo=true OR when on the /demo route
 */
export function useDemoMode() {
  let searchParams;
  let pathname = '';
  try {
    searchParams = useSearchParams();
    pathname = usePathname() || '';
  } catch {
    searchParams = null;
  }
  const isDemoMode = searchParams?.get('demo') === 'true' || pathname === '/demo';

  const getApiPath = useCallback((path: string) => {
    if (!isDemoMode) return path;
    
    const demoMap: Record<string, string> = {
      '/api/office': '/api/demo',
      '/api/office/actions': '/api/demo/actions',
      '/api/office/chat': '/api/demo/chat',
      '/api/office/meeting': '/api/demo/meeting',
      '/api/office/config': '/api/demo/config',
      '/api/office/autowork': '/api/demo/autowork',
      '/api/office/meeting/start': '/api/demo/meeting/start',
      '/api/office/message': '/api/demo/message',
      '/api/office/stop': '/api/demo/stop',
    };
    
    return demoMap[path] || path;
  }, [isDemoMode]);

  return {
    isDemoMode,
    getApiPath,
  };
}
