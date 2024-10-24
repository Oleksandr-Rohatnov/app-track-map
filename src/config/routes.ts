import { JSX } from 'react';
import Main from '../pages/Main';
import Login from '../pages/Login';

export type RouteT = {
  id: number;
  path: string;
  element: () => JSX.Element;
  isLayoutEnabled: boolean;
};

export const routes: RouteT[] = [
  {
    id: 1,
    path: '/',
    element: Main,
    isLayoutEnabled: true
  },
  {
    id: 2,
    path: '/login',
    element: Login,
    isLayoutEnabled: false
  }
];

export default routes;
