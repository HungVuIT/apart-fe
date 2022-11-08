import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRouter, mainRouter } from '.';
import { DefaultLayout } from '../components/Layout';

function MainRouter (): JSX.Element {
  return (
    <Routes>
      {mainRouter.map((route, index) => {
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <DefaultLayout>
                <Page />
              </DefaultLayout>
            }
          />
        );
      })}
      {authRouter.map((route, index) => {
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Page />
            }
          />
        );
      })}
    </Routes>
  );
}

export default MainRouter;
