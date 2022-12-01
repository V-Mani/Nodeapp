const mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'covid.clzfasj1xh2q.us-east-1.rds.amazonaws.com',
	database : 'covid',
	user : 'admin',
	password : 'manibharathy'
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;