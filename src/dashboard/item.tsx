import { ReactNode } from "react";
import classes from './item.module.css';

type ItemProps = {
  children: ReactNode;
  icon: ReactNode;
};

export function Item({ children, icon }: ItemProps) {
  return (
    <div className={classes.item}>
      <div className={classes.item__icon}>{icon}</div>
      {children}
    </div>
  );
}