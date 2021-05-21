import useRouter from 'next/router';

import Button from 'components/Button';
import Dropdown, { FlyOut } from 'components/Dropdown';
import { classNames as cx } from 'utils/misc';

function CurrencyButton({ currency, isSelected }: { currency: string; isSelected: boolean }) {
  const router = useRouter;

  const classNames = cx(
    isSelected &&
      'ring-2 ring-blue-500 bg-blue-100 hover:bg-blue-100 dark:bg-blue-600 dark:hover:bg-blue-600 border-transparent'
  );

  const handleSelectCurrency = (currency: string) => {
    const { pathname, query } = router;

    router.push({
      pathname,
      query: { ...query, vs_currency: currency },
    });
  };

  return (
    <Button onClick={() => handleSelectCurrency(currency)} className={classNames}>
      {currency.toUpperCase()}
    </Button>
  );
}

export default function CurrencySelector({
  currency: selectedCurrency,
  currencies,
}: {
  currency: string;
  currencies: string[];
}) {
  return (
    <Dropdown
      trigger={<Button caret>{selectedCurrency.toUpperCase()}</Button>}
      flyout={
        <FlyOut
          title="Select currency"
          content={
            <div className="grid grid-cols-6 gap-3 w-96">
              {currencies.map((currency) => {
                // Compare using localCompare for case insensitivity
                // eg. when user adds ETH instead of eth in query params
                const isSelected = currency.localeCompare(selectedCurrency) === 0;

                return (
                  <CurrencyButton key={currency} currency={currency} isSelected={isSelected} />
                );
              })}
            </div>
          }
        />
      }
    />
  );
}
