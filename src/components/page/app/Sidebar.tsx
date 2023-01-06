import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { MdMenuOpen, MdOutlineSwitchAccount, MdGridView } from 'react-icons/md';
import { RiBankFill } from 'react-icons/ri';
import { CgArrowsExchange } from 'react-icons/cg';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shared/Tooltip';
import Link from 'next/link';
import { useAppPageContext } from '@/context/AppPageContext';
import { RiUserSettingsFill } from 'react-icons/ri';

export default function Sidebar({ className }: { className?: string }) {
  return (
    <div className={clsx('h-full w-fit')}>
      <MobileSidebar className='block md:hidden' />
      <DesktopSidebar className='hidden md:block' />
    </div>
  );
}

function MobileSidebar({ className }: { className: string }) {
  const { openSidebar } = useAppPageContext();
  const { mode } = useTheme();
  return (
    <nav
      className={clsx(
        'h-full w-fit sm:w-1/2 md:w-1/4',
        'top-15 absolute',
        'transition-all duration-200 ease-in',
        openSidebar && '-translate-x-[105%]',
        mode === 'light' ? 'bg-gray-500' : 'bg-gray-600',
        className
      )}
    >
      <ul className='my-3 w-full'>
        {list.map((item, i) => (
          <li
            key={item.title}
            className={clsx(
              'w-full py-3 px-4',
              'flex items-center gap-2',
              'text-xl sm:text-xl md:text-3xl'
            )}
          >
            <Link href={item.link}>
              <>
                <span>{item.icon}</span>
                <strong>{item.title}</strong>
              </>
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
        'z-40',
        'top-15 absolute',
        'h-full w-fit',
        'px-4 py-3',
        'border-r',
        'transition-all duration-200 ease-in',
        mode === 'light' ? 'border-gray-500/50' : 'border-gray-300/20',
        openSidebar && mode === 'light' && 'bg-gray-400',
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
        'transition-all duration-300',
        'overflow-hidden',
        open ? 'w-40' : 'w-10' /* control width of item wrapper */
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
  return (
    <Link href={item.link}>
      <div
        className={clsx(
          'flex items-center gap-2',
          'hover:cursor-pointer hover:bg-gray-500/70',
          'rounded'
        )}
      >
        <span>{item.icon}</span>
        <p
          className={clsx(
            'text-left',
            open ? 'w-36' : 'w-0', /* control width of item */
            'transition-all duration-300'
          )}
        >
          {item.title}
        </p>
      </div>
    </Link>
  );
}

export const MobileMenuButton = () => {
  const { hanldeSidebar } = useAppPageContext();
  return (
    <button onClick={hanldeSidebar} className=''>
      <MdMenuOpen className='text-4xl' />
    </button>
  );
};

const list = [
  {
    icon: <MdGridView className='text-4xl' />,
    title: 'Overview',
    link: '/app/overview',
  },
  {
    icon: <RiBankFill className='text-4xl' />,
    title: 'Banks',
    link: '/app/banks',
  },
  {
    icon: <MdOutlineSwitchAccount className='text-4xl' />,
    title: 'Accounts',
    link: '/app/accounts',
  },
  {
    icon: <CgArrowsExchange className='text-4xl' />,
    title: 'Transactions',
    link: '/app/transactions',
  },
  {
    icon: <RiUserSettingsFill className='text-4xl' />,
    title: 'Cabinet',
    link: '/cabinet',
  },
];
