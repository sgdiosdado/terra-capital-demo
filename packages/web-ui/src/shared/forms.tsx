import { ReactNode, HTMLProps, Ref, forwardRef } from "react"
import classes from './forms.module.css';

export function Field({ children }: { children: ReactNode }) {
  return <div className={classes.field}>{children}</div>
}

type LabelProps = HTMLProps<HTMLLabelElement>

export function Label({ children, ...props }: LabelProps) {
  return <label {...props}>{ children }</label>
}

type InputProps = HTMLProps<HTMLInputElement>

function _Input({ ...props }: InputProps, ref: Ref<HTMLInputElement>) {
  return <input ref={ref} {...props}/>
}

export const Input = forwardRef<HTMLInputElement, InputProps>(_Input);