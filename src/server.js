const express = require('express');
const monaRoutes = require('./routes/monaRoutes')
const sessionRoutes = require('./routes/session_routes')
const dashboard =require('./routes/dashboard')
const auth = require('./auth')
const cors = require ('cors')
const bodyParser = require ('body-parser');
const session = require('express-session');
const FileStore = require ('session-file-store')(session)
const fileUpload = require('express-fileupload')


const userRoutes = require('./routes/userRoutes')
const saveRoutes = require('./routes/saveRoutes')
const expendRoutes = require('./routes/expendRoutes')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
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
})
)
app.use('/auth', sessionRoutes)
app.use('/expend', expendRoutes) //poner el auth, entremedio de el '/expend' y el expendRoutes. - ahora lo saco para probar con REACT
app.use('/mona', monaRoutes) //acordarese de las autoizaciones en las rutas
//app.use('/user', userRoutes)
app.use('/save', saveRoutes)
app.use('/dashboard', dashboard)

app.listen(3000, ()=>{console.log('Mona Loading...')} );
