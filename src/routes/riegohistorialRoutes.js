const Riegohistorial = require('../models/riegohistorial');

module.exports = function (app) {

	app.get('/riegohistorial', (req, res) => {
/*
		console.log("llego aca");
*/
		Riegohistorial.getRiegohistorials((err, data) => {
			res.status(200).json(data);
		});
	});

	app.post('/riegohistorial', (req, res) => {
		const riegohistorialData = {
			id: null,
			riegohistorialname: req.body.riegohistorialname,
			password: req.body.password,
			email:    req.body.email,
			created_at: null,
			updated_at: null
		};

		Riegohistorial.insertRiegohistorial(riegohistorialData, (err, data) => {
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

	app.put('/riegohistorial/:id', (req, res) =>{
		const riegohistorialData = {
			id: req.params.id,
			riegohistorialname: req.body.riegohistorialname,
			password: req.body.password,
			email:    req.body.email,
			created_at: null,
			updated_at: null
		};

		Riegohistorial.updateRiegohistorial(riegohistorialData, (err, data) => {
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

	app.delete('/riegohistorial/:id', (req, res) =>{
		Riegohistorial.deleteRiegohistorial(req.params.id, (err, data) =>{
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