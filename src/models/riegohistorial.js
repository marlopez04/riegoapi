const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'riego'
});

let riegohistorialModel = {};

riegohistorialModel.getRiegohistorials = (callback) => {
	if (connection){
		connection.query(
			'SELECT * FROM riegohistorial',
			(err, rows) => {
				if (err) {
					throw err;
				}else{
					callback(null, rows);
				}
			})
	}
};

riegohistorialModel.insertRiegohistorial = (riegohistorialData, callback) =>{
	if(connection){
		connection.query(
			'INSERT INTO riegohistorial SET ?', riegohistorialData,
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

riegohistorialModel.updateRiegohistorial = (riegohistorialData, callback) => {
	if (connection) {
		connection.query('UPDATE riegohistorial SET riegohistorialname = ?, password = ?, email = ? WHERE id = ?',[riegohistorialData.riegohistorialname, riegohistorialData.password, riegohistorialData.email, riegohistorialData.id], (err, result) => {
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

riegohistorialModel.deleteRiegohistorial = (id, callback) => {
	if (connection) {
		connection.query('SELECT * FROM riegohistorial WHERE id = ?',[riegohistorialData.id], (err, row) => {
			if (row) {
				connection.query('DELETE FROM riegohistorials WHERE id = ?',[riegohistorialData.id], (err, result) => {
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


module.exports = riegohistorialModel;