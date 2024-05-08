import { useEffect } from 'react';
import Welcome from '../../components/Welcome/Welcome';
import { ping } from '../../redux/api/api';

const WelcomePage = () => {
  const wakeUp = async () => {
    await ping();
  };

  useEffect(() => {
    wakeUp();
  }, []);

  return (
    <div
      style={{
        background:
          'linear-gradient(180.00deg, rgba(196, 196, 196, 0) 25%, rgb(190, 219, 176) 92.19%)',
      }}
    >
      <Welcome />
    </div>
  );
};

export default WelcomePage;
