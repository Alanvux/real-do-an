// src/services/redisService.ts
import redis from 'redis';
import config from '../config';
import logger from '../utils/logger';

// Redis client type
type RedisClient = ReturnType<typeof redis.createClient>;

// Create Redis client
const redisUrl = config.redisUrl;
const client: RedisClient = redis.createClient({
  url: redisUrl
});

// Connect to Redis
(async () => {
  try {
    await client.connect();
    logger.info('Redis connected successfully');
  } catch (err) {
    const error = err as Error;
    logger.error('Redis connection error:', error.message);
  }
})();

// Handle Redis errors
client.on('error', (err) => {
  logger.error('Redis error:', err.message);
});

/**
 * Set a key-value pair with expiration
 * @param key - Redis key
 * @param value - Value to store
 * @param expiryInSeconds - Time to live in seconds
 * @returns Promise<boolean> - Success status
 */
const setWithExpiry = async (key: string, value: string, expiryInSeconds: number): Promise<boolean> => {
  try {
    await client.set(key, value, { EX: expiryInSeconds });
    return true;
  } catch (error) {
    const err = error as Error;
    logger.error(`Redis setWithExpiry error: ${err.message}`);
    return false;
  }
};

/**
 * Get a value by key
 * @param key - Redis key
 * @returns Promise<string | null> - Retrieved value or null
 */
const get = async (key: string): Promise<string | null> => {
  try {
    return await client.get(key);
  } catch (error) {
    const err = error as Error;
    logger.error(`Redis get error: ${err.message}`);
    return null;
  }
};

/**
 * Delete a key
 * @param key - Redis key
 * @returns Promise<boolean> - Success status
 */
const del = async (key: string): Promise<boolean> => {
  try {
    await client.del(key);
    return true;
  } catch (error) {
    const err = error as Error;
    logger.error(`Redis del error: ${err.message}`);
    return false;
  }
};

/**
 * Add token to blacklist when a user logs out
 * @param token - JWT token
 * @param expiryInSeconds - Token expiry time in seconds
 * @returns Promise<boolean> - Success status
 */
const blacklistToken = async (token: string, expiryInSeconds: number): Promise<boolean> => {
  return await setWithExpiry(`bl_${token}`, 'true', expiryInSeconds);
};

/**
 * Check if token is blacklisted
 * @param token - JWT token
 * @returns Promise<string | null> - Blacklist status
 */
const getBlacklistedToken = async (token: string): Promise<string | null> => {
  return await get(`bl_${token}`);
};

/**
 * Cache course data for faster retrieval
 * @param courses - Courses data
 * @returns Promise<boolean> - Success status
 */
const cacheCoursesData = async (courses: any): Promise<boolean> => {
  try {
    await client.set('courses', JSON.stringify(courses), { EX: 3600 }); // Cache for 1 hour
    return true;
  } catch (error) {
    const err = error as Error;
    logger.error(`Redis cache courses error: ${err.message}`);
    return false;
  }
};

/**
 * Get cached courses data
 * @returns Promise<any | null> - Cached courses data
 */
const getCachedCoursesData = async (): Promise<any | null> => {
  try {
    const data = await client.get('courses');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    const err = error as Error;
    logger.error(`Redis get cached courses error: ${err.message}`);
    return null;
  }
};

/**
 * Clear cache for a specific key or pattern
 * @param pattern - Key pattern to clear
 * @returns Promise<boolean> - Success status
 */
const clearCache = async (pattern?: string): Promise<boolean> => {
  try {
    if (pattern) {
      const keys = await client.keys(pattern);
      if (keys.length > 0) {
        await client.del(keys);
      }
    }
    return true;
  } catch (error) {
    const err = error as Error;
    logger.error(`Redis clear cache error: ${err.message}`);
    return false;
  }
};

export default {
  setWithExpiry,
  get,
  del,
  blacklistToken,
  getBlacklistedToken,
  cacheCoursesData,
  getCachedCoursesData,
  clearCache
};