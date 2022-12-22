import React from 'react'
import clsx from 'clsx'
import Card from './Card';
import Button from '@/components/buttons/Button';
import Ping from '@/components/shared/Ping';

const DemoCard = () => {
    return (
      <Card
        className={clsx(
          'h-[10rem] w-[20rem]',
          'sm:h-[10rem] sm:w-[28rem]',
          'md:h-[15rem] md:w-[32rem]',
          'group overflow-hidden',
        )}
      >
        <div className='relative h-full w-full p-1 text-dark'>
          <div
            className={clsx(
              'absolute top-4 left-4 z-30 cursor-default rounded-md',
              'bg-gradient-to-bl from-sky-400 to-blue-400 px-2 py-1 shadow-lg ',
              'shadow-lg'
            )}
          >
            <h3 className='font-mono tracking-tight'>PersonalFinance</h3>
          </div>
          <div
            className={clsx(
              `bg-[url('../../public/images/sketch.png')] bg-contain`,
              'float-right h-full w-3/4 rounded-tl-[10rem] rounded-tr-xl rounded-br-xl ',
              'rounded-xls group-hover:blur-sm',
              'transition-all duration-150'
            )}
          />
          <div className='absolute bottom-6 right-6'>
            <Button
              variant='light'
              className='relative py-[2px] px-7  text-xl uppercase shadow-lg'
            >
              Demo
              <span className='absolute -top-1 -right-1'>
                <Ping />
              </span>
            </Button>
          </div>
        </div>
      </Card>
    );
  };

export default DemoCard