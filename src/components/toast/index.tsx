import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const showErrorToast = (message: string) => {
  Toast.show({
    text1: 'Error',
    text2: message,
    position: 'top',
    type: 'error',
    visibilityTime: 3000,
  });
};

export const showSuccessToast = (message: string) => {
  Toast.show({
    text1: 'Success',
    text2: message,
    position: 'top',
    type: 'success',
    visibilityTime: 2000,
  });
};
