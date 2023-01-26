import { ReactNode } from 'react';
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import Sidebar, { MobileMenuButton } from './Sidebar';
import ThemeSwitch from '@/components/shared/ThemeSwitch';
import Logo from '@/components/shared/Logo';
import LayoutCommon from '@/components/shared/LayoutCommon';
import Link from 'next/link';
import Button from '@/components/buttons/Button';
import { RiUserSettingsFill } from 'react-icons/ri';

import { RiArrowDropRightLine } from 'react-icons/ri';
import { HiMenuAlt1 } from 'react-icons/hi';
import { RiApps2Line } from 'react-icons/ri';
import { TbBuildingBank } from 'react-icons/tb';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { CgArrowsExchange } from 'react-icons/cg';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutCommon className='h-screen w-screen' withWrapper>
      <ContentWrapper>
        <Navbar />
        <main className='flex h-[90vh] w-full'>
          <Sidebar />
          {children}
        </main>
      </ContentWrapper>
    </LayoutCommon>
  );
}
function ContentWrapper({ children }: { children: ReactNode }) {
  const { mode } = useTheme();

  return (
    <section
      className={clsx(
        'overflow-x-hidden overflow-y-scroll',
        'h-full w-full',
        '2xl:border-l 2xl:border-r',
        mode === 'light' ? 'border-gray-400/50' : 'border-gray-300/20',
        mode === 'light' ? 'bg-gray-300' : 'bg-gray-900'
      )}
    >
      {children}
    </section>
  );
}

function Navbar() {
  const { mode } = useTheme();

  const router = useRouter();
  const location = router.asPath;
  return (
    <div
      className={clsx(
        'px-5 pt-3',
        'flex items-center justify-between ',
        // 'border-b',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
      )}
    >
      <div className='inline-flex items-center gap-20'>
        <MobileMenuButton />
        <div className='flex items-center justify-center'>
          <Logo
            width={55}
            height={50}
            className='scale-100 hover:scale-[1.03]'
          />
        </div>
        <nav className='hidden md:flex'>
          <ul className='flex items-center gap-1'>
            {list.map((link) => (
              <li key={link.title}>
                <Link href={link.path}>
                  <div
                    className={clsx(
                      'flex flex-col items-center  justify-center px-2 font-semibold',
                      mode === 'light'
                        ? location === link.path
                          ? ' text-gray-900'
                          : 'text-gray-800'
                        : location === link.path
                        ? 'text-white'
                        : 'text-gray-500',
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
        </nav>
      </div>
      <div className='inline-flex items-center gap-3'>
        {/* <CabinetLink /> */}
        <ThemeSwitch />
      </div>
    </div>
  );
}

const list = [
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
    title: 'Transactions',
    path: '/app/transactions',
  },
  {
    icon: <RiUserSettingsFill />,
    title: 'Cabinet',
    path: '/cabinet',
  },
];
