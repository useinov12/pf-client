import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { MdOutlineSwitchAccount, MdGridView } from 'react-icons/md';
import { RiBankFill } from 'react-icons/ri';
import { CgArrowsExchange } from 'react-icons/cg';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shared/Tooltip';
import Link from 'next/link';
import { useAppPageContext } from '@/context/AppPageContext';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { HiMenuAlt1 } from 'react-icons/hi';
import { useRouter } from 'next/router';

export default function Sidebar({ className }: { className?: string }) {
  return (
    <>
      <MobileSidebar className='block md:hidden' />
      <DesktopSidebar className='hidden md:block' />
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
        'transition-all duration-200 ease-in',
        openSidebar && '-translate-x-[105%]',
        mode === 'light' ? 'bg-gray-200' : 'bg-gray-900',
        className
      )}
    >
      <ul className='my-3 w-full'>
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
                  <span>{item.icon}</span>
                  <strong>{item.title}</strong>
                </>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const DesktopSidebar = ({ className }: { className: string }) => {
  const { mode } = useTheme();
  const { openSidebar } = useAppPageContext();
  return (
    <ul
      className={clsx(
        // 'flex-none',
        'h-full w-fit',
        'py-3',
        'border-r',
        mode === 'light' ? 'border-gray-500/50' : 'border-gray-300/20',
        openSidebar && mode === 'light' && 'bg-gray-200',
        openSidebar && mode === 'dark' && 'bg-gray-900',
        className
      )}
    >
      {list.map((item, i) => (
        <li key={item.title}>
          <MenuItem item={item} open={openSidebar} />
        </li>
      ))}
    </ul>
  );
};

interface MenuItemProps {
  item: { icon: JSX.Element; title: string; link: string };
  open: boolean;
}
function MenuItem({ item, open }: MenuItemProps) {
  return (
    <div
      className={clsx(
        'overflow-hidden',
        open ? 'w-40' : 'w-14' /* control width of item wrapper */
      )}
    >
      <ItemWithTooltip item={item} open={open} />
    </div>
  );
}

function ItemWithTooltip({ item, open }: MenuItemProps) {
  return (
    <Tooltip placement='right-start' open={open ? false : undefined}>
      <TooltipTrigger>
        <Item item={item} open={open} />
      </TooltipTrigger>
      <TooltipContent className='rounded bg-gray-600 p-1 text-sm text-white '>
        <p>{item.title}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function Item({ item, open }: MenuItemProps) {
  const router = useRouter();

  const location = router.asPath.slice(5);

  return (
    <Link href={item.link}>
      <div
        className={clsx(
          'transition-all duration-300',
          'flex items-center gap-2 py-1 px-4',
          'hover:cursor-pointer hover:bg-gray-400/20',
          location === item.title.toLowerCase() && 'bg-gray-400/20'
        )}
      >
        <span className='text-2xl'>{item.icon}</span>
        <p
          className={clsx(
            'text-left text-sm',
            open && '',
            open ? 'visible w-40' : 'invisible w-0' /* control width of item */,
            location === item.title.toLowerCase() && 'font-semibold'
          )}
        >
          {item.title}
        </p>
      </div>
    </Link>
  );
}

export const MobileMenuButton = () => {
  const { hanldeSidebar, openSidebar } = useAppPageContext();
  return (
    <button onClick={hanldeSidebar} className='inline-flex items-center py-2'>
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
    icon: <MdGridView />,
    title: 'Overview',
    link: '/app/overview',
  },
  {
    icon: <RiBankFill />,
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
  // {
  //   icon: <RiUserSettingsFill />,
  //   title: 'Cabinet',
  //   link: '/cabinet',
  // },
];
