import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes.ts';
import { App } from '../App.tsx';
import { MainPage } from '../pages/MainPage/MainPage.tsx';
import { AboutPage } from '../pages/AboutPage/AboutPage.tsx';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage.tsx';
import { DetailedPetPage } from '../pages/DetailedPetPage/DetailedPetPage.tsx';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: ROUTES.ROOT,
        element: <MainPage />,
        children: [
          {
            path: ROUTES.PET_DETAILS,
            element: <DetailedPetPage />,
          },
        ],
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const getDetailedPetPagePath = (params: { petId: string }): string => {
  const { petId } = params;
  return ROUTES.PET_DETAILS.replace(':id', petId);
};
