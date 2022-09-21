import Select from '../UI/Select';
import classes from './Toolbar.module.css';
import MaterialIcon from '../UI/MaterialIcon';

const Toolbar = props => {
  const searchChangeHandler = event => {
    const searchQuery = event.target.value;
    props.setSearchQuery(searchQuery);
  };

  const selectOptions = [
    { name: 'all', value: 'All' },
    {
      name: 'portfolio',
      value: <MaterialIcon type="star" class={classes['star-icon']} />,
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <MaterialIcon type="home" class={classes['home-icon']} />
        <h2 className={classes.title}>Dashboard</h2>
      </div>
      <div className={classes.right}>
        <div className={classes['search-wrapper']}>
          <div className={classes['icon-wrapper']}>
            <MaterialIcon type="search" class={classes['search-icon']} />
          </div>
          <input
            type="text"
            placeholder="Search ..."
            className={classes.input}
            onChange={searchChangeHandler}
          />
        </div>
        <Select
          options={selectOptions}
          onOptionChange={props.dashboardViewHandler}
        />
      </div>
    </div>
  );
};

export default Toolbar;
