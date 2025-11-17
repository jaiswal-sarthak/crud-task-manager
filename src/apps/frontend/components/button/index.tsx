import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import Spinner from 'frontend/components/spinner/spinner';
import { ButtonKind, ButtonType } from 'frontend/types/button';

interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonType;
  kind?: ButtonKind;
  className?: string;
}

const ButtonClasses: Record<ButtonKind, string> = {
  [ButtonKind.PRIMARY]:
    'flex w-full items-center justify-center rounded-lg border bg-primary px-4 py-3 text-sm font-medium text-white transition active:bg-primary/80 sm:py-4 sm:text-base',
  [ButtonKind.SECONDARY]: 'inset-y-0 flex items-center',
  [ButtonKind.TERTIARY]:
    'bg-transparent text-center text-base text-primary active:bg-transparent sm:text-lg',
};

const DisabledClasses: Record<ButtonKind, string> = {
  [ButtonKind.PRIMARY]: 'cursor-not-allowed bg-primary/80',
  [ButtonKind.SECONDARY]: 'cursor-not-allowed',
  [ButtonKind.TERTIARY]: 'cursor-not-allowed text-slate-500',
};

const EnabledClasses: Record<ButtonKind, string> = {
  [ButtonKind.PRIMARY]: 'cursor-pointer hover:bg-primary/90',
  [ButtonKind.SECONDARY]: '',
  [ButtonKind.TERTIARY]: 'cursor-pointer',
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  isLoading,
  onClick,
  type = ButtonType.BUTTON,
  kind = ButtonKind.PRIMARY,
  className,
}) => (
  <button
    className={clsx(
      ButtonClasses[kind],
      disabled || isLoading ? DisabledClasses[kind] : EnabledClasses[kind],
      className,
    )}
    disabled={disabled || isLoading}
    type={type}
    onClick={onClick}
  >
    {isLoading ? <Spinner /> : children}
  </button>
);

export default Button;
