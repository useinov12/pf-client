import React from 'react';

export const ThemeContext = React.createContext<{
  mode: 'dark' | 'light';
  setMode: React.Dispatch<any>;
}>({
  mode: 'dark',
  setMode: () => {},
});

const ThemeProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [mode, setMode] = React.useState<'dark' | 'light'>('dark');

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
};

export default ThemeProvider;
