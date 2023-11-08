import {lazy, Suspense} from 'react';
import {Outlet, Navigate, useRoutes} from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import {PrivateRoute} from "src/common/guards/AuthGuard";

export const IndexPage = lazy(() => import('src/pages/app'));
export const StudentPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const CoursePage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <PrivateRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet/>
            </Suspense>
          </DashboardLayout>
        </PrivateRoute>
      ),
      children: [
        {element: <IndexPage/>, index: true},
        {path: 'users', element: <UserPage/>},
        {path: 'courses', element: <CoursePage/>},
        {path: 'students', element: <StudentPage/>},
      ],
    },
    {
      path: 'login',
      element: <LoginPage/>,
    },
    {
      path: '404',
      element: <Page404/>,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace/>,
    },
  ]);

  return routes;
}
