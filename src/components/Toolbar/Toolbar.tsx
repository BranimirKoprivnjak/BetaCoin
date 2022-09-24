import React from 'react';
import Select from '../UI/Select';
import MaterialIcon from '../UI/MaterialIcon';
import * as classes from './Toolbar.module.css';

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
      value: <MaterialIcon type="star" className={classes.starIcon} />,
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <MaterialIcon type="home" className={classes.homeIcon} />
        <h2 className={classes.title}>Dashboard</h2>
      </div>
      <div className={classes.right}>
        <div className={classes.searchWrapper}>
          <div className={classes.iconWrapper}>
            <MaterialIcon type="search" className={classes.searchIcon} />
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
