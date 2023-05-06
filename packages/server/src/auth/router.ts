import { Router } from 'express'
import passport from 'passport'
import crypto from 'crypto'
import { Strategy as LocalStrategy } from 'passport-local'
import session from 'express-session'

export const sessionConfig = session({
  secret: 'super-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {},
  name: "sessionName",
})

const USERS = [
  {
    id: 1,
    username: 'sergio',
    salt: 'sergio',
    password: crypto.pbkdf2Sync('12345', 'sergio', 310000, 32, 'sha256'),
  },
]

const strategy = new LocalStrategy(function verify(username, password, cb) {
  const user = USERS.find(u => u.username === username)

  if (!user) return cb(null, false, { message: 'User not found.' })

  crypto.pbkdf2(
    password,
    user.salt,
    310000,
    32,
    'sha256',
    (err, hashedPassword) => {
      if (err) return cb(err)

      if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
        return cb(null, false, {
          message: 'Incorrect username or password.',
        })
      }

      return cb(null, user)
    }
  )
})

passport.use(strategy)

export const router = Router()

router.post('/login', (req, res) => {
  console.log(req.body)
  res.send('Inside auth router')
})
