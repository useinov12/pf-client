import clsx from 'clsx';
import StyledBgSection from '../shared/StyledBgSection';
import Screen from '../shared/Screen';
import DemoCard from '../cards/DemoCard/DemoCard';
import { BsCashCoin } from 'react-icons/bs';
import { AiFillCheckSquare } from 'react-icons/ai';

export default function Demo() {
  return (
    <Screen className='flex flex-col gap-6  lg:flex-row-reverse'>
      <DemoText className='lg:w-2/5' />
      <StyledBgSection className='h-screen lg:w-3/5' left>
        <DemoCard
          className={clsx(
            'translate-x-10 sm:translate-x-0',
            'mt-12 lg:mt-0',
            'h-[32rem] max-w-[38rem] md:w-5/6 lg:w-5/6',
            'lg:translate-x-5 lg:translate-y-20'
          )}
        />
      </StyledBgSection>
    </Screen>
  );
}

const DemoText = ({ className }: { className: string }) => {
  return (
    <section
      className={clsx(
        'flex flex-col items-center justify-center  gap-6  lg:items-start',
        className
      )}
    >
      <div className='my-4 flex flex-col items-center justify-center gap-2 lg:my-0 lg:flex-row lg:items-start'>
        <BsCashCoin className='h-16 w-16' />
        <div className='flex flex-col items-center lg:items-start'>
          <h2 className='cursor-default text-center text-2xl tracking-tight drop-shadow lg:text-left'>
            PersonalFinance
          </h2>
          <h3 className='lg:text-lefts cursor-default text-center text-xl font-normal drop-shadow'>
            will help you organize your bank data
          </h3>
        </div>
      </div>
      <ul className='my-6 flex flex-col'>
        {[
          'Unlimited banks connection',
          'Cross-bank data analytics',
          'Configurable aggregation of data',
          'Custom charts and tools',
        ].map((perk, i) => (
          <li key={i} className='inline-flex items-center gap-3'>
            <AiFillCheckSquare className='h-7 w-7' />
            <h6 className='text-lg'>{perk}</h6>
          </li>
        ))}
      </ul>
    </section>
  );
};
