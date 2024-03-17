const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL ,
});

async function tableExists(tableName: string) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables 
        WHERE  table_name = $1
      );`,
      [tableName]
    );
    return res.rows[0].exists;
  } catch (error) {
    console.error('Error checking table existence:', error);
    return false;
  } finally {
    client.release();
  }
}

const createTablesSQL = fs.readFileSync(path.join(__dirname, '../../migrations/create.sql'), 'utf8');
const dropTablesSQL = fs.readFileSync(path.join(__dirname, '../../migrations/drop.sql'), 'utf8');

async function migrate(sqlScript) {
  const client = await pool.connect();
  try {
    await client.query(sqlScript);
    console.log('✅ Migration successful');
  } catch (error) {
    console.error('Error migrating:', error);
  } finally {
    client.release();
  }
}

function runMigrations(name: string){
  if(name === "create"){
    migrate(createTablesSQL);
  }else if(name === "drop"){
    migrate(dropTablesSQL);
  }
}

console.log('✅ Postgres Connected');

export { pool, runMigrations, tableExists }