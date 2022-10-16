import React from 'react';
import { UserContext } from '@/context/UserProvider';
import clsx from 'clsx';
import { Menu } from '@headlessui/react';
import { IoLogOutOutline, IoSettingsSharp } from 'react-icons/io5';
import Accent from './Accent';
import Cookies from 'js-cookie';

const User: React.FC = () => {
  const { user, setUser } = React.useContext(UserContext);
  const username = user?.email.slice(0, user?.email.indexOf('@'));

  async function handleLogOut() {
    Cookies.remove('token')
    setUser(null)
  }

  return (
    <Menu as={'div'} className={clsx('relative', 'z-40', 'mx-1 mt-2 ')}>
      <Menu.Button
        className={clsx(
          'flex h-full',
          'rounded-md',
          'bg-white text-dark',
          'px-3',
          'items-center justify-center',
          'scale-100 hover:scale-[1.01] active:scale-[0.98] motion-safe:transform-gpu',
          'motion-reduce:hover:scale-100',
          'ring-2',
          'ring-primary-500',
          'hover:ring',
          'cursor-pointer',
          'duration-25 transition-all',
          'font-semibold',
          'group'
          //   'focus:ring-offset-2'
        )}
      >
        {username}
      </Menu.Button>
      <Menu.Items
        className={clsx(
          'absolute right-0',
          'origin-top-right',
          'mt-2 w-56 rounded-md',
          'divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5',
          'focus:outilne-none'
        )}
      >
        <div className='py-1'>
          <Menu.Item>
            <a
              href='/finance'
              className={clsx(
                'flex items-center px-4 py-2',
                'text-sm text-gray-700',
                'hover:bg-primary-500 hover:text-white'
              )}
            >
              <h4 className='mr-2 font-bold'>PF</h4>
              Open app
            </a>
          </Menu.Item>
        </div>

        <div className='py-1'>
          <Menu.Item>
            <a
              href='#'
              className={clsx(
                'flex items-center px-4 py-2',
                'text-sm text-gray-700',
                'hover:bg-primary-500 hover:text-white'
              )}
            >
              <IoSettingsSharp className='mr-2 h-5 w-5 text-gray-700' />
              Settings
            </a>
          </Menu.Item>
        </div>
        <div className='py-1'>
          <Menu.Item>
            <button
              className={clsx(
                'flex items-center px-4 py-2 w-full',
                'text-sm text-gray-700',
                'hover:bg-primary-500 hover:text-white'
              )}
              onClick={handleLogOut}
            >
              <IoLogOutOutline className='mr-2 h-5 w-5 text-rose-500' />
              Log Out
            </button>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default User;

function MyDropdown() {
  return (
    <Menu>
      <Menu.Button>More</Menu.Button>
      <Menu.Items>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href='/account-settings'
            >
              Account settings
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href='/account-settings'
            >
              Documentation
            </a>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span className='opacity-75'>Invite a friend (coming soon!)</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
