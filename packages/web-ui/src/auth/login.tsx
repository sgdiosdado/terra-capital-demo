import { useNavigate } from 'react-router-dom';
import classes from './login.module.css';

export function Login() {
  const navigate = useNavigate();

  return <div className={classes.background}>
    <main>
      <h1>Welcome!</h1>
      <button type='button' onClick={() => navigate('/')}>Login</button>
    </main>
  </div>
}