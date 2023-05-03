import { Outlet } from 'react-router-dom';
import classes from './main-layout.module.css';
import { Sidebar } from './sidebar';

export function MainLayout() {
  return <div className={classes.background}>
   
    <Sidebar/>

    <main className={classes.main}>
      <Outlet />
    </main>
  </div>
}