import Logo from '@/components/Logo';
import Button from '@/components/buttons/Button';
import ThemeButton from '../../landing/ThemeButton';
import { useAuth } from '@/services/user/AuthProvider';
import clsx from 'clsx';
import { UserInContext } from '@/services/types';
import { AiOutlineMail } from 'react-icons/ai';

const Navbar = () => {
  const { handleLogout, user } = useAuth();
  return (
    <nav className='flex items-center justify-between py-3' data-fade='1'>
      <div className='inline-flex items-center gap-4'>
        <Logo />
      </div>
      <div className='flex justify-center gap-3'>
        <Button
          className='text-md py-1'
          variant='theme-dependent'
          onClick={handleLogout}
        >
          Logout
        </Button>
        <ThemeButton />
      </div>
    </nav>
  );
};

export default Navbar;


