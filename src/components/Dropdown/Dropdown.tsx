import React from 'react';
import { IDropdown } from './interfaces';

function Dropdown({ name, options, onChange, value }: IDropdown) {
  return (
    <select name={name} onChange={onChange} value={value}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
