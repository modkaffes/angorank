import { ArrowPathIcon } from '@heroicons/react/24/outline';
import useMounted from 'hooks/useMounted';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import CurrencySelector from 'components/CurrencySelector';
import ThemeToggle from 'components/ThemeToggle';

function GitHub() {
  return (
    <a
      href="https://github.com/modkaffes/angorank"
      className="focus:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 dark:focus:text-gray-400"
    >
      <span className="sr-only">Angorank on GitHub</span>
      <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
        <path
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          fillRule="evenodd"
        />
      </svg>
    </a>
  );
}

function Logo() {
  const { mounted } = useMounted();
  const { theme } = useTheme();

  return !mounted ? null : (
    <a href="/" className="flex">
      <span className="sr-only">Angorank</span>
      {theme === 'light' ? (
        <Image src="/images/angorank-dark.svg" alt="Angorank" width={180} height={32} />
      ) : (
        <Image src="/images/angorank-light.svg" alt="Angorank" width={180} height={32} />
      )}
    </a>
  );
}

export default function TopNav({
  currency,
  currencies,
  isLoading,
}: {
  currency: string;
  currencies: string[];
  isLoading: boolean;
}) {
  return (
    <nav className="bg-white dark:bg-gray-900">
      <div className="px-4 mx-auto lg:max-w-screen-2xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <Logo />
            </div>
          </div>
          {isLoading && (
            <>
              <span className="sr-only">Loading data…</span>
              <ArrowPathIcon aria-hidden className="animate-spin h-5 w-5" />
            </>
          )}
          <div className="flex items-center justify-end gap-x-4 sm:gap-x-6">
            <CurrencySelector currencies={currencies} currency={currency} />
            <ThemeToggle />
            <GitHub />
          </div>
        </div>
      </div>
    </nav>
  );
}
