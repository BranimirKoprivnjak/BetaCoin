import Card from '../UI/Card';
import MaterialIcon from '../UI/MaterialIcon';
import classes from './Widget.module.css';

const Widget = ({
  spacing,
  icon,
  children,
}: {
  spacing?: boolean;
  icon: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className={`${classes.container} ${spacing ? classes.spacing : ''}`}>
      <div className={classes['icon-container']}>
        <div className={classes['icon-wrapper']}>
          <MaterialIcon type={icon} className={classes.icon} />
        </div>
      </div>
      <div className={classes.stats}>{children}</div>
    </Card>
  );
};

export default Widget;
