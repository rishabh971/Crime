import axios, { AxiosInstance } from 'axios';
// import Device from './device';
import { Platform } from 'react-native';
import { navigationRef } from '../utils/navigationService';
import screens from '../utils/screens';
import Device from '../utils/device';
// import Config from 'react-native-config';
// import { showErrorToast, showSuccessToast } from '@maxxx/components/toast';
// import { base64Credentials } from '@maxxx/utils/commonFunction';

// const NG_ROK = 'https://wombat-poetic-hookworm.ngrok-free.app';

const $http: AxiosInstance = axios.create({
  baseURL: '',
  // baseURL: NG_ROK,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    // basic: `Basic ${base64Credentials}`,
    timeZone: new Date().getTimezoneOffset(),
    // basic: `Basic aXNwb3J0c3N0ZzpNYXh4X3N0Z0AxMjM=`,
    appVersion: Device?.getVersion(),
  },
});

// console.log('device', Device?.getVersion())

const devicedetail = {
  platform: Platform.OS === 'android' ? 0 : 1,
};

$http.interceptors.request.use(async (config: any) => {
  if (config.headers) {
    const getState = store?.getState();
    if (getState) {
      config.headers['platform'] = devicedetail?.platform;
      config.headers['deviceid'] = await Device?.getUniqueId();
      return config;
    }
    return config;
  }
  return config;
});

/**
 * check error message from response and show message according to screen
 */
$http.interceptors.response.use(
  config => config,
  (error: any) => {
    console.log('errorvfdverbeb te', error);
    if (
      error?.message?.includes('403') ||
      error?.message?.includes('401') || //Session expire
      error?.message?.includes('498') ||
      error?.message?.includes('402') ||
      error?.message?.includes('503') ||
      error?.message?.includes('Network Error')
    ) {
      const route = navigationRef?.current?.getCurrentRoute()?.name;
      if (
        route !== screens.LOGIN &&
        route !== screens.REGISTRATION
      ) {
        handleApiError(error.message);
      } else {
        if (
          !error?.message?.includes('401') &&
          !error?.message?.includes('498')
        )
          // showErrorToast(error?.response?.data?.message);
      }
    } else {
      throw new Error(error?.response?.data?.message || 'Something went wrong');
    }

    throw new Error(error?.response?.data?.message);
  },
);

/**
 * navigate to session expiry screen if error occurs
 */
const handleApiError = (errorMessage: string) => {
  if (errorMessage.includes('402')) {
    // navigationRef?.current?.navigate(SCREENS.SUBSCRIPTION);
  } else if (errorMessage?.includes('Network Error')) {
    // navigationRef?.current?.navigate(SCREENS.LOGIN);
    // showSuccessToast(errorMessage); //TO DO
  } else {
    // navigationRef?.current?.navigate(SCREENS.SessionExpiry, errorMessage);
  }
};

export { $http, handleApiError };
