module.export = function (app) {
	app.get ('/', (req, res) =>{
		res.json([]);
	});
}