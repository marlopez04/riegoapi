const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'riego'
});

let valvulaModel = {};

valvulaModel.getValvulas = (callback) => {
	if (connection){
		connection.query(
			'SELECT * FROM valvulas',
			(err, rows) => {
				if (err) {
					throw err;
				}else{
					callback(null, rows);
				}
			})
	}
};

valvulaModel.insertValvula = (valvulaData, callback) =>{
	if(connection){
		connection.query(
			'INSERT INTO valvulas SET ?', valvulaData,
			(err, result) => {
				if (err) {
					throw err;
				}else{
					callback(null, {
						'insertId': result.insertId
					})
				}
			}
		)
		
	}
};

valvulaModel.updateValvula = (valvulaData, callback) => {
	if (connection) {
		connection.query('UPDATE valvulas SET valvulaname = ?, password = ?, email = ? WHERE id = ?',[valvulaData.valvulaname, valvulaData.password, valvulaData.email, valvulaData.id], (err, result) => {
			if (err) {
				throw err;
			}else{
				callback(null, {
					"msg": "succes"
				});
			}
		})
	}
};

valvulaModel.deleteValvula = (id, callback) => {
	if (connection) {
		connection.query('SELECT * FROM valvulas WHERE id = ?',[valvulaData.id], (err, row) => {
			if (row) {
				connection.query('DELETE FROM valvulas WHERE id = ?',[valvulaData.id], (err, result) => {
					if (err) {
						throw err;
					}else{
						callback(null, {
							msg: 'deleted'
						});
					}
				});
			}else{
				callback(null, {
					msg: 'not exists'
				});
			}
		});
	}
};


module.exports = valvulaModel;