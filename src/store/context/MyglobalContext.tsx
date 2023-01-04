import React from 'react';
import { ContextProviderProps, GlobalContext } from '../../interface/globalType';
import { initGlobalContext } from '../../interface/initConst';

export const MyGlobalContext = React.createContext<GlobalContext>(initGlobalContext);
export const GlobalContextWrapper = ({ children }: ContextProviderProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [nowUrl, setNowUrl] = React.useState('');
  const valueContext = {
    isLoading,
    setIsLoading,
    nowUrl,
    setNowUrl
  };
  return <MyGlobalContext.Provider value={valueContext}>
    {children}
  </MyGlobalContext.Provider>;
};
