const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'riego'
});

let programaModel = {};

programaModel.getProgramas = (callback) => {
	if (connection){
		connection.query(
			'SELECT * FROM programas',
			(err, rows) => {
				if (err) {
					throw err;
				}else{
					callback(null, rows);
				}
			})
	}
};

programaModel.insertPrograma = (programaData, callback) =>{
	if(connection){
		connection.query(
			'INSERT INTO programas SET ?', programaData,
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

programaModel.updatePrograma = (programaData, callback) => {
	if (connection) {
		connection.query('UPDATE programas SET programaname = ?, password = ?, email = ? WHERE id = ?',[programaData.programaname, programaData.password, programaData.email, programaData.id], (err, result) => {
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

programaModel.deletePrograma = (id, callback) => {
	if (connection) {
		connection.query('SELECT * FROM programas WHERE id = ?',[programaData.id], (err, row) => {
			if (row) {
				connection.query('DELETE FROM programas WHERE id = ?',[programaData.id], (err, result) => {
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


module.exports = programaModel;