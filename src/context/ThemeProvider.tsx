import { useContext, createContext, ReactNode, useState } from 'react';

export const ThemeContext = createContext<{
  mode: 'dark' | 'light';
  setMode: React.Dispatch<any>;
}>({
  mode: 'dark',
  setMode: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'dark' | 'light'>('light');

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
