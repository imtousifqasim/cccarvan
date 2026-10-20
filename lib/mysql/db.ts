import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getDbPool(): mysql.Pool {
  if (!pool) {
    const host = process.env.MYSQL_HOST || 'srv1676.hstgr.io';
    const port = Number(process.env.MYSQL_PORT) || 3306;
    const user = process.env.MYSQL_USER || 'u994156402_cccarvan';
    const password = process.env.MYSQL_PASSWORD || 'o^eyWbnQI6R1';
    const database = process.env.MYSQL_DATABASE || 'u994156402_cccarvan';

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 10000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return pool;
}

export async function queryMysql<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const p = getDbPool();
  const [rows] = await p.query(sql, params);
  return rows as T[];
}

export async function executeMysql(sql: string, params: any[] = []): Promise<any> {
  const p = getDbPool();
  const [result] = await p.execute(sql, params);
  return result;
}
