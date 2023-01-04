import { ReactNode } from 'react';
import clsx from 'clsx';
import { TbSpeedboat } from 'react-icons/tb';
import { RiUserSettingsFill, RiSafe2Fill } from 'react-icons/ri';
import { BsSpeedometer } from 'react-icons/bs';
import { useTheme } from '@/context/ThemeProvider';
import ArrowLink from '@/components/links/ArrowLink';
import Polkadot from '@/components/shared/Polkadot';

export default function ExpirienceSection() {
  return (
    <Container className='flex w-full flex-col'>
      <Header />
      <ListOfCards />
    </Container>
  );
}

interface SectionWrapperProps {
  className?: string;
  children?: ReactNode;
}
const Container = ({ children, className }: SectionWrapperProps) => {
  return (
    <section
      className={clsx(
        'mx-auto mt-2 px-3',
        'sm:max-w-screen-sm ',
        'md:max-w-screen-lg ',
        'lg:max-w-screen-xl',
        className
      )}
    >
      {children}
    </section>
  );
};

const Header = () => {
  return (
    <div className='flex w-full flex-col items-center  gap-y-1 gap-x-3 lg:flex-row'>
      <TbSpeedboat className='h-24 w-24 rounded-full' />
      <div className='flex w-full flex-col items-center lg:items-start'>
        <h2 className='cursor-default text-center text-2xl tracking-tight drop-shadow lg:text-left'>
          Smooth Experience
        </h2>
        <h3 className='cursor-default text-center text-xl font-normal drop-shadow lg:text-left'>
          Intuitive, easy and secure
        </h3>
      </div>
    </div>
  );
};

const ListOfCards = () => {
  return (
    <div className='my-4 flex h-full w-full'>
      <ul
        className={clsx(
          'w-full rounded-lg lg:h-60',
          'grid gap-2 md:grid-cols-2  lg:grid-cols-3'
        )}
      >
        {cards.map((card) => (
          <ExpirienceCard card={card} key={card.title} />
        ))}
      </ul>
    </div>
  );
};

const ExpirienceCard = ({
  card,
  className,
}: {
  card: DataType;
  className?: string;
}) => {
  const { mode } = useTheme();
  return (
    <li
      className={clsx(
        'relative overflow-hidden',
        'flex-col items-center rounded',
        'w-full border py-2 md:h-72 md:px-2',
        'flex flex-col items-start',
        mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50',
        className
      )}
    >
      <Polkadot className='absolute top-0 z-0 -translate-x-60 -translate-y-10' />
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
  );
};

type DataType = {
  title: string;
  secondTitle: string | JSX.Element;
  icon: JSX.Element;
  text?: string | undefined;
};

const cards: DataType[] = [
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
