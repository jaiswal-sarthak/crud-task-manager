import React, { PropsWithChildren } from 'react';

const H2: React.FC<PropsWithChildren> = ({ children }) => (
  <h2 className="self-start pl-0 text-xl font-bold text-black dark:text-white sm:pl-7 sm:text-title-xl2">
    {children}
  </h2>
);

export default H2;
