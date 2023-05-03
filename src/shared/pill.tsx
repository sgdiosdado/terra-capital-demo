import { ReactNode } from 'react';
import { clsx } from 'clsx';

import classes from './pill.module.css';

type PillProps = {
  children: ReactNode;
  variant?: 'danger' | 'warning' | 'info';
};

export function Pill({ children, variant = undefined }: PillProps) {
  return (
    <div
      className={clsx(
        classes.pill,
        variant ? classes[`pill--${variant}`] : null
      )}
    >
      {children}
    </div>
  );
}
