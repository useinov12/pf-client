import { useContext } from 'react';
import clsx from 'clsx';
import Menu from '../Menu';
import { ThemeContext } from '@/context/ThemeProvider';
import { useAuth } from '@/services/user/AuthProvider';
import { FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import MenuHeader from '../MenuHeader';

const UserMenu = () => {
  return (
    <Menu
      className={clsx(
        'h-min w-full',
        'md:h-full md:w-1/4',
        'relative h-full overflow-y-scroll'
      )}
    >
      <section className='flex flex-col items-center justify-start md:items-start'>
        <MenuHeader>
          <h4>Account</h4>
        </MenuHeader>
        <div className='flex w-full items-center justify-between py-2 px-5 md:items-start '>
          <UserProfile withSettings />
          <LogoutBtn />
        </div>
      </section>
    </Menu>
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
    </button>
  );
};

const LogoutBtn = () => {
  const { handleLogout } = useAuth();
  return (
    <button className='text-md' onClick={handleLogout}>
      <FiLogOut className='text-3xl hover:text-red-500' />
    </button>
  );
};

