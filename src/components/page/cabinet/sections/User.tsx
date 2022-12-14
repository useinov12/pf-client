import { useContext } from 'react';
import clsx from 'clsx';
import Menu from '../Menu';
import { ThemeContext } from '@/context/ThemeProvider';
import { useAuth } from '@/services/user/AuthProvider';
import { FiSettings } from 'react-icons/fi';

const UserMenu = () => {
  return (
    <Menu
      className={'first-lpeer-in-range:h-full relative w-min overflow-y-scroll'}
    >
      <section className='flex justify-start py-3 px-7'>
        <Header />
        <UserProfile withSettings />
      </section>
    </Menu>
  );
};

export default UserMenu;

const Header = () => {
  const { mode } = useContext(ThemeContext);
  return (
    <header
      className={clsx(
        'w-full',
        'sticky top-0 z-40',
        'flex items-center justify-between px-7 py-4',
        mode === 'light' ? 'bg-gray-300' : 'bg-gray-900'
      )}
    >
      <h4>Account</h4>
    </header>
  );
};

const Avatar = ({ firstName }: { firstName: string }) => {
  return (
    <h1
      className={clsx(
        'text-3xl',
        'h-9 w-9',
        'md:text-3xl',
        'rounded text-center',
        'ring-4 ring-primary-600',
        'drop-shadow'
      )}
    >
      {`${firstName[0]}`}
    </h1>
  );
};

const UserProfile = ({ withSettings }: { withSettings?: boolean }) => {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <div className='flex items-center justify-center gap-2'>
      <Avatar firstName={user.firstName} />
      <div className='flex flex-col'>
        <strong>{`${user.firstName} ${user?.lastName}`}</strong>
        <p className='text-sm text-gray-500'>{user.username}</p>
      </div>
      {withSettings && <UserSettingsBtn />}
    </div>
  );
};

const UserSettingsBtn = () => {
  const { mode } = useContext(ThemeContext);
  // const { handleBankConfigPopup } = useCabinetPageContext();
  return (
    <button
      className={clsx(
        'rounded-full bg-none p-2 ',
        mode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-500'
      )}
      onClick={() => {}}
    >
      <FiSettings className='h-8 w-8' />
    </button>
  );
};

{
  /* <div className='flex gap-2 md:flex-col md:gap-0'>
  <Button
    className={clsx(
      'flex items-center justify-center',
      'my-1 w-36 py-1',
      'text-sm'
    )}
  >
    Change Name
  </Button>
  <Button
    variant='red'
    className={clsx(
      'flex items-center justify-center',
      'my-1 w-36 py-1 ',
      'text-sm'
    )}
  >
    Delete account
  </Button>
</div> */
}
