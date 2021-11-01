import { lazy } from 'react';

interface Routes {
  title: string;
  path: string;
  component: React.LazyExoticComponent<React.NamedExoticComponent>;
  exact: boolean;
}

const routes: Routes[] = [
  {
    title: 'Home',
    path: '/',
    component: lazy(() => import('pages/Home/Home')),
    exact: true,
  },
  {
    title: 'Room',
    path: '/room/:id',
    component: lazy(() => import('pages/ChatRoom/ChatRoom')),
    exact: true,
  },
];

export default routes;
