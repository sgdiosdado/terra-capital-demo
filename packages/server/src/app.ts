import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'

import { router } from './router'
import { sessionConfig } from './auth/router'
import passport from 'passport'

const PORT = process.env.PORT || 8080

export const app = express()
app.use(morgan('dev'))
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))
app.use(express.json())

app.use(sessionConfig)
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT}!`)
})
