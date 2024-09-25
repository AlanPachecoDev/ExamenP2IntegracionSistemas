const fs = require('fs');
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Elfossinsangre511214!',
  database: 'BDDSistemaCompras'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');

  // Obtener todas las tablas de la base de datos
  connection.query('SHOW TABLES', (err, tables) => {
    if (err) {
      console.error('Error fetching tables:', err);
      connection.end();
      return;
    }

    // Crear un array de promesas para exportar cada tabla
    const tablePromises = tables.map(tableObj => {
      const tableName = Object.values(tableObj)[0];

      return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tableName}`, (err, rows) => {
          if (err) {
            return reject(err);
          }

          let sql = `-- Data for ${tableName}\n`;
          rows.forEach(row => {
            const values = Object.values(row).map(value => connection.escape(value));
            sql += `INSERT INTO ${tableName} VALUES (${values.join(', ')});\n`;
          });

          resolve(sql);
        });
      });
    });

    // Esperar a que todas las promesas se resuelvan y escribir el archivo
    Promise.all(tablePromises)
      .then(sqls => {
        const backupSql = sqls.join('\n\n');
        fs.writeFile('backup.sql', backupSql, (err) => {
          if (err) {
            console.error('Error writing to file:', err);
          } else {
            console.log('Backup completed successfully.');
          }
          connection.end();
        });
      })
      .catch(err => {
        console.error('Error generating backup:', err);
        connection.end();
      });
  });
});
