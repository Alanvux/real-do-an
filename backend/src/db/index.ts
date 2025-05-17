// src/db/index.ts
import { Pool, QueryResult } from 'pg';
import config from '../config';
import logger from '../utils/logger';

// Initialize a new pool with configuration from config
const pool = new Pool({
  connectionString: config.databaseUrl,
});

// Test the connection
pool.on('connect', () => {
  logger.info('Database connected successfully');
});

pool.on('error', (err) => {
  logger.error('Database connection error:', err.message);
  process.exit(1); // Exit with failure
});

/**
 * Execute a SQL query with parameters
 * @param text SQL query text
 * @param params Query parameters
 * @returns Query result
 */
export async function query<T>(text: string, params?: any[]): Promise<QueryResult<T>> {
  const start = Date.now();
  
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    
    // Log query for dev environment
    if (config.environment === 'development') {
      logger.debug('Executed query', { text, duration, rows: res.rowCount });
    }
    
    return res;
  } catch (err) {
    const error = err as Error;
    logger.error('Database query error:', { text, error: error.message });
    throw err;
  }
}

/**
 * Execute a transaction with multiple queries
 * @param callback Function that performs the transaction queries
 * @returns Result of the transaction
 */
export async function transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export default { query, transaction };