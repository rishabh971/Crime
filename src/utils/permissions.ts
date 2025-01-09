// import { Alert, Linking, Platform } from 'react-native';
// import {
//   request,
//   PERMISSIONS,
//   checkMultiple,
//   requestMultiple,
// } from 'react-native-permissions';

// const requestpermissions: any = (successCallback: Function) => {
//   checkMultiple(
//     Platform.OS === 'android'
//       ? [
//           PERMISSIONS.ANDROID.CAMERA,
//           PERMISSIONS.ANDROID.RECORD_AUDIO,
//           Platform.Version < 33
//             ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
//             : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
//         ]
//       : [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY],
//   )
//     .then(result => {
//       console.log('permission resulrt', result);
//       if (Platform.OS === 'android') {
//         if (
//           result['android.permission.CAMERA'] === 'unavailable' ||
//           result['android.permission.RECORD_AUDIO'] === 'unavailable' ||
//           Platform.Version < 33
//             ? result['android.permission.READ_EXTERNAL_STORAGE'] ===
//               'unavailable'
//             : result['android.permission.READ_MEDIA_IMAGES'] === 'unavailable'
//         ) {
//           Alert.alert('feature not available');
//         }
//         if (
//           result['android.permission.CAMERA'] === 'denied' &&
//           result['android.permission.RECORD_AUDIO'] === 'denied' &&
//           Platform.Version < 33
//             ? result['android.permission.READ_EXTERNAL_STORAGE'] === 'denied'
//             : result['android.permission.READ_MEDIA_IMAGES'] === 'denied'
//         ) {
//           console.log('denied', result);
//           requestMultiple([
//             PERMISSIONS.ANDROID.CAMERA,
//             PERMISSIONS.ANDROID.RECORD_AUDIO,
//             Platform.Version < 33
//               ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
//               : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
//           ]);
//         }
//         if (
//           result['android.permission.CAMERA'] === 'blocked' &&
//           result['android.permission.RECORD_AUDIO'] === 'blocked' &&
//           Platform.Version < 33
//             ? result['android.permission.READ_EXTERNAL_STORAGE'] === 'blocked'
//             : result['android.permission.READ_MEDIA_IMAGES'] === 'blocked'
//         ) {
//           requestMultiple([
//             PERMISSIONS.ANDROID.CAMERA,
//             PERMISSIONS.ANDROID.RECORD_AUDIO,
//             Platform.Version < 33
//               ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
//               : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
//           ]);
//         }
//         if (
//           result['android.permission.CAMERA'] === 'denied' ||
//           result['android.permission.CAMERA'] === 'blocked'
//         ) {
//           request(PERMISSIONS.ANDROID.CAMERA).then(res => {
//             switch (res) {
//               case 'granted':
//                 successCallback(true);
//                 break;
//               case 'denied':
//                 request(PERMISSIONS.ANDROID.CAMERA);
//               case 'blocked':
//                 Alert.alert(
//                   'camera permission',
//                   'Camera permission is blocked in the device ' +
//                     'settings. Allow the app to access camera',
//                   [
//                     {
//                       text: 'Cancel',
//                       onPress: () => null,
//                       style: 'cancel',
//                     },
//                     {
//                       text: 'Setting',
//                       onPress: () => Linking.openSettings(),
//                     },
//                   ],
//                 );
//                 break;
//               default:
//                 break;
//             }
//           });
//         }
//         if (Platform.Version < 33) {
//           if (
//             result['android.permission.READ_EXTERNAL_STORAGE'] === 'denied' ||
//             result['android.permission.READ_EXTERNAL_STORAGE'] === 'blocked'
//           ) {
//             request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(res => {
//               switch (res) {
//                 case 'granted':
//                   break;
//                 case 'denied':
//                   request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
//                 case 'blocked':
//                   Alert.alert(
//                     'Gallery Permission blocked!',
//                     'Gallery permission is blocked in the device ' +
//                       'settings. Do you want to allow the app to access Gallery to help you upload your image ',
//                     [
//                       {
//                         text: 'Cancel',
//                         onPress: () => null,
//                         style: 'cancel',
//                       },
//                       {
//                         text: 'Setting',
//                         onPress: () => Linking.openSettings(),
//                       },
//                     ],
//                   );
//                   break;
//                 default:
//                   break;
//               }
//             });
//           }
//         }
//         if (Platform.Version >= 33) {
//           if (
//             result['android.permission.READ_MEDIA_IMAGES'] === 'denied' ||
//             result['android.permission.READ_MEDIA_IMAGES'] === 'blocked'
//           ) {
//             request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(res => {
//               switch (res) {
//                 case 'granted':
//                   successCallback(true);
//                   break;
//                 case 'denied':
//                   request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
//                 case 'blocked':
//                   Alert.alert(
//                     'Gallery Permission blocked!',
//                     'Gallery permission is blocked in the device ' +
//                       'settings. Do you want to allow the app to access Gallery to help you upload your image ',
//                     [
//                       {
//                         text: 'Cancel',
//                         onPress: () => null,
//                         style: 'cancel',
//                       },
//                       {
//                         text: 'Setting',
//                         onPress: () => Linking.openSettings(),
//                       },
//                     ],
//                   );

