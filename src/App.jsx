// import { Route, Routes } from 'react-router-dom';
// import Layout from 'components/Layout/Layout';
// import ErrorPage from 'pages/ErrorPage/ErrorPage';
import { Header } from './components/Header/Header';

const test = import.meta.env.VITE_API_TEST;

// const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));
// const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
// const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
// const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

function App() {
  console.log(test);
  return (
    <>
      <Header />
      <h1>Task Pro</h1>
      <h2>HELLO EVERYONE!</h2>
      <p>Some text</p>
    </>
    // <Routes>
    //   <Route path="/" element={<Layout />}>
    //     <Route path="/first" element={<WelcomePage />} />
    //     <Route path="/second" element={<RegisterPage />}>
    //       <Route path=":half" element={<LoginPage />} />
    //     </Route>
    //     <Route path="*" element={<ErrorPage />} />
    //   </Route>
    // </Routes>;
  );
}

export default App;
