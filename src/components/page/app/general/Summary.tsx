import { faker } from '@faker-js/faker';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';

import {
  getDebtBalanceByBank,
  getSortedBankData,
  getTotalBalanceByBank,
} from '@/lib/dataFormatingMethods';

import BarChart from '@/components/charts/BarChart';
import { months } from '@/components/charts/defaults';
import DoughnutChart from '@/components/charts/Doughnut';
import LineChart from '@/components/charts/LineChart';
import { ChartDataFormat } from '@/components/charts/types';
import { Carousel, CarouselItem } from '@/components/shared/Carousel';

import { BanksData } from '@/constant/demoData';
import { useTheme } from '@/context/ThemeProvider';
import { Bank } from '@/services/types';

import Card from '../Card';

export default function Summary({
  className,
  banksData,
}: {
  className: string;
  banksData: BanksData;
}) {
  const [openBankId, setOpenBankId] = useState(-1);
  const [selectedBank, setSelectedBank] = useState<Bank | undefined>(undefined);

  return (
    <Card
      className={clsx('px-0', 'flex flex-col justify-start gap-3 ', className)}
      // title='Summary'
    >
      <div className='flex items-center justify-between'>
        <strong>Summary</strong>
        <div>{/* <AddBankButton /> */}</div>
      </div>
      <BankList
        banksData={banksData}
        openBankId={openBankId}
        setSelectedBank={setSelectedBank}
        setOpenBankId={setOpenBankId}
      />

      {selectedBank ? (
        <SelectedBank
          banksData={banksData}
          openBankId={openBankId}
          selectedBank={selectedBank}
        />
      ) : (
        <AllBanks banksData={banksData} />
      )}
      <Overview banksData={banksData} selectedBank={selectedBank} />
    </Card>
  );
}

function BankList({
  banksData,
  openBankId,
  setSelectedBank,
  setOpenBankId,
}: {
  banksData: BanksData;
  openBankId: number;
  setSelectedBank: Dispatch<SetStateAction<Bank | undefined>>;
  setOpenBankId: Dispatch<SetStateAction<number>>;
}) {
  const banksDict = banksData.connectedBanksDict;
  const { mode } = useTheme();

  return (
    <section className=''>
      <ul className={clsx('h-full w-full list-none', 'flex flex-wrap gap-1')}>
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
              mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
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
                mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
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
  );
}

function SelectedBank({
  banksData,
  openBankId,
  selectedBank,
}: {
  banksData: BanksData;
  openBankId: number;
  selectedBank: Bank | undefined;
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
    <section
      className={clsx(
        'rounded',
        'overflow-hidden',
        'ease transition-all duration-150',
        'mt-1 h-28 border',
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
              'border-l',
              'h-full w-2/5 ',
              'flex-none self-end',
              mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
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
                        'h-full w-full',
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
                        <p className=' text-sm lowercase'>{account.name}</p>
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
            )}
          </section>
        </div>
      )}
    </section>
  );
}

function AllBanks({ banksData }: { banksData: BanksData }) {
  const { connectedBanksDict: banksDict } = banksData;
  const { mode } = useTheme();

  return (
    <section
      className={clsx(
        'flex-none',
        'rounded',
        'overflow-hidden',
        'ease transition-all duration-150',
        'mt-1 h-28 border',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
      )}
    >
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
    </section>
  );
}

function Overview({
  selectedBank,
  banksData,
}: {
  banksData: BanksData;
  selectedBank: Bank | undefined;
}) {
  const { mode } = useTheme();

  return (
    <section
      className={clsx(
        'h-full px-2',
        'rounded border',
        'bg-gray-600/10',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
        mode === 'light' ? 'text-gray-700' : 'text-gray-400'
      )}
    >
      {selectedBank ? (
        <SelectedBankAnalytics
          className='w-full md:w-2/5'
          banksData={banksData}
          selectedBank={selectedBank}
        />
      ) : (
        <AllBanksAnalytics banksData={banksData} />
      )}
    </section>
  );
}

