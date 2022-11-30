import Logo from '@/components/Logo';
import Button from '@/components/buttons/Button';
import ThemeButton from '../../landing/ThemeButton';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between py-3' data-fade='1'>
      <Logo />
      <div className='flex items-center gap-2'>
        <Button className='text-md py-1' variant='theme-dependent'>
          Logout
        </Button>
        <ThemeButton />
      </div>
    </nav>
  );
};

export default Navbar;
