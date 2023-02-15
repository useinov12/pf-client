import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export const ThemeContext = createContext<{
  mode: 'dark' | 'light';
  setMode: Dispatch<SetStateAction<'dark' | 'light'>>;
}>({
  mode: 'dark',
  setMode: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'dark' | 'light'>('dark');

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
