const express = require('express');
const cors = require ('cors')

//Settings
const app = express();

//Middleware
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(express.static('../public')) //esto es para las imagenes

app.use(cors({credentials: true, 
              origin: 'http://localhost:3001',
              allawedHeaders: ['Content-Type']
            })); //este era del live session , cambiarlo por el de localhost:3001 de React 

//Routes
app.use(require('./src/routes/expendRoutes'));
app.use(require('./src/routes/saveRoutes'));
app.use(require('./src/routes/monaRoutes'));
app.use(require('./src/routes/userRoutes'));
app.use(require('./src/routes/dashboard'));

//Starting
app.listen(process.env.PORT || 3000, ()=>{console.log('Mona Starting...')} );