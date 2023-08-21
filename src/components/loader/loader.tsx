import cn from 'classnames';
import './loader.scss';

interface LoaderProps {
    className?: string;
}

function Loader({ className = '' }: LoaderProps) {
  return(
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

}

export default Loader;
