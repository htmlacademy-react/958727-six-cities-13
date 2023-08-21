import { memo } from 'react';
import Logo from '../shared/logo/logo';
import './footer-module.scss';

const Footer = memo((): JSX.Element => (
  <footer className="footer container">
    <Logo width={64} height={33} blockName='footer'/>
  </footer>
));

Footer.displayName = 'Footer';

export default Footer;
