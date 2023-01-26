import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppPageContext } from '@/context/AppPageContext';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { HiMenuAlt1 } from 'react-icons/hi';
import { RiApps2Line, RiUserSettingsFill } from 'react-icons/ri';
import { TbBuildingBank } from 'react-icons/tb';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { CgArrowsExchange } from 'react-icons/cg';

export default function Sidebar() {
  return (
    <>
      <MobileSidebar className='block md:hidden' />
      {/* <DesktopSidebar className='hidden md:block' /> */}
    </>
  );
}

function MobileSidebar({ className }: { className: string }) {
  const { openSidebar } = useAppPageContext();
  const { mode } = useTheme();
  const router = useRouter();
  const location = router.asPath.slice(5);

  return (
    <nav
      className={clsx(
        'h-[90vh] w-full',
        'top-15 absolute z-50',
        'ease transition-all duration-300',
        openSidebar && '-translate-x-[105%]',
        mode === 'light' ? 'bg-gray-200' : 'bg-gray-900',
        className
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
            <Link href={item.link}>
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
    title: 'Overview',
    link: '/app/overview',
  },
  {
    icon: <TbBuildingBank />,
    title: 'Banks',
    link: '/app/banks',
  },
  {
    icon: <MdOutlineSwitchAccount />,
    title: 'Accounts',
    link: '/app/accounts',
  },
  {
    icon: <CgArrowsExchange />,
    title: 'Transactions',
    link: '/app/transactions',
  },
  {
    icon: <RiUserSettingsFill />,
    title: 'Cabinet',
    link: '/cabinet',
  },
];
