import { useState } from 'react';
import MaterialIcon from '../UI/MaterialIcon';
import classes from './Header.module.css';

const icons = ['notifications', 'chat', 'dashboard', 'person'];

const Header = () => {
  const [selected, setSelected] = useState('dashboard');

  return (
    <div className={classes.header}>
      {icons.map(icon => (
        <MaterialIcon
          key={icon}
          type={icon}
          className={`${classes.icon} ${
            selected === icon ? classes.selected : ''
          }`}
          onClick={() => setSelected(icon)}
        />
      ))}
    </div>
  );
};

export default Header;
