 import { Route, Routes } from 'react-router-dom';
// import Layout from 'components/Layout/Layout';
// import ErrorPage from 'pages/ErrorPage/ErrorPage';

import WelcomePage from './pages/WelcomePage/WelcomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import ScreenPage from './pages/ScreenPage/ScreenPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const test = import.meta.env.VITE_API_TEST;

// const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));
// const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
// const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
// const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

function App() {
 
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth/:id" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:boardName" element={<ScreenPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
   
    // <Routes>
    //   <Route path="/" element={<Layout />}>
    //     <Route path="/first" element={<WelcomePage />} />
    //     <Route path="/second" element={<RegisterPage />}>
    //       <Route path=":half" element={<LoginPage />} />
    //     </Route>
    //     <Route path="*" element={<ErrorPage />} />
    //   </Route>
    // </Routes>;
 
export default App;
