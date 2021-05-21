import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import useMounted from 'hooks/useMounted';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { mounted } = useMounted();
  const { theme, setTheme } = useTheme();

  return !mounted ? null : (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? (
        <MoonIcon className="flex-0 w-5 h-5 hover:text-yellow-500 focus:text-yellow-500" />
      ) : (
        <SunIcon className="flex-0 w-5 h-5 hover:text-yellow-300 focus:text-yellow-300" />
      )}
    </button>
  );
}
