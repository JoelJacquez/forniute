const { config } = require('../config');
var mysql = require('mysql');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

class MysqlLib {
  constructor() {
    this.connection = mysql.createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      port: config.dbPort
    });
    this.connection.connect();
  }

  async query3(sql) {
    this.connection.connect();

    const result = await this.connection.query(sql);
    this.connection.end();
    return result;
  }
  query2(sql) {
    this.connection.connect();

    this.connection.query(sql, function(error, results, fields) {
      if (error) throw error;
      return results;
      // console.log('The solution is: ', results);
    });

    this.connection.end();
  }
  query(sql, params) {
    return new Promise((resolve, reject) => {
      // this.connection.connect();

      this.connection.query(sql, params, function(err, results, fields) {
        if (err) reject(err);
        // console.log('The solution is: ', results);
        resolve(results);
      });
      // this.connection.end();
    });
  }
  queryManual(sql) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, function(err, results, fields) {
        if (err) reject(err);
        // console.log('The solution is: ', results);
        resolve(results);
      });
    });
  }

  open() {
    this.connection.connect();
  }
  close() {
    this.connection.end();
  }
}

module.exports = MysqlLib;
