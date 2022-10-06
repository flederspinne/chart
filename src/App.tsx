import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Highcharts from 'highcharts';
import Dropdown from './components/Dropdown/Dropdown';
import Chart from './components/Chart/Chart';
import Loader from './components/Loader/Loader';

import {
  DEVICE_FILTER,
  DEVICE_LABEL,
  DEVICE_OPTIONS,
  FetchState,
} from './const';
import { toggle } from './app/deviceSlice';
import { fetchData } from './app/dataSlice';
import { RootState } from './app/store';

import './App.css';

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
        name: 'Рейтинг устройства',
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
    <div className="wrapper">
      <Dropdown
        name="device"
        options={DEVICE_OPTIONS}
        onChange={onChangeMemoized}
        value={deviceValue}
      />
      {(dataState === FetchState.PENDING ||
        dataState === FetchState.REJECTED) && (
        <div className="loaderWrapper">
          {dataState === FetchState.PENDING && <Loader />}
          {dataState === FetchState.REJECTED && 'Ошибка загрузки'}
        </div>
      )}
      {dataState === FetchState.FULFILLED && (
        <div className="chartWrapper">
          <Chart options={options} />
        </div>
      )}
    </div>
  );
}

export default App;
