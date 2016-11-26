var firstname = 'Dubi';
var lastname = 'Tuo';
var email = 'kelor@gmail.com';

var mysql      = require('mysql');
var dbconn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'keer_try1'
});

dbconn.connect(function(err){
  if(err){
    console.log('Database connection error');
  }else{
    console.log('Database connection successful');
  }
});


var record= { firstname: firstname, lastname: lastname, email: email };

dbconn.query('INSERT INTO try1 SET ?', record, function(err,res){
  if(err) throw err;

  console.log('Last record insert id:', res.insertId);
});

dbconn.query('SELECT * FROM try1 WHERE firstname = "Dubi"' ,function(err, records){
  if(err) throw err;

  console.log('Data received from Db:n');
  console.log(records);
});

dbconn.query('DELETE FROM try1 WHERE lastname = "Tuo"', function(err, result){
  if(err) throw err;

  console.log('Record Updated ' + result.affectedRows + ' rows');
});

dbconn.end(function(err) {
  // Function to close database connection
});
