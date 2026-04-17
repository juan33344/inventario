const mysql = require('mysql2');

const poolConfig = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: 'Z'
};

const pool = mysql.createPool({
  ...poolConfig,
  database: 'inventario'
});

function initDatabase() {
  return new Promise((resolve, reject) => {
    const initConnection = mysql.createConnection(poolConfig);

    initConnection.query(
      'CREATE DATABASE IF NOT EXISTS `inventario` CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci',
      (err) => {
        if (err) {
          initConnection.end();
          return reject(err);
        }

        initConnection.end((endErr) => {
          if (endErr) {
            return reject(endErr);
          }

          pool.query(
            `CREATE TABLE IF NOT EXISTS productos (
              id INT AUTO_INCREMENT PRIMARY KEY,
              nombre VARCHAR(100) NOT NULL,
              descripcion TEXT,
              precio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
              cantidad INT NOT NULL DEFAULT 0,
              creado_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              actualizado_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
            (tableErr) => {
              if (tableErr) {
                return reject(tableErr);
              }
              resolve();
            }
          );
        });
      }
    );
  });
}

module.exports = { pool, initDatabase };
