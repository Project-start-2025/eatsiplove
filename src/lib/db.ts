// import sql from 'mssql';

// const config: sql.config = {
//   user: process.env.DB_USER!,
//   password: process.env.DB_PASS!,
//   server: process.env.DB_SERVER!,
//   database: process.env.DB_NAME!,
//   options: {
//     encrypt: true,
//     trustServerCertificate: true,
//   },
// };

// let pool: sql.ConnectionPool | null = null;

// export async function getPool() {
//   if (pool) return pool;
//   pool = await sql.connect(config);
//   return pool;
// }