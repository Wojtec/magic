import { FC, ReactNode } from 'react';
import style from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={style.layout}>
      <header className={style.header}>
        <h1 className={style.title}>Magic The Gathering Collections</h1>
      </header>
      <main className={style.main}>{children}</main>
    </div>
  );
};
