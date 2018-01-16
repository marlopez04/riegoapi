const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'riego'
});

let bombaModel = {};

bombaModel.getBombas = (callback) => {
	if (connection){
		connection.query(
			'SELECT * FROM bombas',
			(err, rows) => {
				if (err) {
					throw err;
				}else{
					callback(null, rows);
				}
			})
	}
};

bombaModel.insertBomba = (bombaData, callback) =>{
	if(connection){
		connection.query(
			'INSERT INTO bombas SET ?', bombaData,
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

bombaModel.updateBomba = (bombaData, callback) => {
	if (connection) {
		connection.query('UPDATE bombas SET bombaname = ?, password = ?, email = ? WHERE id = ?',[bombaData.bombaname, bombaData.password, bombaData.email, bombaData.id], (err, result) => {
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

bombaModel.deleteBomba = (id, callback) => {
	if (connection) {
		connection.query('SELECT * FROM bombas WHERE id = ?',[bombaData.id], (err, row) => {
			if (row) {
				connection.query('DELETE FROM bombas WHERE id = ?',[bombaData.id], (err, result) => {
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


module.exports = bombaModel;