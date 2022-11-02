import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { publishRoutes } from '.';
import { DefaultLayout } from '../components/Layout';

function PublishRoutes (): JSX.Element {
  return (
    <Routes>
      {publishRoutes.map((route, index) => {
        const Layout = DefaultLayout;
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
      {/* <Route
        path="*"
        element={<Navigate to="/" replace />}
      /> */}
    </Routes>
  );
}

export default PublishRoutes;
