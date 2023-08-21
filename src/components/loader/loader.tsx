import cn from 'classnames';
import './loader.scss';
import { memo } from 'react';

interface LoaderProps {
    className?: string;
}

export const Loader = memo(({ className = '' }: LoaderProps) => (
  <div className={'spinner-wrapper'}>
    <div className={'loader-spinner'}>
      <div className={cn('lds-ellipsis', [className])}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>

));

Loader.displayName = 'Loader';
