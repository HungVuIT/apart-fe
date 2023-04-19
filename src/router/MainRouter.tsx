import Layout from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { adminRouter, authRouter, mainRouter, userRouter, vendorRouter } from '.';
import { DefaultLayout, VendorLayout } from '../components/Layout';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { getAccessToken } from '../untils/localStorage';

function MainRouter (): JSX.Element {
  const [token, setToken] = useState(getAccessToken());
  useEffect(() => {
    setToken(getAccessToken);
  }, [getAccessToken()]);
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
        const isLoggedIn = Boolean(token); // Check if token exists
        return (
          <Route
            key={index}
            path={route.path}
            element={
              // If Layout is defined, wrap the page component with it
              route.Layout
                ? (
                <VendorLayout>
                  {isLoggedIn
                    ? <Page />
                    : (
                        <Navigate to="/" replace /> // Redirect to home if not logged in
                      )}
                    </VendorLayout>
                  )
                : (
              // Otherwise, render the page component directly
                    isLoggedIn
                      ? <Page />
                      : (
                      <Navigate to="/" replace /> // Redirect to home if not logged in
                        )
                  )
            }
          />
        );
      })}
      {userRouter.map((route, index) => {
        const Page = route.component;
        const isLoggedIn = Boolean(token); // Check if token exists
        return (
          <Route
            key={index}
            path={route.path}
            element={
              // If Layout is defined, wrap the page component with it
              route.Layout
                ? (
                <DefaultLayout>
                  {isLoggedIn
                    ? <Page />
                    : (
                        <Navigate to="/" replace /> // Redirect to home if not logged in
                      )}
                    </DefaultLayout>
                  )
                : (
              // Otherwise, render the page component directly
                    isLoggedIn
                      ? <Page />
                      : (
                      <Navigate to="/" replace /> // Redirect to home if not logged in
                        )
                  )
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
        const isLoggedIn = Boolean(token); // Check if token exists
        return (
          <Route
            key={index}
            path={route.path}
            element={
                <>
                  {
                    isLoggedIn
                      ? <Navigate to="/" replace />
                      : <Page />
                  }
                </>
            }
          />
        );
      })}
    </Routes>
  );
}

export default MainRouter;
