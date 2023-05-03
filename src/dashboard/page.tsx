import classes from './dashboard.module.css';
import { Link } from 'react-router-dom';
import { Item } from './item';

const items = [
  { id: 1, label: 'Por aprobar', icon: '🗄️', path: 'pending' },
  { id: 2, label: 'Contratos', icon: '📁', path: 'pending' },
  { id: 3, label: 'Desarrollos', icon: '🏗️', path: 'pending' },
  { id: 4, label: 'Gastos', icon: '💰', path: 'pending' },
];

export function Dashboard() {
  return (
    <div className={classes['item-grid']}>
      {items.map(item => (
        <Link key={item.id} to={item.path}>
          <Item icon={item.icon}>{item.label}</Item>
        </Link>
      ))}
    </div>
  );
}
