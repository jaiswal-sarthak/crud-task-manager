import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import UserMenuDropdown from 'frontend/components/header/user-menu-dropdown.component';
import { Account, UserMenuDropdownItem } from 'frontend/types';

interface DropdownUserProps {
  account: Account;
  userMenuDropdownItems: UserMenuDropdownItem[];
}

const UserProfileSnippet: React.FC<DropdownUserProps> = ({
  account,
  userMenuDropdownItems,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<HTMLAnchorElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(targetNode) ||
        trigger.current.contains(targetNode)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!dropdownOpen || key !== 'Escape') return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right sm:block lg:block">
          <span className="block text-xs font-medium text-black dark:text-white sm:text-sm">
            {account.displayName()}
          </span>
          <span className="block text-xs">User</span>
        </span>

        <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 sm:size-12">
          <svg className="h-6 w-6 text-primary sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </span>

        <svg
          className="hidden fill-current opacity-50 sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill="currentColor"
          />
        </svg>
      </Link>

      <UserMenuDropdown
        dropdownOpen={dropdownOpen}
        dropdownRef={dropdown}
        setDropdownOpen={setDropdownOpen}
        userMenuDropdownItems={userMenuDropdownItems}
      />
    </div>
  );
};

export default UserProfileSnippet;
