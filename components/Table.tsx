import { ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

import { ICoin } from 'utils/coins';
import { classNames as cx, formatCurrency } from 'utils/misc';

interface ITableHeader {
  classNames?: string;
  children: ReactNode;
}

function TableHeader({ classNames, children }: ITableHeader) {
  return (
    <th
      scope="col"
      className={`py-3 text-xs font-medium uppercase whitespace-nowrap sticky top-0 bg-white dark:bg-gray-800 ${classNames}`}
    >
      {children}
    </th>
  );
}

export default function Table({ coins, currency }: { coins: ICoin[]; currency: string }) {
  return (
    <table className="min-w-full">
      <thead className="text-gray-500 dark:text-gray-400">
        <tr>
          <TableHeader classNames="left-0 px-3 sm:px-6 z-50">#</TableHeader>
          <TableHeader classNames="text-left pl-0.5 pr-6 left-8 sm:left-14 z-50">Coin</TableHeader>
          <TableHeader classNames="tracking-wider text-right px-6">Price</TableHeader>
          <TableHeader classNames="tracking-wider text-right px-6">24h</TableHeader>
          <TableHeader classNames="tracking-wider text-right px-6">7d</TableHeader>
          <TableHeader classNames="tracking-wider text-right px-6">Market Cap</TableHeader>
          <TableHeader classNames="tracking-wider text-right px-6">Total Volume</TableHeader>
          <TableHeader classNames="tracking-wider text-right px-6">Circulating Supply</TableHeader>
        </tr>
      </thead>
      <tbody className="text-sm divide-y divide-transparent dark:divide-gray-700">
        {coins &&
          coins.length &&
          coins.map((coin: ICoin, id: number) => {
            const alternatingClassName =
              id % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-800';

            return (
              <tr key={coin.id} className={alternatingClassName}>
                <td
                  className={`text-center text-gray-500 text-xs sticky left-0 z-40 ${alternatingClassName}`}
                >
                  {coin.market_cap_rank}
                </td>
                <td className={`pl-0 py-2 sticky left-8 sm:left-14 z-40 ${alternatingClassName}`}>
                  <div className="flex items-center gap-3">
                    <div className="shrink-0">
                      <img className="h-5 w-5 rounded-full" src={coin.image} alt={coin.name} />
                    </div>
                    <div>
                      <p className="font-medium">{coin.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 uppercase text-xs">
                        {coin.symbol}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2 text-right">
                  <span className="font-medium">
                    {formatCurrency(coin.current_price, 20, currency)}
                  </span>
                </td>
                <td className="px-6 py-2">
                  <div
                    className={cx(
                      'flex justify-end items-center gap-1',
                      coin.price_change_percentage_24h_in_currency > 0 &&
                        'text-green-600 dark:text-green-400',
                      coin.price_change_percentage_24h_in_currency < 0 &&
                        'text-red-600 dark:text-red-400'
                    )}
                  >
                    {coin.price_change_percentage_24h_in_currency > 0 && (
                      <ChevronUpIcon className="flex-0 w-3 h-3" />
                    )}
                    {coin.price_change_percentage_24h_in_currency < 0 && (
                      <ChevronDownIcon className="flex-0 w-3 h-3" />
                    )}
                    <span>
                      {Math.abs(coin.price_change_percentage_24h_in_currency).toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <div
                    className={cx(
                      'flex justify-end items-center gap-1',
                      coin.price_change_percentage_7d_in_currency > 0 &&
                        'text-green-600 dark:text-green-400',
                      coin.price_change_percentage_7d_in_currency < 0 &&
                        'text-red-600 dark:text-red-400'
                    )}
                  >
                    {coin.price_change_percentage_7d_in_currency > 0 && (
                      <ChevronUpIcon className="flex-0 w-3 h-3" />
                    )}
                    {coin.price_change_percentage_7d_in_currency < 0 && (
                      <ChevronDownIcon className="flex-0 w-3 h-3" />
                    )}
                    <span>{Math.abs(coin.price_change_percentage_7d_in_currency).toFixed(2)}%</span>
                  </div>
                </td>
                <td className="px-6 py-2 text-right">
                  {formatCurrency(coin.market_cap, 0, currency)}
                </td>
                <td className="px-6 py-2 text-right">
                  {formatCurrency(coin.total_volume, 0, currency)}
                </td>
                <td className="px-6 py-2 text-right whitespace-nowrap">
                  {coin.circulating_supply}
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    {coin.symbol.toUpperCase()}
                  </span>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
