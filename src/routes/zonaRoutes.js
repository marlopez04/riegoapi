const Zona = require('../models/zona');

module.exports = function (app) {

	app.get('/zonas', (req, res) => {
/*
		console.log("llego aca");
*/
		Zona.getZonas((err, data) => {
			res.status(200).json(data);
		});
	});

	app.post('/zonas', (req, res) => {
		const zonaData = {
			id: null,
			zonaname: req.body.zonaname,
			password: req.body.password,
			email:    req.body.email,
			created_at: null,
			updated_at: null
		};

		Zona.insertZona(zonaData, (err, data) => {
			if (data && data.insertId) {
				res.json({
					success: true,
					msg: 'Usuario Insertado',
					data: data
				})
			} else {
				res.status(500).json({
					success: false,
					msg: "error"
				})
			}

		})
	});

	app.put('/zonas/:id', (req, res) =>{
		const zonaData = {
			id: req.params.id,
			zonaname: req.body.zonaname,
			password: req.body.password,
			email:    req.body.email,
			created_at: null,
			updated_at: null
		};

		Zona.updateZona(zonaData, (err, data) => {
			if (data && data.msg) {
				res.json(data)
			}else{
				res.json({
					success: false,
					msg: 'error'
				})

			};
		})

	});

	app.delete('/zona/:id', (req, res) =>{
		Zona.deleteZona(req.params.id, (err, data) =>{
			if (data && data.msg === 'deleted' || data.msg === 'not exists') {
				res.json({
					success: true,
					data
				})
			}else {
				res.status(500).json({
					msg: 'Error'
				})

			}

		})

	});

}