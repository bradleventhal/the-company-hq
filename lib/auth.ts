import fs from 'fs';
import path from 'path';
import os from 'os';
import { randomBytes } from 'crypto';

const TOKEN_FILE = path.join(os.homedir(), '.openclaw', '.openclawfice-token');

/**
 * Generate or load the API auth token.
 * Token is stored in ~/.openclaw/.openclawfice-token
 * 
 * This protects against:
 * - Malicious apps on same machine hitting localhost endpoints
 * - Browser extensions making unauthorized requests
 * - Port scanners (if misconfigured to bind 0.0.0.0)
 */
export function getOrCreateToken(): string {
  try {
    // Try to read existing token
    if (fs.existsSync(TOKEN_FILE)) {
      return fs.readFileSync(TOKEN_FILE, 'utf-8').trim();
    }

    // Generate new token (32 bytes = 256 bits of entropy)
    const token = randomBytes(32).toString('hex');
    
    // Ensure directory exists
    fs.mkdirSync(path.dirname(TOKEN_FILE), { recursive: true });
    
    // Write token with restrictive permissions (owner read/write only)
    fs.writeFileSync(TOKEN_FILE, token, { mode: 0o600 });
    
    return token;
  } catch (err) {
    console.error('Failed to manage auth token:', err);
    // Fallback: generate ephemeral token for this session
    return randomBytes(32).toString('hex');
  }
}

/**
 * Verify the request has valid auth token.
 * Returns true if authorized, false otherwise.
 */
export function verifyToken(request: Request): boolean {
  const expectedToken = getOrCreateToken();
  const providedToken = request.headers.get('X-OpenClawfice-Token');
  
  if (!providedToken) {
    return false;
  }

  // Constant-time comparison to prevent timing attacks
  return constantTimeEqual(expectedToken, providedToken);
}

/**
 * Constant-time string comparison to prevent timing attacks.
 * Returns true if strings are equal, false otherwise.
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Middleware to require authentication on API routes.
 * Returns 401 response if token is missing or invalid.
 */
export function requireAuth(request: Request): Response | null {
  if (!verifyToken(request)) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized - missing or invalid token' }),
      { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
  return null;
}
