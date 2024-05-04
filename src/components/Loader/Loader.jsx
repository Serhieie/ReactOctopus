import { ColorRing } from 'react-loader-spinner';

import style from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={style.wrapper}>
      <ColorRing
        visible={true}
        height="70"
        width="70"
        ariaLabel="color-ring-loading"
        wrapperStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  );
};

export default Loader;
