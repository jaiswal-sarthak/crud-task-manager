import React, { useRef } from 'react';

import SidebarMenuItem from 'frontend/components/sidebar/sidebar-menu-item';
import routes from 'frontend/constants/routes';

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  return (
    <aside
      ref={sidebar}
      className={`fixed left-0 top-0 z-9999 flex h-screen w-64 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark sm:w-72.5 lg:static lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-end gap-2 px-6 py-5.5 lg:py-6.5">
        <button
          ref={trigger}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={isSidebarOpen}
          className="block lg:hidden"
        >
          <svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg" className="fill-current">
            <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {/* <!-- SIDEBAR MENU --> */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="p-2 sm:p-4 lg:px-6">
          <h3 className="mb-2 ml-2 mt-4 text-xs font-semibold text-bodydark2 sm:ml-4 sm:text-sm">
            MENU
          </h3>
          <ul className="mb-6 flex flex-col gap-1.5">
            <SidebarMenuItem
              iconPath="/assets/img/icon/dashboard-sidebar-icon.svg"
              path={routes.DASHBOARD}
              setIsSidebarOpen={setIsSidebarOpen}
              title="Dashboard"
            />
            <SidebarMenuItem
              iconPath="/assets/img/icon/tasks-sidebar-icon.svg"
              path={routes.TASKS}
              setIsSidebarOpen={setIsSidebarOpen}
              title="Tasks"
            />
            <SidebarMenuItem
              iconPath="/assets/img/icon/done-tasks-sidebar-icon.svg"
              path={routes.COMPLETED_TASKS}
              setIsSidebarOpen={setIsSidebarOpen}
              title="Completed Tasks"
            />
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
