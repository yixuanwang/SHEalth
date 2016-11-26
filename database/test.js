var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'keer_try1'
});

connection.connect();




connection.query('SELECT * from members', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0], rows[1]);
});
connection.end();
