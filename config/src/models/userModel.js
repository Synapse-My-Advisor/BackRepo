const db = require('../../config/db');

exports.getAllUsers = (callback) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};