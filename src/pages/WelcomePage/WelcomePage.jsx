import React from 'react';

import Welcome from '../../components/Welcome/Welcome';
import NewBoard from '../../components/popUps/Board/NewBoard';

const WelcomePage = () => {
  return (
    <div>
      <Welcome />
      <NewBoard name={'Add Board'} />
    </div>
  );
};

export default WelcomePage;
