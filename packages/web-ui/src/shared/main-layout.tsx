import classes from './main-layout.module.css';
import { Sidebar } from './sidebar';
import { ReactNode } from 'react';

export function MainLayout({ children }: { children : ReactNode}) {
  return <div className={classes.background}>
   
    <Sidebar/>

    <main className={classes.main}>
      { children }
    </main>
  </div>
}