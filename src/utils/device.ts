import DeviceInfo from 'react-native-device-info';

// const deviceId = DeviceInfo.getUniqueId();

type DeviceInfo = {
  getVersion: Function;
  getUniqueId: Function;
  getDeviceId: Function;
  getBuildNumber: Function;
  getDeviceToken: Function;
};

const Device: DeviceInfo = {
  getVersion: () => {
    return DeviceInfo.getVersion();
  },
  getUniqueId: async () => {
    return await DeviceInfo.getUniqueId();
  },

  getDeviceId: () => {
    return DeviceInfo.getDeviceId();
  },
  getBuildNumber: () => {
    return DeviceInfo.getBuildNumber();
  },
  getDeviceToken: () => {
    return DeviceInfo.getDeviceToken();
  },
};

export default Device;
