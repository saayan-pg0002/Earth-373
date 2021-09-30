import { Icon, IconNames, IconColors } from '../components/Icon';
import urlFor from '../util/routes/urlFor';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <nav className='nav'>
      <Link to={urlFor('dashboard')}>Home</Link>
      <Link to={urlFor('mentees')}>Mentees</Link>
      <Icon name={IconNames.home} color={IconColors.baytreeNavy} />
    </nav>
  );
};

export default Nav;
