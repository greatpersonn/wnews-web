import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface BaseProps {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
}

interface ButtonAsButtonProps
  extends BaseProps,
    PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  to?: never;
}

interface ButtonAsLinkProps
  extends BaseProps,
    PropsWithChildren,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    fullWidth = false,
    className = '',
    children,
    ...rest
  } = props;

  const classes = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}