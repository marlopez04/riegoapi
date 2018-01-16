const Programa = require('../models/programa');

module.exports = function (app) {

	app.get('/programas', (req, res) => {
/*
		console.log("llego aca");
*/
		Programa.getProgramas((err, data) => {
			res.status(200).json(data);
		});
	});

	app.post('/programas', (req, res) => {
		const programaData = {
			id: null,
			programaname: req.body.programaname,
			password: req.body.password,
			email:    req.body.email,
			created_at: null,
			updated_at: null
		};

		Programa.insertPrograma(programaData, (err, data) => {
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

	app.put('/programas/:id', (req, res) =>{
		const programaData = {
			id: req.params.id,
			programaname: req.body.programaname,
			password: req.body.password,
			email:    req.body.email,
			created_at: null,
			updated_at: null
		};

		Programa.updatePrograma(programaData, (err, data) => {
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

	app.delete('/programa/:id', (req, res) =>{
		Programa.deletePrograma(req.params.id, (err, data) =>{
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