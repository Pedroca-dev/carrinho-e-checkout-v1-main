// import-db.js
// Roda uma única vez para importar config/script.sql no banco (ex: Clever Cloud)
// Uso:  node import-db.js

require("dotenv").config();
const fs = require("fs");
const mysql = require("mysql2/promise");

async function main() {
  const sql = fs.readFileSync("./config/script.sql", "utf8");

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    multipleStatements: true, // permite rodar o arquivo inteiro de uma vez
  });

  console.log("Conectado! Importando script.sql...");

  try {
    await connection.query(sql);
    console.log("✅ Script importado com sucesso! Tabelas e dados criados.");
  } catch (err) {
    console.error("❌ Erro ao importar o script:", err.message);
  } finally {
    await connection.end();
  }
}

main();
