import React, { PropsWithChildren } from 'react';

const AuthenticationPageLayout: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <div className="min-h-screen bg-gray-50 dark:bg-boxdark-2">
    <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
      {children}
    </div>
  </div>
);

export default AuthenticationPageLayout;
