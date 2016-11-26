
function data (phone, symptom)
{
  var mysql      = require('mysql');
  var dbconn = mysql.createConnection({ //database user info
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'keer_try1'
  });

  dbconn.connect(function(err){
    if(err){
      //console.log('Database connection error');
    }else{
      //console.log('Database connection successful');
    }
  });


  var record= { phone: phone, symptom: symptom };

  dbconn.query('INSERT INTO try2 SET ?', record, function(err,res){
    if(err) throw err;

    //console.log('Last record insert id:', res.insertId);
  });

  dbconn.query('SELECT * FROM try2 WHERE symptom = "Headache"' ,function(err, records){
    if(err) throw err;

    console.log('Data:');
    console.log(records);
  });
  /*

  dbconn.query('DELETE FROM try2 WHERE lastname = "Tuo"', function(err, result){
    if(err) throw err;

    console.log('Record Updated ' + result.affectedRows + ' rows');
  });
  */

  dbconn.end(function(err) {
    // Function to close database connection
  });

};

data(323333, "Headache");
