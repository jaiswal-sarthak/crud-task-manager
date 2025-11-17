import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import styles from 'frontend/components/flex/flex.styles';

interface FlexProps {
  alignItems?: keyof typeof styles.alignItems;
  direction?: keyof typeof styles.direction;
  flexWrap?: keyof typeof styles.flexWrap;
  gap?: keyof typeof styles.gap;
  justifyContent?: keyof typeof styles.justifyContent;
  className?: string;
}

const Flex: React.FC<PropsWithChildren<FlexProps>> = ({
  alignItems = 'start',
  children,
  direction = 'row',
  flexWrap = 'nowrap',
  gap = 0,
  justifyContent = 'start',
  className,
}) => (
  <div
    className={clsx([
      styles.flex,
      styles.direction[direction],
      styles.justifyContent[justifyContent],
      styles.alignItems[alignItems],
      styles.flexWrap[flexWrap],
      styles.gap[gap],
      className,
    ])}
  >
    {children}
  </div>
);

export default Flex;
