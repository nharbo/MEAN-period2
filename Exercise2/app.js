var express = require('express');
var path = require('path');
//Alt det her, er (third-party)middleware vi skal igennem for hvert request, inden der kan gives et response.
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var users = require('./routes/users'); //Her requires siderne, så de kan bruges i denne "klasse".
var routes = require('./routes/index');
var api = require('./routes/jokeApi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //build-in middleware

app.use(session({ //Her laves en session
    secret: 'secret_3162735',
    saveUninitialized: true,
    resave: true,
    duration: 30 * 60 * 1000, //Varighed af session
    activeDuration: 5 * 60 * 1000 //Varrighed af session efter sidste request (forlængelse)
}));

app.use('/', api); //Her bestemmes at alt der har med api at gøre, kan lade sig gøre uden at have en session

app.use('/', users);
//Det er vigtigt med rækkefølgen af dette, da det afgør hvad brugeren bliver "udsat" for

//SESSION med username! OG costum-middleware
app.use(function (req, res, next) {
    var session = req.session; //session-"attributten" tilføjes til request-objektet.
    console.log("in session middleware");

    if (session.userName) { //Hvis session.userName er true, har vi allerede en session, og så går vi videre i middlewarechain
        console.log("session already stored");
        console.log("usernamed stored in sesion: " + req.session.userName);
        next();
    } else if (req.body.username) { //Hvis der skrives et brugernavn ind, sættes dette lig med session.userName, og vi får nu en session.
        session.userName = req.body.username; //username kommer fra login.hbs hvor det bliver lagt ned i username-variablen, ved login.
        console.log("---new session created---");
        return res.redirect('/index');
    } else {
        console.log("no input for session");
        res.redirect('/'); //Hvis ikke der skrives noget, redirectes der til loginpage igen, og sendes videre (next) i middleware.
    }
});

app.use('/', routes); //Nu er der adgagn til resten af siderne, da session er sat, og serveren ved hvem du er.

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
