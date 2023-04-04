import Layout from 'antd/es/layout/layout';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { adminRouter, authRouter, mainRouter, userRouter, vendorRouter } from '.';
import { DefaultLayout, VendorLayout } from '../components/Layout';
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
      {vendorRouter.map((route, index) => {
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              route.Layout ? <VendorLayout><Page /></VendorLayout> : <Page />
            }
          />
        );
      })}
      {userRouter.map((route, index) => {
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              route.Layout ? <DefaultLayout><Page /></DefaultLayout> : <Page />
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
