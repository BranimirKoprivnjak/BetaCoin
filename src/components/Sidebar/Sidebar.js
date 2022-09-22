import { useState } from 'react';
import Card from '../UI/Card';
import MaterialIcon from '../UI/MaterialIcon';
import classes from './Sidebar.module.css';

const upperIcons = [
  'home',
  'bar_chart',
  'account_balance_wallet',
  'history',
  'explore',
];

const Sidebar = () => {
  const [selected, setSelected] = useState('home');

  return (
    <Card class={classes.container}>
      <div className={classes['title-wrapper']}>
        <h2 className={classes.title}>
          BETA<span>COIN</span>
        </h2>
      </div>
      <div className={classes['icons-wrapper']}>
        <div className={classes.icons}>
          {upperIcons.map(icon => (
            <MaterialIcon
              key={icon}
              type={icon}
              class={`${classes.icon} ${
                selected === icon ? classes.selected : ''
              }`}
              click={() => setSelected(icon)}
            />
          ))}
        </div>
        <div className={classes.icons}>
          <MaterialIcon type="settings" class={classes.icon} />
          <MaterialIcon type="power_settings_new" class={classes.icon} />
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
