const express = require('express');
const dashboard =require('./src/routes/dashboard')
const auth = require('./src/auth')
const cors = require ('cors')
const session = require('express-session');
const FileStore = require ('session-file-store')(session)
const fileUpload = require('express-fileupload')

//Settings
const app = express();
const userRoutes = require('./src/routes/userRoutes')
const saveRoutes = require('./src/routes/saveRoutes')
const expendRoutes = require('./src/routes/expendRoutes')
const monaRoutes = require('./src/routes/monaRoutes')
const sessionRoutes = require('./src/routes/session_routes')

//Middleware
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(fileUpload());
app.use(express.static('../public')) //esto es para las imagenes

app.use(cors({credentials: true, 
              origin: 'http://localhost:3001',
              allawedHeaders: ['Content-Type']
            })); //este era del live session , cambiarlo por el de localhost:3001 de React 

app.use( session({
    store: new FileStore,
    secret: '123456789',
    resave: false,
    saveUninitialized: true,
    name : 'mona'
}))

//Routes
app.use(require('./src/routes/expendRoutes'));
app.use(require('./src/routes/saveRoutes'));
app.use(require('./src/routes/monaRoutes'));
app.use(require('./src/routes/userRoutes'));
app.use(require('./src/routes/dashboard'));

//Starting
app.listen(process.env.PORT || 3000, ()=>{console.log('Mona Starting...')} );




/*
app.use('/auth', sessionRoutes)
app.use('/expend', expendRoutes) //poner el auth, entremedio de el '/expend' y el expendRoutes. - ahora lo saco para probar con REACT
app.use('/mona', monaRoutes) //acordarese de las autoizaciones en las rutas
//app.use('/user', userRoutes)
app.use('/save', saveRoutes)
app.use('/dashboard', dashboard)
*/