//                   break;
//                 default:
//                   break;
//               }
//             });
//           }
//         }
//         if (
//           result['android.permission.CAMERA'] === 'granted' &&
//           result['android.permission.RECORD_AUDIO'] === 'granted' &&
//           Platform.Version >= 33
//             ? result['android.permission.READ_MEDIA_IMAGES'] === 'granted'
//             : result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted'
//         ) {
//           successCallback(true);
//         }
//       } else {
//         if (
//           result['ios.permission.CAMERA'] === 'unavailable' ||
//           result['ios.permission.PHOTO_LIBRARY'] === 'unavailable'
//         ) {
//           // Alert.alert('feature not available');
//         }
//         if (
//           result['ios.permission.CAMERA'] === 'denied' ||
//           result['ios.permission.PHOTO_LIBRARY'] === 'denied'
//         ) {
//           requestMultiple([
//             PERMISSIONS.IOS.CAMERA,
//             PERMISSIONS.IOS.PHOTO_LIBRARY,
//           ]);
//         }
//         if (
//           result['ios.permission.CAMERA'] === 'blocked' &&
//           result['ios.permission.PHOTO_LIBRARY'] === 'blocked'
//         ) {
//           requestMultiple([
//             PERMISSIONS.IOS.CAMERA,
//             PERMISSIONS.IOS.PHOTO_LIBRARY,
//           ]);
//         }
//         if (
//           result['ios.permission.CAMERA'] === 'denied' ||
//           result['ios.permission.CAMERA'] === 'blocked'
//         ) {
//           request(PERMISSIONS.IOS.CAMERA).then(res => {
//             console.log('res CAMERA', res);
//             switch (res) {
//               case 'granted':
//                 successCallback(true);
//                 break;
//               case 'blocked':
//                 Alert.alert(
//                   'Camera Permission',
//                   'Camera permission is blocked in the device ' +
//                     'settings. Do you want to open setting to allow the app to access camera, to let you add your image',
//                   [
//                     {
//                       text: 'Cancel',
//                       onPress: () => null,
//                       style: 'cancel',
//                     },
//                     {
//                       text: 'OK',
//                       onPress: () => Linking.openSettings(),
//                     },
//                   ],
//                 );
//                 break;
//               default:
//                 break;
//             }
//           });
//         }
//         if (
//           result['ios.permission.PHOTO_LIBRARY'] === 'denied' ||
//           result['ios.permission.PHOTO_LIBRARY'] === 'blocked' ||
//           result['ios.permission.PHOTO_LIBRARY'] == 'limited'
//         ) {
//           request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(res => {
//             console.log('res PHOTO_LIBRARY', res);
//             switch (res) {
//               case 'granted':
//                 successCallback(true);
//                 break;
//               case 'limited':
//                 successCallback(true);
//                 break;
//               case 'denied':
//                 Alert.alert(
//                   'Permission Required',
//                   'Photos permission is denied in the device ' +
//                     'settings. Do you want to allow the app to access Photos to help you upload your image',
//                   [
//                     {
//                       text: 'Cancel',
//                       onPress: () => null,
//                       style: 'cancel',
//                     },
//                     {
//                       text: 'Setting',
//                       onPress: () => Linking.openSettings(),
//                     },
//                   ],
//                 );
//                 break;
//               case 'blocked':
//                 Alert.alert(
//                   'Permission Required',
//                   'Photos permission is denied in the device ' +
//                     'settings. Do you want to allow the app to access Photos to help you upload your image',
//                   [
//                     {
//                       text: 'Cancel',
//                       onPress: () => null,
//                       style: 'cancel',
//                     },
//                     {
//                       text: 'Setting',
//                       onPress: () => Linking.openSettings(),
//                     },
//                   ],
//                 );
//                 break;
//               default:
//                 break;
//             }
//           });
//         }
//         if (
//           result['ios.permission.PHOTO_LIBRARY'] === 'granted' &&
//           result['ios.permission.CAMERA'] === 'granted'
//         ) {
//           successCallback(true);
//         }
//       }
//     })
//     .catch(error => {
//       Alert.alert(error.message);
//     });
// };

