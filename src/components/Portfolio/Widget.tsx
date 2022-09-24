import Card from '../UI/Card';
import MaterialIcon from '../UI/MaterialIcon';
import * as classes from './Widget.module.css';

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
      <div className={classes.iconContainer}>
        <div className={classes.iconWrapper}>
          <MaterialIcon type={icon} className={classes.icon} />
        </div>
      </div>
      <div>{children}</div>
    </Card>
  );
};

export default Widget;
