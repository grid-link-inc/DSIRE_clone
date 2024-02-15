import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

const Programs = Loadable(lazy(() => import('pages/programs')));
const ProgramDetails = Loadable(lazy(() => import('pages/program-details')));
const About = Loadable(lazy(() => import('pages/about')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Programs />
    },
    {
      path: '/programs',
      element: <Programs />
    },
    {
      path: '/programs/:id',
      element: <ProgramDetails />
    },
    {
      path: '/about',
      element: <About />
    }
  ]
};

export default MainRoutes;
