import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { Children, ReactNode, useEffect, useState } from 'react';
import { getSortedBankData } from '@/lib/dataFormatingMethods';
import Card from '../Card';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import DoughnutChart from '@/components/charts/Doughnut';
import { ChartDataFormat } from '@/components/charts/types';
import { Bank } from '@/services/types';
import { BanksData } from '@/constant/demoData';
import { months } from '@/components/charts/defaults';
import { faker } from '@faker-js/faker';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

export default function Summary({
  className,
  banksData,
}: {
  className: string;
  banksData: BanksData;
}) {
  const { mode } = useTheme();
  const banksDict = banksData.connectedBanksDict;
  const sortedDataset = getSortedBankData(banksData.connectedBanksDict);

  const [openBankId, setOpenBankId] = useState(-1);
  const [selectedBank, setSelectedBank] = useState<Bank | undefined>(undefined);

  const lineChartDataset: ChartDataFormat = {
    label: 'Total Dynamic',
    labels: banksData.monthlyBalanceDynamic.months.slice(0, 6),
    datasets: [banksData.monthlyBalanceDynamic.balances.slice(0, 6)],
  };
  const doughnutChartDataset: ChartDataFormat = {
    label: 'Total Dynamic',
    labels: selectedBank ? selectedBank.map((acc) => acc.subtype) : [],
    datasets: [selectedBank ? selectedBank.map((acc) => acc.balance) : []],
  };

  const barChartDataset: ChartDataFormat = {
    label: 'Balance',
    labels: sortedDataset.sortedBankNames,
    datasets: [sortedDataset.sortedTotals],
  };

  const savingMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(1000, 5000))
  );
  const checkingMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(-3000, 5000))
  );
  const creditMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(-3000, 3000))
  );

  const stackedBarChartData: ChartDataFormat = {
    label: 'Balance',
    labels: months.map((month) => month.slice(0, 3)),
    datasets: [savingMonthlyChange, checkingMonthlyChange, creditMonthlyChange],
    datasetsLabels: ['Saving change', 'Checking change', 'Credit Change'],
  };

  return (
    <Card
      className={clsx('px-0 py-1', 'flex flex-col gap-3', className)}
      title='Summary'
      withBorder
    >
      <main className='mt-3 flex h-full flex-col gap-2'>
        <div className='flex flex-col gap-5'>
          <section className=''>
            <ul
              className={clsx(
                'h-full w-full list-none',
                'flex flex-wrap gap-1'
              )}
            >
              <li>
                <button
                  onClick={() => {
                    setOpenBankId(-1);
                    setSelectedBank(undefined);
                  }}
                  className={clsx(
                    'border',
                    'rounded px-3',
                    'whitespace-nowrap',
                    'font-semibold',
                    mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-500/20',
                    mode === 'light'
                      ? 'border-gray-600/50'
                      : 'border-gray-300/20',
                    openBankId === -1 &&
                      'border-blue-600 text-blue-600 ring-2 ring-blue-600',
                    'hover:border-blue-600',
                    ' hover:text-blue-600 '
                  )}
                >
                  All banks
                </button>
              </li>
              {Object.keys(banksDict).map((bank, i) => (
                <li key={bank}>
                  <button
                    onClick={() => {
                      setOpenBankId((p) => (p === i ? -1 : i));
                      setSelectedBank((p) =>
                        p === banksDict[bank] ? undefined : banksDict[bank]
                      );
                    }}
                    className={clsx(
                      'border',
                      'rounded px-3',
                      'whitespace-nowrap',
                      mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-500/20',
                      mode === 'light'
                        ? 'border-gray-600/50'
                        : 'border-gray-300/20',
                      i === openBankId &&
                        'border-blue-600 text-blue-600 ring-2 ring-blue-600',
                      'hover:border-blue-600',
                      ' hover:text-blue-600 '
                    )}
                  >
                    {bank}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section
            className={clsx(
              'overflow-hidden',
              'rounded',
              'ease transition-all duration-150',
              openBankId === -1 ? 'h-0' : 'h-28 border',
              mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
            )}
          >
            {selectedBank && (
              <div className='inline-flex h-full  w-full justify-between'>
                <section className='inline-flex w-1/4  flex-none'>
                  <div className='flex  w-44 flex-col items-start '>
                    <div className='flex  flex-col items-start py-1 pl-3'>
                      <p className='text-sm  opacity-70'>Selected bank</p>
                      <strong className='text-center text-sm'>
                        {selectedBank[0].bank_name}
                      </strong>
                    </div>
                    <div className='flex flex-col items-start py-1 pl-3'>
                      <p className='text-sm opacity-70'># of accounts</p>
                      <strong className='pl-1 text-center text-sm'>4</strong>
                    </div>
                  </div>
                  <div className='inline-flex w-24  justify-between whitespace-nowrap py-1'>
                    <div className='flex w-1/2 flex-col items-start gap-2'>
                      <div className='flex flex-col items-start'>
                        <p className='text-sm  opacity-70'>Debt</p>
                        <strong className='text-center text-sm'>{`$ ${-6000}`}</strong>
                      </div>
                      <div className='ml-1 flex flex-col items-start'>
                        <p className='text-sm  opacity-70'>Balance</p>
                        <strong className='text-center text-sm'>{`$ ${3000}`}</strong>
                      </div>
                    </div>
                  </div>
                </section>

                <section className='h-full w-1/3 flex-grow py-1'>
                  {selectedBank.length < 2 ? (
                    <LineChart
                      incomingData={lineChartDataset}
                      width='100%'
                      height='100%'
                      styleOptions={'APP'}
                      showScales={true}
                    />
                  ) : (
                    <DoughnutChart
                      incomingData={doughnutChartDataset}
                      width='100%'
                      height='100%'
                      styleOptions={'APP'}
                      // showScales={true}
                    />
                  )}
                </section>

                <section
                  className={clsx(
                    'border-l',
                    'h-full w-2/5 ',
                    'flex-none self-end',
                    mode === 'light'
                      ? 'border-gray-600/50'
                      : 'border-gray-300/20',
                    'overflow-hidden'
                  )}
                >
                  {selectedBank.length <= 3 ? (
                    <ul className='flex h-full w-full'>
                      {selectedBank.map((account, i) => (
                        <li
                          key={`selected-bank-acc-${i}`}
                          className='h-full w-full list-none'
                        >
                          <div
                            className={clsx(
                              'h-full w-full  py-2 pl-2',
                              'bg-gray-500/20 ',
                              i !== selectedBank.length - 1 && 'border-r ',
                              mode === 'light'
                                ? 'border-gray-600/50'
                                : 'border-gray-300/20',
                              'flex flex-col justify-between'
                            )}
                          >
                            <div>
                              <strong className='text-sm'>
                                {account.subtype}
                              </strong>
                              <p className=' text-sm lowercase'>
                                {account.name}
                              </p>
                            </div>
                            <p className='text-xl font-semibold'>
                              ${' '}
                              {account.subtype === 'credit card'
                                ? -account.balance
                                : account.balance}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <MyCarousel>
                      {selectedBank.map((account, i) => (
                        <li
                          key={`selected-bank-acc-${i}`}
                          className='list-none'
                        >
                          <MyCarouselItem>
                            <div
                              className={clsx(
                                'h-full w-28 whitespace-nowrap py-2 pl-2',
                                'bg-gray-500/20 ',
                                'border-r ',
                                mode === 'light'
                                  ? 'border-gray-600/50'
                                  : 'border-gray-300/20',
                                'flex flex-col justify-between'
                              )}
                            >
                              <div>
                                <strong className='text-sm'>
                                  {account.subtype}
                                </strong>
                                <p className='truncate text-sm lowercase'>
                                  {account.name}
                                </p>
                              </div>
                              <p className='text-xl font-semibold'>
                                ${' '}
                                {account.subtype === 'credit card'
                                  ? -account.balance
                                  : account.balance}
                              </p>
                            </div>
                          </MyCarouselItem>
                        </li>
                      ))}
                    </MyCarousel>
                  )}
                </section>
              </div>
            )}
          </section>
        </div>
        <section
          className={clsx(
            'flex h-2/3 w-full gap-1  pb-5',
            'rounded border py-2 pl-3',
            // mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-500/20',
            mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
          )}
        >
          <div className='h-full w-2/5'>
            <div className='my-2 h-full w-full'>
              <BarChart
                incomingData={barChartDataset}
                width='100%'
                height='100%'
                styleOptions={'APP'}
                vertical
                title={'Banks balances'}
              />
            </div>
          </div>
          <div className='h-full w-2/3'>
            <div className='h-1/2'>
              <div className='my-2 h-full'>
                <LineChart
                  incomingData={lineChartDataset}
                  width='100%'
                  height='100%'
                  styleOptions={'APP'}
                  title={'All banks balance dynamic'}
                  showScales={true}
                />
              </div>
            </div>
            <div className='h-1/2 w-full'>
              <div className='my-2 h-full'>
                <BarChart
                  incomingData={stackedBarChartData}
                  width='100%'
                  height='100%'
                  styleOptions={'APP'}
                  title={'All banks monthly change by account type'}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* <section className='h-2/3 w-full'>
        </section> */}
    </Card>
  );
}

function MyCarousel({ children }: { children: ReactNode }) {
  const numberOfChildren = Children.count(children);
  const moveDistance = 100 / numberOfChildren;
  const [index, setIndex] = useState(0);

  const { mode } = useTheme();

  /* reset slider if children changed */
  useEffect(() => {
    setIndex(0);
  }, [children]);

  return (
    <div className='group flex h-full w-full justify-between'>
      <button
        className={clsx(
          'px-1',
          'transition-colors duration-100',
          'pointer-events-none opacity-0',
          'flex-none text-2xl',
          mode === 'light'
            ? 'group-hover:bg-gray-400'
            : 'group-hover:bg-gray-600',
          numberOfChildren > 3 && index > 0 && 'pointer-events-auto opacity-100'
        )}
        onClick={() => setIndex((p) => p - 1)}
      >
        <HiOutlineChevronLeft />
      </button>
      <section className={clsx('relative', 'grow ', 'overflow-hidden')}>
        <div
          className={clsx(
            'h-full',
            'absolute top-0 left-0',
            'ease transition-transform duration-200',
            'inline-flex'
          )}
          style={{ transform: `translateX(${index * -moveDistance}%)` }}
        >
          {children}
        </div>
      </section>
      <button
        className={clsx(
          'px-1',
          'transition-colors duration-100',
          'pointer-events-none opacity-0',
          'flex-none text-2xl',
          mode === 'light'
            ? 'group-hover:bg-gray-400'
            : 'group-hover:bg-gray-600',
          numberOfChildren > 3 &&
            index < numberOfChildren % 3 &&
            'pointer-events-auto opacity-100'
        )}
        onClick={() => setIndex((p) => p + 1)}
      >
        <HiOutlineChevronRight />
      </button>
    </div>
  );
}

function MyCarouselItem({ children }: { children: ReactNode }) {
  return <section className={clsx('h-full w-fit')}>{children}</section>;
}
