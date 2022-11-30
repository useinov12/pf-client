import { useContext } from 'react';
import clsx from 'clsx';
import Button from '@/components/buttons/Button';
import Menu from './Menu';
import { useUser } from '@/services/user';
import { ThemeContext } from '@/context/ThemeProvider';

const UserSection = () => {
  const { mode } = useContext(ThemeContext);
  const { user } = useUser();

  return (
    <Menu className='md:w-2/6 lg:w-1/5 '>
      <header
        className={clsx(
          'w-full',
          'flex items-center justify-between px-7 py-4',
          mode === 'light' ? 'bg-gray-300/70' : 'bg-gray-900/70'
        )}
      >
        <h4 className=''>Account</h4>
      </header>

      <section
        className={clsx(
          'px-7',
          'flex items-center justify-around',
          'md:flex-col md:items-start md:justify-start'
        )}
      >
        <div className='my-3 flex flex-col items-start justify-start'>
          <h1
            className={clsx(
              'my-3 flex h-12 w-14',
              'items-center justify-center rounded-xl',
              'text-5xl ring-4 ring-primary-500',
              'drop-shadow'
            )}
          >
            {user && `${user.firstName[0]}`}
          </h1>
          <h4 className=''>{user && `${user.firstName} ${user.lastName}`}</h4>
          <p className='mb-5'>{user && `${user.username}`}</p>
        </div>
        <div>
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
        </div>
      </section>
    </Menu>
  );
};

export default UserSection;
