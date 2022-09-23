import { useState } from 'react';
import MaterialIcon from './MaterialIcon';
import classes from './Select.module.css';

type Option = {
  name: string;
  value: JSX.Element | string;
};

const Select = ({
  options,
  onOptionChange,
}: {
  options: Option[];
  onOptionChange?: (view: string) => void;
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const toggleOptions = () => {
    setIsOptionsOpen(isOpen => !isOpen);
  };

  const setSelectedAndClose = (option: Option) => {
    onOptionChange && onOptionChange(option.name);
    setIsOptionsOpen(false);
    setSelectedOption(option.value);
  };

  return (
    <div className={classes.container}>
      <button className={classes.button} onClick={toggleOptions}>
        <div className={classes.selected}>{selectedOption}</div>
        <MaterialIcon
          type="arrow_drop_down"
          className={`${classes.icon} ${
            isOptionsOpen ? classes.up : classes.down
          }`}
        />
      </button>
      <ul className={`${classes.options} ${isOptionsOpen ? classes.show : ''}`}>
        {options.map((option: Option) => (
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
