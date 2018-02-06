const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

//setings
app.set('port', process.env.PORT || 3000);
app.disable('etag');


//agregado para corregir

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.100.95:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//agregado para corregir

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
require('./routes/valvulaRoutes')(app);
require('./routes/bombaRoutes')(app);
require('./routes/zonaRoutes')(app);
require('./routes/programaRoutes')(app);
require('./routes/riegohistorialRoutes')(app);

//static files

app.listen(app.get('port'), () => {
	console.log('server on port 3000');
});