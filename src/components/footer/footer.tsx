import Logo from '../shared/logo/logo';
import './footer-module.scss';

function Footer(): JSX.Element {

  return (
    <footer className="footer container">
      <Logo width={64} height={33} blockName='footer'/>
    </footer>
  );
}

export default Footer;
