import { MemoizedLogo } from '../shared/logo/memoized-logo';
import './footer-module.scss';

function Footer(): JSX.Element {

  return (
    <footer className="footer container">
      <MemoizedLogo width={64} height={33} blockName='footer'/>
    </footer>
  );
}

export default Footer;
