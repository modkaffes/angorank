import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import fetch from 'node-fetch';

import Table from 'components/Table';
import TopNav from 'components/TopNav';
import { ICoin, ICoinsData } from 'utils/coins';

const ROWS = [20, 50, 100];

function SelectRowsButton({ perPage }: { perPage: number }) {
  const router = useRouter();

  const handleSelectRows = (rows: string) => {
    const { pathname, query } = router;

    router.push({
      pathname,
      query: { ...query, per_page: rows },
    });
  };

  return (
    <div className="inline-flex items-center gap-2">
      <label htmlFor="rows" className="text-sm text-gray-700 dark:text-white">
        Rows
      </label>
      {/* Actually change per_page onChange to persist selection immediately */}
      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select
        id="rows"
        name="rows"
        defaultValue={perPage}
        className="inline-flex gap-1 items-center justify-center border rounded-md shadow-sm font-medium whitespace-nowrap text-sm p-1.5 leading-4 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-transparent dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
        onChange={(e) => handleSelectRows(e.target.value)}
      >
        {ROWS.map((row) => (
          <option key={row} value={row}>
            {row}
          </option>
        ))}
      </select>
    </div>
  );
}

function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const router = useRouter();

  // Triggers fetch for new page
  const handlePagination = (page: { selected: number }) => {
    const { pathname, query } = router;

    router.push({
      pathname,
      query: { ...query, page: page.selected + 1 },
    });
  };

  const liClassNames =
    'flex cursor-pointer border rounded-md shadow-sm font-medium whitespace-nowrap text-sm border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-transparent dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500';
  const aClassNames = 'px-3 py-2 leading-4';
  const activeClassName =
    'ring-2 ring-blue-500 bg-blue-100 hover:bg-blue-100 dark:bg-blue-600 dark:hover:bg-blue-600 border-transparent';
  const disabledClassNames = 'opacity-50 pointer-events-none';

  return (
    <ReactPaginate
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'…'}
      initialPage={currentPage - 1}
      pageCount={totalPages}
      containerClassName={'py-3 flex items-center justify-center gap-3'}
      breakClassName={'hidden sm:flex'}
      activeClassName={activeClassName}
      pageClassName={`${liClassNames} hidden sm:flex`}
      pageLinkClassName={aClassNames}
      previousClassName={liClassNames}
      previousLinkClassName={aClassNames}
      nextClassName={liClassNames}
      nextLinkClassName={aClassNames}
      onPageChange={handlePagination}
      disabledClassName={disabledClassNames}
    />
  );
}

export default function Home({
  supportedVSCurrenciesData,
  activeCryptocurrencies,
  currency,
  coinsData,
  perPage,
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [coins, setCoins] = useState<ICoin[]>();
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  useEffect(() => {
    if (coinsData.error) {
      // Handle error
      console.error(coinsData.error);
    } else {
      setCoins(coinsData);
    }
  }, [coinsData]);

  useEffect(() => {
    if (activeCryptocurrencies.error) {
      // Handle error
      console.error(activeCryptocurrencies.error);
    } else {
      setTotalPages(Math.ceil(activeCryptocurrencies / +perPage));
    }
  }, [activeCryptocurrencies, perPage]);

  useEffect(() => {
    //After the component is mounted set router event handlers
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);

  return (
    <div className="text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <Head>
        <title>Cryptocurrency ranking | Angorank</title>
        <meta name="description" content="Cryptocurrencies ranked by market cap & trading volume" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" sizes="192x192" href="/touch-icon-192x192.png" />
      </Head>
      <TopNav currency={currency} currencies={supportedVSCurrenciesData} isLoading={isLoading} />
      <div className="px-4 py-4 sm:py-10 mx-auto lg:max-w-screen-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-l font-bold leading-7 sm:text-3xl sm:truncate">
              Top Cryptocurrency by Market Cap Today
            </h1>
          </div>
          <div className="flex justify-end gap-3">
            <SelectRowsButton perPage={perPage} />
          </div>
        </div>
        <main className="mt-4 sm:mt-10">
          {coinsData.error && (
            <p className="text-red-600 dark:text-red-400">
              There was an error fetching data: {coinsData.error}
            </p>
          )}
          <div className="overflow-x-auto">
            {coins && <Table coins={coins} currency={currency} />}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} />
        </main>
      </div>
    </div>
  );
}

interface IFormEndpoint {
  currency: string;
  page?: string;
  perPage?: string;
  priceChangePercentage?: string;
  order: string;
}
function formEndpoint({
  currency = 'usd',
  page = '1',
  perPage = '10',
  priceChangePercentage = '24h,7d',
  order = 'market_cap_desc,volume_desc',
}: IFormEndpoint) {
  return (
    `coins/markets` +
    `?vs_currency=${currency}` +
    `&order=${order}` +
    `&per_page=${perPage}` +
    `&page=${page}` +
    `&price_change_percentage=${priceChangePercentage}`
  );
}

const columns = [
  {
    id: '24_price_range',
    title: '24h% price change',
  },
  {
    id: '7d_price_range',
    title: '7d% price change',
  },
  {
    id: 'market_cap',
    title: 'Market Cap',
  },
  {
    id: 'total_volume',
    title: 'Total Volume',
  },
  {
    id: 'total_supply',
    title: 'Circulating Supply',
  },
];

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Use CoinGecko for data
  const API_URL = 'https://api.coingecko.com/api/v3';

  // Get total currencies count to calculate pages
  const resGlobal = await fetch(`${API_URL}/global`);
  const globalData = await resGlobal.json();
  const activeCryptocurrencies = globalData.data.active_cryptocurrencies;

  // Get supported currencies for display
  const resSupportedVSCurrencies = await fetch(`${API_URL}/simple/supported_vs_currencies`);
  const supportedVSCurrenciesData = await resSupportedVSCurrencies.json();

  // Get/Initialize query params
  const {
    vs_currency: currency = 'usd',
    page = '1',
    order = 'market_cap_desc',
    per_page: perPage = '20',
    price_change_percentage: priceChangePercentage = '24h,7d',
  } = query;

  const response = await fetch(
    `${API_URL}/${formEndpoint({
      currency: currency as string,
      page: page as string,
      order: order as string,
      perPage: perPage as string,
      priceChangePercentage: priceChangePercentage as string,
    })}`
  );
  const coinsData: ICoinsData = await response.json();

  return {
    props: {
      activeCryptocurrencies,
      columns,
      currency,
      coinsData,
      perPage,
      page,
      supportedVSCurrenciesData,
    },
  };
};
