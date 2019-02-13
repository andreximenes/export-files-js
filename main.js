const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


// Import Routes
const indexRoute = require('./routes/index-route');

// Load enviroment variables in .env files
dotenv.config();

// mongoose instance connection url connection


// Server express config
const app = express();
app.set('secretKey', 'nodeRestApi');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes (these routes are just examples)
app.get('/', indexRoute);

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function (err, req, res, next) {
    if (err.status === 404)
        res.status(404).json({ url: req.originalUrl, message: " Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});

// Application Start
app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

module.exports = app;