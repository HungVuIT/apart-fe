import React from 'react';
import { ContextProviderProps, GlobalContext } from '../../interface/globalType';
import { initGlobalContext } from '../../interface/initConst';

export const MyGlobalContext = React.createContext<GlobalContext>(initGlobalContext);
export const GlobalContextWrapper = ({ children }: ContextProviderProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpenLogin, setIsOpenLogin] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [nowUrl, setNowUrl] = React.useState('');
  const valueContext = {
    isLoading,
    setIsLoading,
    nowUrl,
    setNowUrl,
    loading,
    setLoading,
    isLogin,
    setIsLogin,
    isOpenLogin,
    setIsOpenLogin
  };
  return <MyGlobalContext.Provider value={valueContext}>
    {children}
  </MyGlobalContext.Provider>;
};