// const requestVideoPermissons: any = (successCallback: Function) => {
//   checkMultiple(
//     Platform.OS === 'android'
//       ? [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO]
//       : [PERMISSIONS.IOS.CAMERA],
//   )
//     .then(result => {
//       if (Platform.OS === 'android') {
//         if (
//           result['android.permission.CAMERA'] === 'unavailable' ||
//           result['android.permission.RECORD_AUDIO'] === 'unavailable'
//         ) {
//           Alert.alert('feature not available');
//         }
//         if (
//           result['android.permission.CAMERA'] === 'denied' &&
//           result['android.permission.RECORD_AUDIO'] === 'denied'
//         ) {
//           requestMultiple([
//             PERMISSIONS.ANDROID.CAMERA,
//             PERMISSIONS.ANDROID.RECORD_AUDIO,
//           ]);
//         }
//         if (
//           result['android.permission.RECORD_AUDIO'] === 'denied' ||
//           result['android.permission.CAMERA'] === 'blocked'
//         ) {
//           request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(res => {
//             switch (res) {
//               case 'granted':
//                 successCallback(true);
//                 break;
//               case 'blocked':
//                 Alert.alert(
//                   'Record audio permission',
//                   'Record audio permission is blocked in the device ' +
//                     'settings. Allow the app to access record audio',
//                   [
//                     {
//                       text: 'Cancel',
//                       onPress: () => null,
//                       style: 'cancel',
//                     },
//                     {
//                       text: 'Setting',
//                       onPress: () => Linking.openSettings(),
//                     },
//                   ],
//                 );
//             }
//           });
//         }
//         if (
//           result['android.permission.CAMERA'] === 'blocked' &&
//           result['android.permission.RECORD_AUDIO'] === 'blocked'
//         ) {
//           requestMultiple([
//             PERMISSIONS.ANDROID.CAMERA,
//             PERMISSIONS.ANDROID.RECORD_AUDIO,
//           ]);
//         }
//         if (
//           result['android.permission.CAMERA'] === 'denied' ||
//           result['android.permission.CAMERA'] === 'blocked'
//         ) {
//           request(PERMISSIONS.ANDROID.CAMERA).then(res => {
//             switch (res) {
//               case 'granted':
//                 successCallback(true);
//                 break;
//               case 'blocked':
//                 Alert.alert(
//                   'Camera permission',
//                   'Camera permission is blocked in the device ' +
//                     'settings. Allow the app to access camera',
//                   [
//                     {
//                       text: 'Cancel',
//                       onPress: () => null,
//                       style: 'cancel',
//                     },
//                     {
//                       text: 'Setting',
//                       onPress: () => Linking.openSettings(),
//                     },
//                   ],
//                 );
//                 break;
//               default:
//                 break;
//             }
//           });
//         }

//         if (
//           result['android.permission.CAMERA'] === 'granted' &&
//           result['android.permission.RECORD_AUDIO'] === 'granted'
//         ) {
//           successCallback(true);
//         }
//       } else {
//         console.log('ios', result);
//         if (result['ios.permission.CAMERA'] === 'unavailable') {
//           // Alert.alert('feature not available');
//         }
//         if (result['ios.permission.CAMERA'] === 'denied') {
//           requestMultiple([PERMISSIONS.IOS.CAMERA]);
//         }
//         if (result['ios.permission.CAMERA'] === 'blocked') {
//           requestMultiple([PERMISSIONS.IOS.CAMERA]);
//         }
//         if (
//           result['ios.permission.CAMERA'] === 'denied' ||
//           result['ios.permission.CAMERA'] === 'blocked'
//         ) {
//           request(PERMISSIONS.IOS.CAMERA).then(res => {
//             console.log('res CAMERA', res);
//             switch (res) {
//               case 'granted':
//                 successCallback(true);
//                 break;
//               case 'blocked':
//                 Alert.alert(
//                   'Camera Permission',
//                   'Camera permission is blocked in the device ' +
//                     'settings. Do you want to open setting to allow the app to access camera, to let you add your image',
//                   [
//                     {
//                       text: 'Cancel',
//                       onPress: () => null,
//                       style: 'cancel',
//                     },
//                     {
//                       text: 'OK',
//                       onPress: () => Linking.openSettings(),
//                     },
//                   ],
//                 );
//                 break;
//               default:
//                 break;
//             }
//           });
//         }

//         if (result['ios.permission.CAMERA'] === 'granted') {
//           successCallback(true);
//         }
//       }
//     })
//     .catch(error => {
//       Alert.alert(error.message);
//     });
// };

// export { requestpermissions, requestVideoPermissons };
