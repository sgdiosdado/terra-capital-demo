import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import classes from './button.module.css';

export function Button({ children, ...props }: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return <button {...props} className={classes.button}>{ children }</button>
}