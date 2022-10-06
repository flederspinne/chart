import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Highcharts from 'highcharts';
import Dropdown from './components/Dropdown/Dropdown';
import Chart from './components/Chart/Chart';

import {
  DEVICE_FILTER,
  DEVICE_LABEL,
  DEVICE_OPTIONS,
  FetchState,
} from './const';
import { toggle } from './app/deviceSlice';
import { fetchData } from './app/dataSlice';
import { RootState } from './app/store';

function App() {
  const deviceValue = useSelector((state: RootState) => state.device.value);
  const devices = useSelector((state: RootState) => state.data.products);
  const dataState = useSelector((state: RootState) => state.data.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchData());
  }, []);

  const devicesMemoized = useMemo(() => {
    let output: any[] = [];
    if (dataState === FetchState.FULFILLED) {
      output = devices?.filter(
        // @ts-ignore
        (device) => device.category === DEVICE_FILTER[deviceValue],
      );
    }
    return output;
  }, [devices, dataState, deviceValue]);

  const onChangeMemoized = useCallback(() => dispatch(toggle()), [dispatch]);

  const options: Highcharts.Options = {
    title: {
      text: DEVICE_LABEL[deviceValue],
    },
    series: [
      {
        name: 'Рейтинг устройств',
        type: 'column',
        data: devicesMemoized?.map((device: any) => device.rating),
      },
    ],
    xAxis: {
      categories: devicesMemoized?.map((device: any) => device.title),
    },
    yAxis: {
      title: {
        text: 'Рейтинг',
      },
    },
  };

  return (
    <div>
      <Dropdown
        name="device"
        options={DEVICE_OPTIONS}
        onChange={onChangeMemoized}
        value={deviceValue}
      />
      {dataState === FetchState.PENDING && 'lol'}
      {dataState === FetchState.FULFILLED && <Chart options={options} />}
      {dataState === FetchState.REJECTED && 'Ошибка загрузки'}
    </div>
  );
}

export default App;
