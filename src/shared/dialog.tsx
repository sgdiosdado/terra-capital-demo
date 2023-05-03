import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ReactElement, ReactNode } from 'react';
import classes from './dialog.module.css';

type DialogProps = {
  trigger: ReactElement;
  children: ReactNode;
} & DialogPrimitive.DialogProps;

export function Dialog({ children, trigger, ...props }: DialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={classes.dialog__overlay} />
        <DialogPrimitive.Content className={classes.dialog}>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
