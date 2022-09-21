import { useState } from 'react';
import MaterialIcon from './MaterialIcon';
import classes from './Select.module.css';

// wrap in useMemo -> seems fine
const Select = props => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.options[0].value);

  const toggleOptions = () => {
    setIsOptionsOpen(isOpen => !isOpen);
  };

  const setSelectedAndClose = option => {
    props.onOptionChange(option.name);
    setIsOptionsOpen(false);
    setSelectedOption(option.value);
  };

  return (
    <div className={classes.container}>
      <button className={classes.button} onClick={toggleOptions}>
        <div className={classes.selected}>{selectedOption}</div>
        <MaterialIcon
          type="arrow_drop_down"
          class={`${classes.icon} ${isOptionsOpen ? classes.up : classes.down}`}
        />
      </button>
      <ul className={`${classes.options} ${isOptionsOpen ? classes.show : ''}`}>
        {props.options.map(option => (
          <li
            onClick={() => {
              setSelectedAndClose(option);
            }}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
