import classes from './login.module.css'
import { useAuth } from './auth-context'

export function Login() {
  const { login } = useAuth()

  return (
    <div className={classes.background}>
      <main>
        <h1>Welcome!</h1>
        <button type="button" onClick={login}>
          Login
        </button>
      </main>
    </div>
  )
}
