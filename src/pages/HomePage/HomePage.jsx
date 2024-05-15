import { MainScreen } from '../../components/MainScreen/MainScreen';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

export const HomePage = ({ state }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <MainScreen state={state} />
    </>
  );
};
