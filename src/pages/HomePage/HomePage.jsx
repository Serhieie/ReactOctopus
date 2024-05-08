import { MainScreen } from '../../components/MainScreen/MainScreen';
import { Modals } from '../../components/popUps/Modals';

const HomePage = ({ state }) => {
  return (
    <>
      <MainScreen state={state} />
      <Modals />
    </>
  );
};

export default HomePage;
