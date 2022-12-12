import Logo from '@/components/Logo';
import Button from '@/components/buttons/Button';
import ThemeButton from '../../landing/ThemeButton';
import { useAuth } from '@/services/user/AuthProvider';

const Navbar = () => {
  const { handleLogout } = useAuth();
  return (
    <nav className='flex items-center justify-between py-3' data-fade='1'>
      <Logo />
      <div className='flex items-center gap-2'>
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
