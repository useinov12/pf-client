import clsx from 'clsx';
import { ReactNode } from 'react';

import {
  getDebtBalanceByBank,
  getTotalBalanceByBank,
} from '@/lib/dataFormatingMethods';

import DoughnutChart from '@/components/charts/Doughnut';
import LineChart from '@/components/charts/LineChart';
import { ChartDataFormat } from '@/components/charts/types';
import { Carousel, CarouselItem } from '@/components/shared/Carousel';

import { BanksData } from '@/constant/demo-data/demoData';
import { useTheme } from '@/context/ThemeProvider';
import { Bank } from '@/services/types';

export default function Overview({
  selectedBank,
  banksData,
}: {
  selectedBank: Bank | undefined;
  banksData: BanksData;
}) {
  return (
    <div className='h-fit'>
      {selectedBank ? (
        <SelectedBank banksData={banksData} selectedBank={selectedBank} />
      ) : (
        <AllBanks banksData={banksData} />
      )}
    </div>
  );
}

export function SelectedBank({
  banksData,
  selectedBank,
}: {
  banksData: BanksData;
  selectedBank: Bank;
}) {
  const { mode } = useTheme();

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
  return (
    <Wrapper className='h-full lg:h-28'>
      <div
        className={clsx(
          'flex flex-col lg:flex-row',
          'h-full w-full justify-between'
        )}
      >
        <section className='inline-flex w-full flex-none lg:w-1/4'>
          <div className='flex w-44 flex-col items-start'>
            <div className='flex  flex-col items-start pt-1 pl-2'>
              <p className='text-md  opacity-70'>Selected bank</p>
              <strong className=' text-left text-lg'>
                {selectedBank[0].bank_name}
              </strong>
            </div>

            <div className='inline-flex items-start gap-4 pl-2'>
              <div className='flex flex-col items-start'>
                <p className='text-md  opacity-70'>Debt</p>
                <strong className='text-center text-lg'>{`$ ${-6000}`}</strong>
              </div>

              <div className='ml-1 flex flex-col items-start'>
                <p className='text-md  opacity-70'>Balance</p>
                <strong className='text-center text-lg'>{`$ ${3000}`}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className='h-full w-full flex-grow py-1 lg:w-1/3'>
          {selectedBank.length < 3 ? (
            <LineChart
              incomingData={lineChartDataset}
              width='100%'
              height='100%'
              styleOptions='APP'
              showScales={true}
            />
          ) : (
            <DoughnutChart
              incomingData={doughnutChartDataset}
              width='100%'
              height='100%'
              styleOptions='APP'
            />
          )}
        </section>

        <section
          className={clsx(
            'lg:border-l',
            'h-full w-full lg:w-2/5 ',
            'flex-none self-end',
            mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
            'overflow-hidden'
          )}
        >
          {selectedBank.length < 3 ? (
            <ul className='flex h-28 w-full'>
              {selectedBank.map((account, i) => (
                <li
                  key={`selected-bank-acc-${i}`}
                  className='h-full w-full list-none'
                >
                  <div
                    className={clsx(
                      'py-2 pl-2',
                      'h-full w-full ',
                      'bg-gray-500/20 ',
                      i !== selectedBank.length - 1 && 'border-r  ',
                      'flex flex-col justify-between',
                      mode === 'light'
                        ? 'border-gray-600/50'
                        : 'border-gray-300/20',
                      'bg-gray-600/10',
                      'hover:bg-gray-400/20',
                      mode === 'light' ? 'text-gray-700' : 'text-gray-400'
                    )}
                  >
                    <div className=''>
                      <strong className='text-sm'>{account.subtype}</strong>
                      <p className=' text-ellipsis text-sm lowercase'>
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
            <Carousel
              maxNumberOfChildrensInFrame={2.3}
              widthClass='w-full'
              heightClass='h-28'
            >
              {selectedBank.map((account, i) => (
                <li key={`selected-bank-acc-${i}`} className='list-none'>
                  <CarouselItem>
                    <div
                      className={clsx(
                        'h-full w-60 whitespace-nowrap py-2 pl-2',
                        'border-r ',
                        'flex flex-col justify-between',
                        mode === 'light'
                          ? 'border-gray-600/50'
                          : 'border-gray-300/20',
                        'bg-gray-600/10',
                        'hover:bg-gray-400/20',
                        mode === 'light' ? 'text-gray-700' : 'text-gray-400'
                      )}
                    >
                      <div>
                        <strong className='font-mono text-sm'>
                          {account.subtype}
                        </strong>
                        <p className='truncate text-sm lowercase'>
                          {account.name}
                        </p>
                      </div>
                      <p className=' text-2xl font-semibold'>
                        ${' '}
                        {account.subtype === 'credit card'
                          ? -account.balance
                          : account.balance}
                      </p>
                    </div>
                  </CarouselItem>
                </li>
              ))}
            </Carousel>
          )}
        </section>
      </div>
    </Wrapper>
  );
}

export function AllBanks({ banksData }: { banksData: BanksData }) {
  const { connectedBanksDict: banksDict } = banksData;
  const { mode } = useTheme();

  return (
    <Wrapper>
      <Carousel
        maxNumberOfChildrensInFrame={4}
        widthClass='w-full'
        heightClass='h-28'
      >
        {Object.entries(banksDict).map(([name, bank]) => (
          <li key={`bank-cards ${name}`} className='list-none'>
            <CarouselItem>
              <div
                className={clsx(
                  'cursor-default',
                  'flex h-full w-52 flex-col  justify-between border-r px-2 py-1',
                  mode === 'light'
                    ? 'border-gray-600/50'
                    : 'border-gray-300/20',
                  'bg-gray-600/10',
                  'hover:bg-gray-400/20',
                  mode === 'light' ? 'text-gray-700' : 'text-gray-400'
                )}
              >
                <section>
                  <p className='text-md font-semibold'>{name}</p>

                  <div className='inline-flex w-full items-start justify-between py-1'>
                    <p className='text-sm opacity-70'># of accounts</p>
                    <strong className='pl-1 text-center text-sm'>
                      {bank.length}
                    </strong>
                  </div>
                </section>

                <section className='inline-flex w-full justify-between gap-2'>
                  <div className='flex flex-col items-start'>
                    <p className='text-sm  opacity-70'>Debt</p>
                    <strong className='overflow-x-scroll whitespace-nowrap text-center text-lg'>{`$ ${getDebtBalanceByBank(
                      { bank: name, data: banksDict }
                    )}`}</strong>
                  </div>
                  <div className='ml-1 flex flex-col items-start'>
                    <p className='text-sm  opacity-70'>Balance</p>
                    <strong className='overflow-x-scroll whitespace-nowrap text-center text-lg'>{`$ ${getTotalBalanceByBank(
                      { bank: name, data: banksDict }
                    )}`}</strong>
                  </div>
                </section>
              </div>
            </CarouselItem>
          </li>
        ))}
      </Carousel>
    </Wrapper>
  );
}

function Wrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { mode } = useTheme();
  return (
    <section
      className={clsx(
        'h-fit flex-none',
        'rounded-tr rounded-tl',
        'overflow-hidden',
        'ease transition-all duration-150',
        'border-b',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
        className
      )}
    >
      {children}
    </section>
  );
}
