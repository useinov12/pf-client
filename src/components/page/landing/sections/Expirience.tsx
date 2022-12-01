import React from 'react';
import clsx from 'clsx';
import Path from '../Path';
import { TbSpeedboat } from 'react-icons/tb';
import { RiUserSettingsFill, RiSafe2Fill } from 'react-icons/ri';
import { BsSpeedometer } from 'react-icons/bs';
import { ThemeContext } from '@/context/ThemeProvider';
import ArrowLink from '@/components/links/ArrowLink';

const ExpirienceSection = () => {
  const { mode } = React.useContext(ThemeContext);

  return (
    <article
      className={clsx(
        'mx-auto',
        'px-3 sm:max-w-screen-sm',
        'md:max-w-screen-md ',
        'lg:max-w-screen-xl',
        'xl:max-w-screen-xl',
        'mt-20 lg:mt-0',
        'snap-start'
      )}
    >
      <div className='flex w-full flex-col lg:gap-3 lg:flex-row'>
        <div className='flex flex-col items-center justify-start lg:items-start'>
          <TbSpeedboat className='lg:mb-2 h-20 w-20 rounded-full' />
          <Path height={350} className='hidden lg:block'/>
        </div>

        <div className='w-full'>
          <div className='w-full'>
            <div className='lg:mt-4 flex w-full flex-col items-center lg:items-start'>
              <h2 className='cursor-default text-center text-2xl tracking-tight drop-shadow lg:text-left'>
                Smooth Experience
              </h2>
              <h3 className='cursor-default text-center text-xl font-normal drop-shadow lg:text-left'>
                Intuitive, easy and secure
              </h3>
            </div>
          </div>

          <div className='my-4 flex h-full w-full'>
            <ul
              className={clsx(
                'w-full rounded-lg lg:h-60',
                'flex flex-wrap items-center justify-center gap-1 md:flex-nowrap lg:flex-nowrap'
              )}
            >
              {cards.map((card, i) => (
                <li
                  key={card.title}
                  className={clsx(
                    'flex-col items-center rounded',
                    'w-full border py-2 md:h-72 md:w-1/3 md:px-2 lg:h-60',
                    'flex flex-col items-start',
                    mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
                    mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50'
                  )}
                >
                  <div className='flex flex-col items-center gap-1 lg:self-center '>
                    {card.icon}
                    <h4 className='font-mono text-xl font-semibold tracking-tighter drop-shadow '>
                      {card.title}
                    </h4>
                  </div>
                  <div
                    className={clsx(
                      'w-full py-2 text-center font-serif text-lg font-normal drop-shadow md:mt-5',
                      'w-full sm:px-10 md:px-0'
                    )}
                  >
                    {card.secondTitle}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ExpirienceSection;

const cards = [
  {
    title: 'Easy to set up',
    secondTitle:
      'We made the app intuitive. Not a single piece of your data is being stored.',
    text: 'Not a single piece of your data is being stored',
    icon: <RiUserSettingsFill className='h-16 w-16' />,
  },
  {
    title: 'Safety with Plaid',
    secondTitle: (
      <span>
        Best bank-data provider on the market. Read more about
        <ArrowLink href='https://plaid.com' className='mx-1'>
          Plaid
        </ArrowLink>
      </span>
    ),
    icon: <RiSafe2Fill className='h-16 w-16' />,
  },
  {
    title: 'Fast data loads',
    secondTitle:
      'Upload fresh transactions data on login. Data loads updates each time you login.',
    text: 'Data loads updates each time you login',
    icon: <BsSpeedometer className='h-16 w-16 ' />,
  },
];
