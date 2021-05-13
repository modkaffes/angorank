import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
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
      <Image src="/images/angorank-dark.svg" alt="Angorank" width={180} height={32} />
    </div>
  );
}
