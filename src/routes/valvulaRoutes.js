const Valvula = require('../models/valvula');

module.exports = function (app) {

	app.get('/valvulas', (req, res) => {
/*
		console.log("llego aca");
*/
		Valvula.getValvulas((err, data) => {
			res.status(200).json(data);
		});
	});

	app.post('/valvulas', (req, res) => {
		const valvulaData = {
			id: null,
			valvulaname: req.body.valvulaname,
			password: req.body.password,
			email:    req.body.email,
			created_at: null,
			updated_at: null
		};

		Valvula.insertValvula(valvulaData, (err, data) => {
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

	app.put('/valvulas/:id', (req, res) =>{
		const valvulaData = {
			id: req.params.id,
			valvulaname: req.body.valvulaname,
			password: req.body.password,
			email:    req.body.email,
			created_at: null,
			updated_at: null
		};

		Valvula.updateValvula(valvulaData, (err, data) => {
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

	app.delete('/valvula/:id', (req, res) =>{
		Valvula.deleteValvula(req.params.id, (err, data) =>{
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