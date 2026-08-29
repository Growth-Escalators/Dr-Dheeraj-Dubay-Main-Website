import 'server-only'

type GoogleTokenResponse = {
  access_token?: string
  expires_in?: number
  token_type?: string
  scope?: string
  error?: string
}

type CachedToken = {
  accessToken: string
  expiresAt: number
}

let cachedToken: CachedToken | null = null

function requiredEnv(name: 'GOOGLE_OAUTH_CLIENT_ID' | 'GOOGLE_OAUTH_CLIENT_SECRET' | 'GOOGLE_OAUTH_REFRESH_TOKEN') {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Missing required Google OAuth environment variable: ${name}`)
  }
  return value
}

export function isGoogleOAuthConfigured() {
  return Boolean(
    process.env.GOOGLE_OAUTH_CLIENT_ID?.trim() &&
      process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim() &&
      process.env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim(),
  )
}

/**
 * Exchanges the long-lived refresh token for a short-lived Google access token.
 *
 * The access token is cached only in the current server process and is refreshed
 * five minutes before expiry. Client secret / refresh token values never leave
 * the server and are never logged.
 */
export async function getGoogleAccessToken(): Promise<string> {
  const now = Date.now()
  if (cachedToken && cachedToken.expiresAt > now) {
    return cachedToken.accessToken
  }

  const params = new URLSearchParams({
    client_id: requiredEnv('GOOGLE_OAUTH_CLIENT_ID'),
    client_secret: requiredEnv('GOOGLE_OAUTH_CLIENT_SECRET'),
    refresh_token: requiredEnv('GOOGLE_OAUTH_REFRESH_TOKEN'),
    grant_type: 'refresh_token',
  })

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
    cache: 'no-store',
  })

  let payload: GoogleTokenResponse = {}
  try {
    payload = (await response.json()) as GoogleTokenResponse
  } catch {
    // Keep the thrown error below intentionally free of response-body data so
    // OAuth credentials/tokens can never leak through logs or error pages.
  }

  if (!response.ok || !payload.access_token) {
    const suffix = payload.error ? ` (${payload.error})` : ''
    throw new Error(`Google OAuth token refresh failed with HTTP ${response.status}${suffix}`)
  }

  const expiresInSeconds = Math.max(payload.expires_in ?? 3600, 300)
  const refreshEarlySeconds = 300
  cachedToken = {
    accessToken: payload.access_token,
    expiresAt: now + Math.max(expiresInSeconds - refreshEarlySeconds, 60) * 1000,
  }

  return payload.access_token
}
