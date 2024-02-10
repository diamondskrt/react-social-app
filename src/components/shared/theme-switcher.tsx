import { useTheme } from '@/components/shared/theme-provider';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const isLight = theme === 'light';


  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
    >
      <MoonIcon className="h-5 w-5 hidden dark:block" />
      <SunIcon className="h-5 w-5 block dark:hidden" />
    </Button>
  );
}