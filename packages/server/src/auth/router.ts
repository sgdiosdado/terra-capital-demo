import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'
import crypto from 'crypto'
import { Strategy as LocalStrategy } from 'passport-local'
import session from 'express-session'

const USERS = [
  {
    id: 1,
    username: 'sergio@mail.com',
    salt: 'sergio',
    password: crypto.pbkdf2Sync('12345', 'sergio', 310000, 32, 'sha256'),
  },
]

export const sessionConfig = session({
  secret: 'super-secret',
  resave: false,
  saveUninitialized: false,
  name: 'my-cool-cookie',
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  },
})

const strategy = new LocalStrategy((username, password, onDone) => {
  const user = USERS.find(u => u.username === username)

  if (!user) return onDone(null, false, { message: 'User not found.' })

  crypto.pbkdf2(
    password,
    user.salt,
    310000,
    32,
    'sha256',
    (err, hashedPassword) => {
      if (err) return onDone(err)

      if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
        return onDone(null, false, {
          message: 'Incorrect username or password.',
        })
      }

      return onDone(null, { id: user.id, username: user.username })
    }
  )
})

passport.use(strategy)
passport.serializeUser((user, onDone) => {
  process.nextTick(() => onDone(null, { ...user }))
})
passport.deserializeUser((user: any, onDone) => {
  process.nextTick(() => onDone(null, user))
})

export const protect = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).json()
}

export const router = Router()

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ user: req.user })
})

router.delete('/logout', protect, (req, res) => {
  req.logout(() => {})
  res.json()
})

router.get('/who-am-i', protect, (req, res) => {
  res.json({ user: req.user })
})
