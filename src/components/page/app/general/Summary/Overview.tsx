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

import { BanksData } from '@/constant/demoData';
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
    <>
      {selectedBank ? (
        <SelectedBank banksData={banksData} selectedBank={selectedBank} />
      ) : (
        <AllBanks banksData={banksData} />
      )}
    </>
  );
}

function SelectedBank({
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
        <section className='inline-flex w-full flex-none   lg:w-1/4'>
          <div className='flex w-44 flex-col items-start'>
            <div className='flex  flex-col items-start py-1 pl-2'>
              <p className='text-sm  opacity-70'>Selected bank</p>
              <strong className=' text-left text-sm'>
                {selectedBank[0].bank_name}
              </strong>
            </div>

            <div className='flex flex-col items-start py-1 pl-2'>
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

        <section className='h-full w-full flex-grow py-1 lg:w-1/3'>
          {selectedBank.length < 2 ? (
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
            'border-t lg:border-l',
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
                      'h-full w-full ',
                      'bg-gray-500/20 ',
                      i !== selectedBank.length - 1 && 'border-r ',
                      'whitespace-nowrap py-2 pl-2',
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
            <div className='h-28 w-full'>
              <Carousel maxNumberOfChildrensInFrame={2.3}>
                {selectedBank.map((account, i) => (
                  <li key={`selected-bank-acc-${i}`} className='list-none'>
                    <CarouselItem>
                      <div
                        className={clsx(
                          'h-full w-36 whitespace-nowrap py-2 pl-2',
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
                          <strong className='text-sm'>{account.subtype}</strong>
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
                    </CarouselItem>
                  </li>
                ))}
              </Carousel>
            </div>
          )}
        </section>
      </div>
    </Wrapper>
  );
}

function AllBanks({ banksData }: { banksData: BanksData }) {
  const { connectedBanksDict: banksDict } = banksData;
  const { mode } = useTheme();

  return (
    <Wrapper className='h-28'>
      <Carousel maxNumberOfChildrensInFrame={6}>
        {Object.entries(banksDict).map(([name, bank]) => (
          <li key={`bank-cards ${name}`} className='list-none'>
            <CarouselItem>
              <div
                className={clsx(
                  'cursor-default',
                  'flex h-full w-36 flex-col  justify-between border-r px-2 py-1',
                  mode === 'light'
                    ? 'border-gray-600/50'
                    : 'border-gray-300/20',
                  'bg-gray-600/10',
                  'hover:bg-gray-400/20',
                  mode === 'light' ? 'text-gray-700' : 'text-gray-400'
                )}
              >
                <p className='text-sm font-semibold'>{name}</p>

                <div className='inline-flex items-start py-1'>
                  <p className='text-sm opacity-70'># of accounts</p>
                  <strong className='pl-1 text-center text-sm'>
                    {bank.length}
                  </strong>
                </div>

                <div className='inline-flex w-full items-start gap-2'>
                  <div className='flex flex-col items-start'>
                    <p className='text-sm  opacity-70'>Debt</p>
                    <strong className='overflow-x-scroll whitespace-nowrap text-center text-sm'>{`$ ${getDebtBalanceByBank(
                      { bank: name, data: banksDict }
                    )}`}</strong>
                  </div>
                  <div className='ml-1 flex flex-col items-start'>
                    <p className='text-sm  opacity-70'>Balance</p>
                    <strong className='overflow-x-scroll whitespace-nowrap text-center text-sm'>{`$ ${getTotalBalanceByBank(
                      { bank: name, data: banksDict }
                    )}`}</strong>
                  </div>
                </div>
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
  className: string;
}) {
  const { mode } = useTheme();
  return (
    <section
      className={clsx(
        'rounded',
        'overflow-hidden',
        'ease transition-all duration-150',
        'mt-1  border',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
        className
      )}
    >
      {children}
    </section>
  );
}
