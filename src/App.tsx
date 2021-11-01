import Layout from 'components/Layout';
import Preloader from 'components/Preloader';
import routes from 'config/routes';
import utils from 'config/utils';
import React, { lazy } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import './styles/tailwind.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = lazy(() => import('./pages/Login/Login'));

const App = () => (
  <>
    <ToastContainer />
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          exact
          render={() => {
            if (utils.getToken()) {
              return <Redirect to="/" />;
            }
            return (
              <React.Suspense fallback={<Preloader />}>
                <Login />
              </React.Suspense>
            );
          }}
        />
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            render={() => {
              if (utils.getToken()) {
                document.title = `${route.title} | ChitChat`;
                return (
                  <React.Suspense fallback={<Preloader />}>
                    <route.component />
                  </React.Suspense>
                );
              }
              return <Redirect to="/login" />;
            }}
          />
        ))}
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
