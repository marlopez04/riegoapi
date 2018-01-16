const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'riego'
});

let zonaModel = {};

zonaModel.getZonas = (callback) => {
	if (connection){
		connection.query(
			'SELECT * FROM zonariego',
			(err, rows) => {
				if (err) {
					throw err;
				}else{
					callback(null, rows);
				}
			})
	}
};

zonaModel.insertZona = (zonaData, callback) =>{
	if(connection){
		connection.query(
			'INSERT INTO zonariego SET ?', zonaData,
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

zonaModel.updateZona = (zonaData, callback) => {
	if (connection) {
		connection.query('UPDATE zonas SET zonariego = ?, password = ?, email = ? WHERE id = ?',[zonaData.zonaname, zonaData.password, zonaData.email, zonaData.id], (err, result) => {
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

zonaModel.deleteZona = (id, callback) => {
	if (connection) {
		connection.query('SELECT * FROM zonariego WHERE id = ?',[zonaData.id], (err, row) => {
			if (row) {
				connection.query('DELETE FROM zonariego WHERE id = ?',[zonaData.id], (err, result) => {
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


module.exports = zonaModel;