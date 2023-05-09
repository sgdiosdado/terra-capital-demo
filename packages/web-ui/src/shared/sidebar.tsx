import { ExitIcon, FileIcon, FileTextIcon, ImageIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import classes from './sidebar.module.css';
import { useAuth } from '../auth/auth-context';

export function Sidebar() {
  const { logout } = useAuth()
  
  return (
    <aside className={classes.aside}>
      <Link to="/">
        <p
          style={{
            marginBottom: 0,
            padding: '2rem 0',
            fontWeight: 'bold',
            fontSize: '2rem',
            textAlign: 'center',
          }}
        >
          Terra Capital
        </p>
      </Link>
      <ul className={classes.menu}>
        <li className={classes.menu__item}>
          <FileTextIcon />
          <span>Por aprobar</span>
        </li>
        <li className={classes.menu__item}>
          <FileIcon />
          <span>Contratos</span>
        </li>
        <li className={classes.menu__item}>
          <ImageIcon />
          <span>Desarrollos</span>
        </li>
        <li className={classes.menu__item} onClick={logout}>
          Logout <ExitIcon/>
        </li>
      </ul>
    </aside>
  );
}
