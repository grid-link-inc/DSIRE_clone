import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

const Programs = Loadable(lazy(() => import('pages/programs')));
const ProgramDetails = Loadable(lazy(() => import('pages/program-details')));

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
      path: 'programs/:id',
      element: <ProgramDetails />
    }
  ]
};

export default MainRoutes;
