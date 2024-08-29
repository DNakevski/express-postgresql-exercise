import { Pool } from "pg";

// This should match the config settings from the docker-compose.yml file
const pool = new Pool({
  user: "root",
  password: "root",
  host: "127.0.0.1",
  database: "parking",
  port: 5432,
});

export default pool;
