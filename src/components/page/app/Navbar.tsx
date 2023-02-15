import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CgArrowsExchange } from 'react-icons/cg';
import { HiMenuAlt1 } from 'react-icons/hi';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { RiApps2Line, RiUserSettingsFill } from 'react-icons/ri';
import { TbBuildingBank } from 'react-icons/tb';

import UnstyledLink from '@/components/links/UnstyledLink';
import Logo from '@/components/shared/Logo';
import ThemeSwitch from '@/components/shared/ThemeSwitch';

import { useAppPageContext } from '@/context/AppPageContext';
import { useTheme } from '@/context/ThemeProvider';

export function Navbar() {
  const { mode } = useTheme();
  const [onTop, setOnTop] = useState(true);

  /* track page scroll */
  useEffect(() => {
    const handleScroll = () => {
      setOnTop(window.pageYOffset === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={clsx(
        'sticky top-0',
        'px-7 py-2',
        'flex items-center justify-between ',
        'z-40',
        !onTop &&
          'bg-opacity-80 bg-clip-padding backdrop-blur-2xl backdrop-filter '
      )}
    >
      <MobileMenuButton />

      <Logo width={60} height={55} className='scale-100 hover:scale-[1.03]' />

      <nav
        className={clsx(
          ' rounded px-3 py-1',
          'inline-flex gap-3 '
          // 'border',
          // mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-500/20',
          // mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
        )}
      >
        <NavLinks />
        <ThemeSwitch />
      </nav>
    </div>
  );
}

function NavLinks() {
  const { mode } = useTheme();
  const router = useRouter();
  const location = router.pathname;
  return (
    <ul
      className={clsx(
        'hidden lg:flex',
        'items-center gap-1  px-5',
        'border-r',
        mode === 'light' ? 'border-dark/50' : 'border-gray-300/50'
      )}
    >
      {/* <li className='mr-6'>
      <p className='pl-1 text-sm opacity-70'>Account</p>
      <strong className='text-xl '>John Doe</strong>
    </li> */}
      {navLinkslist.map((link) => (
        <li key={link.title}>
          <UnstyledLink href={link.path}>
            <div
              className={clsx(
                'w-[4.5rem] py-1',
                'flex flex-col items-center  justify-center  font-semibold',
                mode === 'light'
                  ? location === link.path
                    ? ' text-blue-600'
                    : 'text-gray-800'
                  : location === link.path
                  ? 'text-blue-500'
                  : 'text-gray-400',
                mode === 'light'
                  ? location !== link.path && 'hover:text-gray-700'
                  : location !== link.path && 'hover:text-gray-300',
                'cursor-pointer'
              )}
            >
              <span className='text-2xl'>{link.icon}</span>
              <span className='text-sm'>{link.title}</span>
            </div>
          </UnstyledLink>
        </li>
      ))}
    </ul>
  );
}

export const MobileMenuButton = () => {
  const { hanldeSidebar, openSidebar } = useAppPageContext();
  return (
    <button
      onClick={hanldeSidebar}
      className='inline-flex items-center py-2 lg:hidden'
    >
      <HiMenuAlt1 className='text-3xl' />
      <RiArrowDropRightLine
        className={clsx(
          'transition-all duration-300 ease-in-out',
          'text-3xl hover:-translate-x-3',
          openSidebar ? '-translate-x-3 rotate-180' : '-translate-x-4 rotate-0'
        )}
      />
    </button>
  );
};

export const navLinkslist = [
  {
    icon: <RiApps2Line />,
    title: 'Overview',
    path: '/app/overview',
  },
  {
    icon: <TbBuildingBank />,
    title: 'Banks',
    path: '/app/banks',
  },
  {
    icon: <MdOutlineSwitchAccount />,
    title: 'Accounts',
    path: '/app/accounts',
  },
  {
    icon: <CgArrowsExchange />,
    title: 'Activity',
    path: '/app/transactions',
  },
  {
    icon: <RiUserSettingsFill />,
    title: 'Cabinet',
    path: '/app/cabinet',
  },
];
