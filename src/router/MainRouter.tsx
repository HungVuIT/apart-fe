import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { adminRouter, authRouter, mainRouter, vendorRouter } from '.';
import { DefaultLayout } from '../components/Layout';
import DashboardLayout from '../components/Layout/DashboardLayout';

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
      {vendorRouter.map((route, index) => {
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
      {adminRouter.map((route, index) => {
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <DashboardLayout>
                <Page />
              </DashboardLayout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default MainRouter;
