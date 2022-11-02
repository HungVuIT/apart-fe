import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes } from '.';

function PrivateRoutes (): JSX.Element {
  return (
    <Routes>
      {privateRoutes.map((route, index) => {
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
      {/* <Route
        path="*"
        element={<Navigate to="/auth/login" replace />}
      /> */}
    </Routes>
  );
}

export default PrivateRoutes;
