import { Redis } from '@upstash/redis'

// Upstash Redis URL is rediss://default:TOKEN@HOST:PORT
// @upstash/redis requires https://URL and TOKEN separately

const parseRedisUrl = (url: string) => {
  if (!url) return { url: '', token: '' };
  try {
    const withoutProtocol = url.replace('rediss://', '').replace('redis://', '');
    if (!withoutProtocol.includes('@')) {
       return { url: '', token: '' };
    }
    const [auth, rest] = withoutProtocol.split('@');
    if (!auth || !rest) return { url: '', token: '' };
    
    const token = auth.includes(':') ? auth.split(':')[1] : auth;
    const host = rest.includes(':') ? rest.split(':')[0] : rest;
    
    return {
      url: `https://${host}`,
      token: token
    };
  } catch (e) {
    console.error('Error parsing REDIS_URL:', e);
    return { url: '', token: '' };
  }
};

const credentials = parseRedisUrl(process.env.REDIS_URL || '');

export const redis = new Redis({
  url: credentials.url,
  token: credentials.token,
})
