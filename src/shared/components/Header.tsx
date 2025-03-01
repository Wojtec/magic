import { FC, ReactNode } from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5;
}

export const Header: FC<HeaderProps> = ({ children, level = 1 }) => {
  const renderHeader = () => {
    switch (level) {
      case 1:
        return <h1>{children}</h1>;
      case 2:
        return <h2>{children}</h2>;
      case 3:
        return <h3>{children}</h3>;
      case 4:
        return <h4>{children}</h4>;
      case 5:
        return <h5>{children}</h5>;
      default:
        return <h1>{children}</h1>;
    }
  };

  return <div className={styles.header}>{renderHeader()}</div>;
};