function AllBanksAnalytics({ banksData }: { banksData: BanksData }) {
  const sortedDataset = getSortedBankData(banksData.connectedBanksDict);
  const savingMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(1000, 5000))
  );
  const checkingMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(-3000, 5000))
  );
  const creditMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(-3000, 3000))
  );
  const barChartDataset: ChartDataFormat = {
    label: 'Balance',
    labels: sortedDataset.sortedBankNames,
    datasets: [sortedDataset.sortedTotals],
  };
  const lineChartDataset: ChartDataFormat = {
    label: 'Total Dynamic',
    labels: banksData.monthlyBalanceDynamic.months.slice(0, 6),
    datasets: [banksData.monthlyBalanceDynamic.balances.slice(0, 6)],
  };
  const stackedBarChartData: ChartDataFormat = {
    label: 'Balance',
    labels: months.map((month) => month.slice(0, 3)),
    datasets: [savingMonthlyChange, checkingMonthlyChange, creditMonthlyChange],
    datasetsLabels: ['Saving change', 'Checking change', 'Credit Change'],
  };
  return (
    <section
      className={clsx('h-full w-full', 'flex flex-col gap-1 md:flex-row')}
    >
      <div className={clsx('h-full w-full px-4 md:w-2/5')}>
        <BarChart
          incomingData={barChartDataset}
          width='100%'
          height='100%'
          styleOptions='APP'
          vertical
          title='Banks balances'
        />
      </div>
      <div className='h-full w-full md:w-3/5'>
        <div className='h-1/2'>
          <LineChart
            incomingData={lineChartDataset}
            width='100%'
            height='100%'
            styleOptions='APP'
            title='All banks balance dynamic'
            showScales={true}
          />
        </div>
        <div className='h-1/2 w-full'>
          <BarChart
            incomingData={stackedBarChartData}
            width='100%'
            height='100%'
            styleOptions='APP'
            title='All banks monthly change by account type'
          />
        </div>
      </div>
    </section>
  );
}

function SelectedBankAnalytics({
  selectedBank,
  banksData,
  className,
}: {
  banksData: BanksData;
  selectedBank: Bank;
  className: string;
}) {
  const { mode } = useTheme();
  const savingMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(1000, 5000))
  );
  const checkingMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(-3000, 5000))
  );
  const creditMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(-3000, 3000))
  );

  const lineChartDataset: ChartDataFormat = {
    label: 'Total Dynamic',
    labels: banksData.monthlyBalanceDynamic.months.slice(0, 6),
    datasets: [banksData.monthlyBalanceDynamic.balances.slice(0, 6)],
  };
  const stackedBarChartData: ChartDataFormat = {
    label: 'Balance',
    labels: months.map((month) => month.slice(0, 3)),
    datasets: [savingMonthlyChange, checkingMonthlyChange, creditMonthlyChange],
    datasetsLabels: ['Saving change', 'Checking change', 'Credit Change'],
  };

  const arr = new Array(20).fill(0);

  const transactions = arr.map((_, i) => {
    return {
      amount: faker.finance.amount(-2000, 3000),
      type: faker.finance.transactionType(),
      desc: faker.finance.transactionDescription(),
    };
  });

  return (
    <>
      <section className={clsx('h-full  overflow-hidden ', className)}>
        <div
          className={clsx(
            'h-full w-full border-r py-1',
            mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
          )}
        >
          <strong className='font-seemibold pl-3'>Transactions</strong> <br />
          <li
            className={clsx(
              'inline-flex w-full gap-1 border-b py-1 pl-3',
              mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
            )}
          >
            <strong className='w-1/2 truncate text-sm '>information</strong>
            <div className='inline-flex w-1/2 justify-between '>
              <strong className='w-1/2 text-sm'>type</strong>
              <strong className='w-1/2 text-sm'>amount</strong>
            </div>
          </li>
          <ul className={clsx('h-full', 'flex flex-col overflow-y-scroll')}>
            {transactions.map((trans, i) => (
              <li
                key={`trans-${i}`}
                className={clsx(
                  'cursor-pointer',
                  'inline-flex gap-1 border-b px-1 py-1 pl-3',
                  mode === 'light'
                    ? 'border-gray-600/50'
                    : 'border-gray-300/20',
                  'bg-gray-600/10',
                  'hover:bg-gray-400/20',
                  mode === 'light' ? 'text-gray-700' : 'text-gray-400'
                )}
              >
                <p className='w-1/2 truncate text-sm'>
                  {trans.desc.split(' ').splice(2).join(' ')}
                </p>
                <div className='inline-flex w-1/2 justify-between '>
                  <p className='w-1/2 text-sm'>{trans.type}</p>
                  <p className='w-1/2 text-sm'>$ {trans.amount}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className='h-full w-2/3 px-2'>
        <div className='h-1/2 w-full'>
          <LineChart
            incomingData={lineChartDataset}
            width='100%'
            height='100%'
            styleOptions='APP'
            title={`${selectedBank[0].bank_name} balance dynamic`}
            showScales={true}
          />
        </div>
        <div className='h-1/2 w-full'>
          <BarChart
            incomingData={stackedBarChartData}
            width='100%'
            height='100%'
            styleOptions='APP'
            title={`${selectedBank[0].bank_name} monthly change by account type`}
          />
        </div>
      </section>
    </>
  );
}
