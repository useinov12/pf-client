import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { MdMenuOpen, MdOutlineSwitchAccount, MdGridView } from 'react-icons/md';
import { RiBankFill } from 'react-icons/ri';
import { CgArrowsExchange } from 'react-icons/cg';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip';
import Link from 'next/link';
import { useAppPageContext } from '@/context/AppPageContext';
import { RiUserSettingsFill } from 'react-icons/ri';

export default function Sidebar({ className }: { className?: string }) {
  const { mode } = useTheme();
  const { openSidebar, hanldeSidebar } = useAppPageContext();

  return (
    <nav
      className={clsx(
        'rounded border-r border-t md:border',
        mode === 'light' ? 'border-dark/50' : 'border-gray-300/50',
        className
      )}
    >
      <ul className='px-4 py-3'>
        <MenuButton handleOpen={hanldeSidebar} />
        {list.map((item, i) => (
          <li key={item.title}>
            <MenuItem item={item} open={openSidebar} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

const MenuButton = ({ handleOpen }: { handleOpen: () => void }) => {
  return (
    <Tooltip placement='right-start'>
      <TooltipTrigger
        onClick={handleOpen}
        className='flex items-center justify-center rounded p-0 hover:bg-gray-500/70 '
      >
        <MdMenuOpen className='text-4xl' />
      </TooltipTrigger>
      <TooltipContent className='rounded bg-gray-600 p-1 text-sm text-white '>
        <p>Menu</p>
      </TooltipContent>
    </Tooltip>
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
        'transition-all duration-100',
        'overflow-hidden',
        open ? 'w-40' : 'w-10',
        'my-2'
      )}
    >
      <ItemWithTooltip item={item} open={open} />
    </div>
  );
}

const ItemWithTooltip = ({ item, open }: MenuItemProps) => {
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
};

const Item = ({ item, open }: MenuItemProps) => {
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
            open ? 'w-36' : 'w-0',
            'transition-all duration-100'
          )}
        >
          {item.title}
        </p>
      </div>
    </Link>
  );
};

export const MobileSidebar = () => {
  const { openSidebar } = useAppPageContext();
  const { mode } = useTheme();
  return (
    <nav
      className={clsx(
        'w-5/6',
        'absolute top-20',
        'block md:hidden',
        'transition-all duration-200',
        openSidebar ? '' : '-translate-x-[105%]',
        'h-screen rounded-tr border-r border-t md:border',
        mode === 'light' ? 'border-dark/50' : 'border-gray-300/50',
        'scroll-y-none backdrop-blur-4xl bg-opacity-20 bg-clip-padding backdrop-filter'
      )}
    >
      <ul className='w-full px-4 py-3'>
        {list.map((item, i) => (
          <Link href={item.link}>
            <li
              key={item.title}
              className='my-5 flex items-center gap-2 text-6xl'
            >
              <span>{item.icon}</span>
              <h1>{item.title}</h1>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export const MobileMenuButton = () => {
  const { hanldeSidebar } = useAppPageContext();
  return (
    <button onClick={hanldeSidebar} className=''>
      <MdMenuOpen className='text-5xl' />
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
