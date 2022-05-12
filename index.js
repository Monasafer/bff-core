const express = require('express');
const cors = require('cors')
const authJwt = require('./JsonWT/jwt');
//Settings
const app = express();

//Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(authJwt());

app.use(express.static('../public')) //esto es para las imagenes
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3001',
    allawedHeaders: ['Content-Type']
})); //este era del live session , cambiarlo por el de localhost:3001 de React 

//CRUD Routes
app.use(require('./src/routes/expendRoutes'));
app.use(require('./src/routes/saveRoutes'));
app.use(require('./src/routes/monaRoutes'));
app.use(require('./src/routes/userRoutes'));
app.use(require('./src/routes/monthRoutes'));
app.use(require('./src/routes/reserveExpend'));

//BFF Routes // Bussiness Logic
app.use(require('./src/routes/bffExpend'));
app.use(require('./src/routes/bffMonth'));
app.use(require('./src/routes/bffReserve'));

//Error handing
app.use((req, res, next) => {
    const error = new Error('Endpoint not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            code: 500
        }
    });
});


//Starting
app.listen(process.env.PORT || 3000, () => { console.log('MonaAPI Starting...') });