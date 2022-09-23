import Select from '../UI/Select';
import classes from './Toolbar.module.css';
import MaterialIcon from '../UI/MaterialIcon';
import React from 'react';

const Toolbar = ({
  setSearchQuery,
  dashboardViewHandler,
}: {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  dashboardViewHandler: (view: string) => void;
}) => {
  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
  };

  const selectOptions = [
    { name: 'all', value: 'All' },
    {
      name: 'portfolio',
      value: <MaterialIcon type="star" className={classes['star-icon']} />,
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <MaterialIcon type="home" className={classes['home-icon']} />
        <h2 className={classes.title}>Dashboard</h2>
      </div>
      <div className={classes.right}>
        <div className={classes['search-wrapper']}>
          <div className={classes['icon-wrapper']}>
            <MaterialIcon type="search" className={classes['search-icon']} />
          </div>
          <input
            type="text"
            placeholder="Search ..."
            className={classes.input}
            onChange={searchChangeHandler}
          />
        </div>
        <Select options={selectOptions} onOptionChange={dashboardViewHandler} />
      </div>
    </div>
  );
};

export default Toolbar;
