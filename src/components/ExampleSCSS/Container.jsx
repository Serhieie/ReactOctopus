import styles from './Container.scss';

export const Container = ({ children }) => {
  return <div className={`${styles.container}`}>{children}</div>;
};

export default Container;
