import Logo from '@/components/Logo';
import ThemeButton from '../../landing/ThemeButton';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between py-3' data-fade='1'>
      <div className='inline-flex items-center gap-4'>
        <Logo />
      </div>
      <div className='flex justify-center gap-3'>
        <ThemeButton />
      </div>
    </nav>
  );
};

export default Navbar;


