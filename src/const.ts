export enum Device {
  'PHONE',
  'LAPTOP',
}

export enum FetchState {
  'IDLE',
  'PENDING',
  'FULFILLED',
  'REJECTED',
}

export const DEVICE_LABEL = {
  [Device.PHONE]: 'Телефон',
  [Device.LAPTOP]: 'Ноутбук',
};

export const DEVICE_FILTER = {
  [Device.PHONE]: 'smartphones',
  [Device.LAPTOP]: 'laptops',
};

export const DEVICE_OPTIONS = [
  {
    value: Device.PHONE,
    label: DEVICE_LABEL[Device.PHONE],
  },
  {
    value: Device.LAPTOP,
    label: DEVICE_LABEL[Device.LAPTOP],
  },
];
