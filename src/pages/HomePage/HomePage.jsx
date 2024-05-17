import { MainScreen } from '../../components/MainScreen/MainScreen';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

export const HomePage = ({ active }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <MainScreen active={active} />
    </>
  );
};
