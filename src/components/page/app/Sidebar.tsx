import clsx from 'clsx';

import ButtonLink from '@/components/links/ButtonLink';
import { Navbar } from '@/components/page/app/Navbar';
import { navLinkslist } from '@/components/page/app/Navbar';
import { UserMenu } from '@/components/page/cabinet/sections/User';

import { useAppPageContext } from '@/context/AppPageContext';
import { useTheme } from '@/context/ThemeProvider';

export default function Sidebar() {
  const { openSidebar } = useAppPageContext();
  const { mode } = useTheme();

  return (
    <nav
      className={clsx(
        'block lg:hidden',
        'h-screen w-full overflow-scroll',
        'absolute top-0 z-50',
        'ease transition-all duration-300',
        openSidebar && '-translate-x-[105%]',
        mode === 'light' ? 'bg-gray-200' : 'bg-gray-900'
      )}
    >
      <Navbar />
      <UserMenu isMobile />
      <ul className=' flex h-full w-full flex-col justify-start'>
        {navLinkslist.map((item, i) => (
          <li key={item.title}>
            <ButtonLink
              href={item.path}
              variant='ghost'
              className={clsx(
                'inline-flex w-full justify-between py-4',
                'rounded-none  border-b border-gray-500/50 '
                // 'lg:rounded lg:border lg:py-1'
              )}
            >
              <div className='flex h-full w-full items-center gap-2'>
                <>
                  <span className='text-3xl'>{item.icon}</span>
                  <h3 className='text-2xl'>{item.title}</h3>
                </>
              </div>
            </ButtonLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
