import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';

// import ErrorPage from 'pages/ErrorPage/ErrorPage';

// import WelcomePage from './pages/WelcomePage/WelcomePage';
import AuthPage from './pages/AuthPage/AuthPage';
//import ScreenPage from './pages/ScreenPage/ScreenPage';
//import HomePage from './pages/HomePage/HomePage';
//import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

//import SharedLayout from './components/SharedLayout/SharedLayout';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
import { useDispatch } from 'react-redux';
import { current } from './redux/auth/authOperations';

const test = import.meta.env.VITE_API_TEST;

const WelcomePageLazy = lazy(() => import('./pages/WelcomePage/WelcomePage'));
//const AuthPageLazy = lazy(() => import('./pages/AuthPage/AuthPage'));
const HomePageLazy = lazy(() => import('./pages/HomePage/HomePage'));
const ScreenPageLazy = lazy(() => import('./pages/ScreenPage/ScreenPage'));
const NotFoundPageLazy = lazy(() =>
  import('./pages/NotFoundPage/NotFoundPage')
);
const SharedLayoutLazy = lazy(() =>
  import('./components/SharedLayout/SharedLayout')
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePageLazy />} />
        {/* <Route path="/auth/:id" element={<AuthPage />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="home" element={<SharedLayoutLazy />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/auth/:id" element={<AuthPage />} />
        </Route>

        {/* element={<AuthPageLazy />}  не використовувала тут, бо в цьому випадку через lazy завантаження не встигає завантажитись сторінка з компонентами */}

        {/* <Route path="/auth/:id" element={<PublicRoute />} />  замінити попередній рядок*/}

        {/* <Route path="/home" element={<SharedLayoutLazy />}> */}
        {/* <PrivateRoute path="/home" element={<SharedLayoutLazy /> замість Route огорнути в PrivateRoute */}
        {/* <Route index element={<HomePageLazy />} /> */}
        {/* <Route path=":boardName" element={<ScreenPageLazy />} /> */}
        {/* </Route> */}

        <Route path="*" element={<NotFoundPageLazy />} />
      </Routes>
    </div>
  );
}

export default App;

//Routes without SharedLayout
//<div>
//      <Routes>
//       <Route path="/" element={<WelcomePage />} />
//       <Route path="/auth/:id" element={<AuthPage />} />
//       <Route path="/home" element={<HomePage />} />
//       <Route path="/home/:boardName" element={<ScreenPage />} />
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
// </div>
