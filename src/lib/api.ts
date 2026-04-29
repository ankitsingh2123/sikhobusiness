/**
 * Central API base URL utility.
 * - In development: empty string → Next.js proxy rewrites /api/* → localhost:5000/api/*
 * - In production: set NEXT_PUBLIC_API_URL=https://api.yourdomain.com in env
 */
const isProd = typeof window !== 'undefined' ? !window.location.hostname.includes('localhost') : process.env.NODE_ENV === 'production';
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || (isProd ? "https://seekhobusinessbackend.onrender.com" : "");

/**
 * Build a full API URL path.
 * Usage: apiUrl("/api/user/me") → "" + "/api/user/me" (dev) or "https://api.xxx.com/api/user/me" (prod)
 */
export const apiUrl = (path: string) => `${API_BASE}${path}`;
