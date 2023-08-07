import cn from 'classnames';
import './loader.scss';

interface LoaderProps {
    className?: string;
}

export const Loader = ({ className = '' }: LoaderProps) => (
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

);
