import { MainScreen } from '../../components/MainScreen/MainScreen';
import { HomePageSkelleton } from '../../components/Skelletons/HomePageSkelleton';
import { useAuth } from '../../hooks';

const HomePage = () => {
  const { isLoading } = useAuth();
  return isLoading ? <HomePageSkelleton /> : <MainScreen />;
};

export default HomePage;
