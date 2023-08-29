import { PropsWithChildren, ReactNode } from 'react';
import Header from '../header/header';
import cn from 'classnames';

type LayoutProps = PropsWithChildren<{
  className?: string;
}>

function Layout({className, children}: LayoutProps): ReactNode {
  const classes = className ? cn('page', {[className]: !!className}) : 'page';
  return (
    <div className={classes}>
      <Header/>
      {children}
    </div>
  );
}

export default Layout;
