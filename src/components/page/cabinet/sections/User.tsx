import { useContext } from 'react';
import clsx from 'clsx';
import MenuWrapper from '../Menu';
import { ThemeContext } from '@/context/ThemeProvider';
import { useAuth } from '@/services/user/AuthProvider';
import { FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { CgMenuGridO } from 'react-icons/cg';
import MenuHeader from '../MenuHeader';
import { Menu } from '@headlessui/react';

const UserMenu = () => {
  return (
    <MenuWrapper
      className={clsx(
        'h-min w-full',
        'md:h-full md:w-2/5 lg:w-1/4',
        'relative h-full overflow-y-scroll'
      )}
    >
      <section className='flex flex-col items-center justify-start md:items-start'>
        <MenuHeader>
          <h4>Account</h4>
        </MenuHeader>
        <div className='relative flex  w-full px-4'>
          <LogoutBtn className='absolute right-4 top-2' />
          <UserProfile withSettings />
        </div>
      </section>
    </MenuWrapper>
  );
};

export default UserMenu;

const UserProfile = ({ withSettings }: { withSettings?: boolean }) => {
  const { user, handleLogout } = useAuth();

  if (!user) return null;
  return (
    <div className='flex gap-2 py-3 md:flex-col md:px-5'>
      <FaUserCircle className='text-6xl' />
      <div className='flex items-center gap-2'>
        <div className='flex flex-col'>
          <h4>{`${user.firstName} ${user?.lastName}`}</h4>
          <p className='text-sm text-gray-500'>{user.username}</p>
        </div>
        {withSettings && <UserSettingsBtn />}
      </div>
    </div>
  );
};

const UserSettingsBtn = () => {
  const { mode } = useContext(ThemeContext);
  // handle popup
  return (
    <button
      className={clsx(
        'rounded-md bg-none py-1',
        mode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-500'
      )}
      onClick={() => {}}
    >
      <HiDotsVertical className='h-8 w-8' />
      {/* <DropMenu /> */}
    </button>
  );
};

const LogoutBtn = ({ className }: { className?: string }) => {
  const { handleLogout } = useAuth();
  return (
    <button className={clsx('text-md', className)} onClick={handleLogout}>
      <div className='inline-flex items-center gap-2'>
        <FiLogOut className='text-3xl ' />
      </div>
    </button>
  );
};

function DropMenu() {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
          <HiDotsVertical
            className='ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>

      <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <Menu.Item>
          <LogoutBtn />
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
