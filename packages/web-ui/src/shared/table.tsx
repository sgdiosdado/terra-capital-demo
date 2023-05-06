import { ReactNode } from "react"
import classes from './table.module.css';

export function Root({ children }: { children: ReactNode}) {
  return <div className={classes.table__root}>{ children }</div>
}

export function Table({ children }: { children: ReactNode}) {
  return <table className={classes.table}>{ children }</table>
}

export function Caption({ children }: { children: ReactNode}) {
  return <caption className={classes.table__caption}>{ children }</caption>
}

export function Head({ children }: { children: ReactNode}) {
  return <thead className={classes.table__head}>{ children }</thead>
}

export function Body({ children }: { children: ReactNode}) {
  return <tbody className={classes.table__body}>{ children }</tbody>
}

export function Row({ children }: { children: ReactNode}) {
  return <tr className={classes.table__row}>{ children }</tr>
}

export function Heading({ children }: { children: ReactNode}) {
  return <th className={classes.table__heading}>{ children }</th>
}

export function Cell({ children, align='left' }: { children: ReactNode, align?: 'left' | 'center' | 'right'}) {
  return <td className={classes.table__cell} style={{ textAlign: align }}>{ children }</td>
}