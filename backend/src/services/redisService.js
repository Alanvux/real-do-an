// src/services/redisService.js
const redis = require('redis');
const config = require('../config');
const logger = require('../utils/logger');

// Create Redis client
const redisUrl = config.redisUrl;
const client = redis.createClient({
  url: redisUrl
});

// Connect to Redis
(async () => {
  try {
    await client.connect();
    logger.info('Redis connected successfully');
  } catch (err) {
    logger.error('Redis connection error:', err.message);
  }
})();

// Handle Redis errors
client.on('error', (err) => {
  logger.error('Redis error:', err.message);
});

// Set a key-value pair with expiration
const setWithExpiry = async (key, value, expiryInSeconds) => {
  try {
    await client.set(key, value, { EX: expiryInSeconds });
    return true;
  } catch (error) {
    logger.error(`Redis setWithExpiry error: ${error.message}`);
    return false;
  }
};

// Get a value by key
const get = async (key) => {
  try {
    return await client.get(key);
  } catch (error) {
    logger.error(`Redis get error: ${error.message}`);
    return null;
  }
};

// Delete a key
const del = async (key) => {
  try {
    await client.del(key);
    return true;
  } catch (error) {
    logger.error(`Redis del error: ${error.message}`);
    return false;
  }
};

// Add token to blacklist when a user logs out
const blacklistToken = async (token, expiryInSeconds) => {
  return await setWithExpiry(`bl_${token}`, 'true', expiryInSeconds);
};

// Check if token is blacklisted
const getBlacklistedToken = async (token) => {
  return await get(`bl_${token}`);
};

// Cache course data for faster retrieval
const cacheCoursesData = async (courses) => {
  try {
    await client.set('courses', JSON.stringify(courses), { EX: 3600 }); // Cache for 1 hour
    return true;
  } catch (error) {
    logger.error(`Redis cache courses error: ${error.message}`);
    return false;
  }
};

// Get cached courses data
const getCachedCoursesData = async () => {
  try {
    const data = await client.get('courses');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logger.error(`Redis get cached courses error: ${error.message}`);
    return null;
  }
};

// Clear cache for a specific key or pattern
const clearCache = async (pattern) => {
  try {
    if (pattern) {
      const keys = await client.keys(pattern);
      if (keys.length > 0) {
        await client.del(keys);
      }
    }
    return true;
  } catch (error) {
    logger.error(`Redis clear cache error: ${error.message}`);
    return false;
  }
};

module.exports = {
  setWithExpiry,
  get,
  del,
  blacklistToken,
  getBlacklistedToken,
  cacheCoursesData,
  getCachedCoursesData,
  clearCache
};