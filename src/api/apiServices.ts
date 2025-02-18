import axios, {AxiosInstance} from 'axios';
import {Platform} from 'react-native';
import {navigationRef} from '../utils/navigationService';
import screens from '../utils/screens';
import Device from '../utils/device';
import store from '../redux/store';
import {showErrorToast, showSuccessToast} from '../components/toast';

const NG_ROK = 'https://api.vedicon.in';

const $http: AxiosInstance = axios.create({
  baseURL: NG_ROK,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    timeZone: new Date().getTimezoneOffset(),
    appVersion: Device?.getVersion(),
  },
});

const devicedetail = {
  platform: Platform.OS === 'android' ? 0 : 1,
};

$http.interceptors.request.use(async (config: any) => {
  console.log('config from the api', config);
  // if (config.headers) {
  //   const getState = store?.getState();
  //   if (getState) {
  //     config.headers['platform'] = devicedetail?.platform;
  //     config.headers['deviceid'] = await Device?.getUniqueId();
  //     return config;
  //   }
  //   return config;
  // }
  return config;
});

/**
 * check error message from response and show message according to screen
 */
$http.interceptors.response.use(
  config => config,
  (error: any) => {
    console.log('errorvfdverbeb te', error);
    //   if (
    //     error?.message?.includes('403') ||
    //     error?.message?.includes('401') || //Session expire
    //     error?.message?.includes('498') ||
    //     error?.message?.includes('402') ||
    //     error?.message?.includes('503') ||
    //     error?.message?.includes('Network Error')
    //   ) {
    //     const route = navigationRef?.current?.getCurrentRoute()?.name;
    //     if (route !== screens.LOGIN && route !== screens.REGISTRATION) {
    //       handleApiError(error.message);
    //     } else {
    //       if (
    //         !error?.message?.includes('401') &&
    //         !error?.message?.includes('498')
    //       ) {
    //         showErrorToast(error?.response?.data?.message);
    //       }
    //     }
    //   } else {
    //     throw new Error(error?.response?.data?.message || 'Something went wrong');
    //   }

    //   throw new Error(error?.response?.data?.message);
  },
);

/**
 * navigate to session expiry screen if error occurs
 */
const handleApiError = (errorMessage: string) => {
  // console.log('errorMessage', )
  if (errorMessage.includes('402')) {
    // navigationRef?.current?.navigate(SCREENS.SUBSCRIPTION);
  } else if (errorMessage?.includes('Network Error')) {
    // navigationRef?.current?.navigate(SCREENS.LOGIN);
    showSuccessToast(errorMessage); //TO DO
  } else {
    // navigationRef?.current?.navigate(SCREENS.SessionExpiry, errorMessage);
  }
};

export {$http, handleApiError};
