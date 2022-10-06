import React from 'react';
import { Device } from '../../const';

export interface IDropdownOption {
  value: Device;
  label: string;
}

export interface IDropdown {
  name: string;
  options: IDropdownOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {};
  value: Device;
}
