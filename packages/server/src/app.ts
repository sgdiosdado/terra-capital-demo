import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'


import { router } from './router'

const PORT = process.env.PORT || 8080

const app = express()
app.use(morgan('dev'))
app.use(cors())

app.use(router)

app.get('/', (_, res) => {
  res.send('Hello world!')
})

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`)
})
