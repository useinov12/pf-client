import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CgArrowsExchange } from 'react-icons/cg';
import { HiMenuAlt1 } from 'react-icons/hi';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { RiApps2Line, RiUserSettingsFill } from 'react-icons/ri';
import { TbBuildingBank } from 'react-icons/tb';

import Logo from '@/components/shared/Logo';
import ThemeSwitch from '@/components/shared/ThemeSwitch';

import { useAppPageContext } from '@/context/AppPageContext';
import { useTheme } from '@/context/ThemeProvider';

export function Navbar() {
  const { mode } = useTheme();
  return (
    <div className={clsx('px-7 py-3', 'flex items-center justify-between ')}>
      <MobileMenuButton />

      <Logo width={60} height={55} className='scale-100 hover:scale-[1.03]' />

      <nav
        className={clsx(
          'rounded px-3 py-1',
          'inline-flex gap-3 border',
          mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-500/20',
          mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
        )}
      >
        <Navigation />
        <ThemeSwitch />
      </nav>
    </div>
  );
}

function Navigation() {
  const { mode } = useTheme();
  const router = useRouter();
  const location = router.asPath;
  return (
    <ul
      className={clsx(
        'hidden md:flex',
        'items-center gap-1  px-5',
        'border-r',
        mode === 'light' ? 'border-dark/50' : 'border-gray-300/50'
      )}
    >
      {/* <li className='mr-6'>
      <p className='pl-1 text-sm opacity-70'>Account</p>
      <strong className='text-xl '>John Doe</strong>
    </li> */}
      {list.map((link) => (
        <li key={link.title}>
          <Link href={link.path}>
            <div
              className={clsx(
                'w-[4.5rem] py-1',
                'flex flex-col items-center  justify-center  font-semibold',
                mode === 'light'
                  ? location === link.path && 'text-blue-600 '
                  : location === link.path && 'text-blue-500',
                mode === 'light'
                  ? location === link.path
                    ? ' text-gray-900'
                    : 'text-gray-800'
                  : location === link.path
                  ? 'text-white'
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
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function MobileSidebar() {
  const { openSidebar } = useAppPageContext();
  const { mode } = useTheme();
  const router = useRouter();
  const location = router.asPath.slice(5);

  return (
    <nav
      className={clsx(
        'block md:hidden',
        'h-[90vh] w-full',
        'top-15 absolute z-50',
        'ease transition-all duration-300',
        openSidebar && '-translate-x-[105%]',
        mode === 'light' ? 'bg-gray-200' : 'bg-gray-900'
      )}
    >
      <ul className='my-3 mt-20 flex h-full w-full flex-col justify-start gap-3'>
        {list.map((item, i) => (
          <li
            key={item.title}
            className={clsx(
              'w-full cursor-pointer py-3 px-4',
              'text-xl sm:text-2xl',
              location === item.title.toLowerCase() && 'font-semibold'
            )}
          >
            <Link href={item.path}>
              <div className='flex h-full w-full items-center gap-2'>
                <>
                  <span className='text-3xl'>{item.icon}</span>
                  <h1>{item.title}</h1>
                </>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const MobileMenuButton = () => {
  const { hanldeSidebar, openSidebar } = useAppPageContext();
  return (
    <button
      onClick={hanldeSidebar}
      className='inline-flex items-center py-2 md:hidden'
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

const list = [
  {
    icon: <RiApps2Line />,
    title: 'General',
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
    path: '/cabinet',
  },
];
