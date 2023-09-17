import express from 'express'
import cors from 'cors'
const app = express()
import bodyParser from 'body-parser'
import Connectin from './database/db.js'
import Router from './routes/router.js'
const PORT = 8000 || process.env.PORT



app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

Connectin()


app.use('/api', Router)

app.listen(PORT, ()=> console.log('listening on port' + PORT))