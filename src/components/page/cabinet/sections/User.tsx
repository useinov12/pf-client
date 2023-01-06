import clsx from 'clsx';
import { MenuSection, MenuHeader } from '../Menu';
import { useTheme } from '@/context/ThemeProvider';
import { useAuth } from '@/services/auth/queries';
import { FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { Menu } from '@headlessui/react';
import { useQueryClient, QueryCache } from 'react-query';
import { Storage } from '@/lib/storage';
import { useRouter } from 'next/router';

export default function UserMenu() {
  const { mode } = useTheme();
  return (
    <MenuSection
      className={clsx('h-min min-w-fit lg:h-full lg:w-max', 'relative h-full')}
    >
      <section className='flex flex-col items-center justify-start md:items-start'>
        <MenuHeader
          className={clsx(
            'border-t sm:border-none' /* mobile style */,
            mode === 'light' ? 'border-gray-100/50' : 'border-gray-300/20'
          )}
        >
          <h4>Account</h4>
          <DropMenu />
        </MenuHeader>
        <div className='relative flex  w-full px-4'>
          <UserProfile />
        </div>
      </section>
    </MenuSection>
  );
}

function UserProfile() {
  const { data: user } = useAuth();

  if (!user) return null;
  return (
    <div className='flex gap-2 py-3'>
      <FaUserCircle className='text-6xl' />
      <div className='flex items-center gap-2'>
        <div className='flex flex-col'>
          <h4>{`${user.firstName} ${user?.lastName}`}</h4>
          <p className='text-sm text-gray-500'>{user.username}</p>
        </div>
      </div>
    </div>
  );
}

const LogoutButton = ({ className }: { className?: string }) => {
  const queryClient = useQueryClient();

  function logout() {
    Storage.clear('accessToken');
    Storage.clear('refreshToken');
    queryClient.removeQueries({ queryKey: ['user'] });
    router.push('/');
  }

  const router = useRouter();

  return (
    <button
      className={clsx(
        'text-md w-full',
        'inline-flex items-center justify-between gap-2 px-3',
        className
      )}
      onClick={logout}
    >
      <span className='tracking-tight'>Logout</span>
      <FiLogOut className='text-2xl text-red-500 ' />
    </button>
  );
};

function DropMenu() {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button
          className={clsx(
            'p-1',
            'inline-flex w-full justify-center rounded-md',
            'text-sm font-medium hover:bg-gray-50/50',
            'focus:bg-white/50',
            'focus-visible:ring-white focus-visible:ring-opacity-75'
          )}
        >
          <HiDotsVertical className='h-7 w-7 ' aria-hidden='true' />
        </Menu.Button>
      </div>

      <Menu.Items
        className={clsx(
          'absolute right-0 mt-4 w-56',
          'rounded-md bg-white shadow-lg',
          'ring-1 ring-black ring-opacity-5',
          'origin-top-right divide-y divide-gray-100',
          'overflow-hidden focus:outline-none',
          'drop-shadow-lg'
        )}
      >
        <Menu.Item>
          <LogoutButton className='w-full py-1 text-dark hover:bg-gray-200' />
        </Menu.Item>
        <Menu.Item>
          <button className='w-full py-1 px-3 text-left text-dark hover:bg-gray-200'>
            <span className='tracking-tight'>User settings</span>
          </button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
