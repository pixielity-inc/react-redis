import { FC, useState, useCallback } from 'react';

import { SunFilledIcon, MoonFilledIcon } from '@/components/icons';

export interface ThemeSwitchProps {
  className?: string;
}

function getInitialTheme(): 'light' | 'dark' {
  return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, [theme]);

  return (
    <button
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className={`px-px transition-opacity hover:opacity-80 cursor-pointer bg-transparent border-none ${className || ''}`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? <MoonFilledIcon size={22} /> : <SunFilledIcon size={22} />}
    </button>
  );
};
