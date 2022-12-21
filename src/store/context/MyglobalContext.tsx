import React from 'react';
import { ContextProviderProps, GlobalContext } from '../../interface/globalType';
import { initGlobalContext } from '../../interface/initConst';

export const MyGlobalContext = React.createContext<GlobalContext>(initGlobalContext);
export const GlobalContextWrapper = ({ children }: ContextProviderProps) => {
  const valueContext = {
    loading: false
  };
  return <MyGlobalContext.Provider value = {valueContext}>
    {children}
  </MyGlobalContext.Provider>;
};
