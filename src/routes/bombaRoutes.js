const Bomba = require('../models/bomba');

module.exports = function (app) {

	app.get('/bombas', (req, res) => {
/*
		console.log("llego aca");
*/
		Bomba.getBombas((err, data) => {
			res.status(200).json(data);
		});
	});

	app.post('/bombas', (req, res) => {
		const bombaData = {
			id: null,
			bombaname: req.body.bombaname,
			password: req.body.password,
			email:    req.body.email,
			created_at: null,
			updated_at: null
		};

		Bomba.insertBomba(bombaData, (err, data) => {
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

	app.put('/bombas/:id', (req, res) =>{
		const bombaData = {
			id: req.params.id,
			bombaname: req.body.bombaname,
			password: req.body.password,
			email:    req.body.email,
			created_at: null,
			updated_at: null
		};

		Bomba.updateBomba(bombaData, (err, data) => {
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

	app.delete('/bomba/:id', (req, res) =>{
		Bomba.deleteBomba(req.params.id, (err, data) =>{
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