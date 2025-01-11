import {Alert, Linking} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

/**
 *
 * @param onSucess
 * @param onFailure
 */
const imagepickerdetails: any = {
  width: 300,
  height: 300,
  cropping: true,
  mediaType: 'photo',
  showCropFrame: true,
  showCropGuidelines: false,
  freeStyleCropEnabled: true,
  // cropperToolbarColor: '#fff',
  // cropperStatusBarColor: '#000000',
  // cropperActiveWidgetColor: '#000000',
  // cropperToolbarWidgetColor: '#000000',
};

/**
 * 
 * @param success 
 * @param failure 
 * @returns 
 */
async function galleryPick(success: any, failure: any) {
  try {
    const result: any = await ImagePicker.openPicker(imagepickerdetails);
    const parts = result.path.split('/');
    const fileName = parts[parts.length - 1];
    const imageDetails = {
      name: fileName,
      path: result.path,
      type: result.mime,
    };
    success?.(imageDetails);
    return imageDetails;
  } catch (error: any) {
    failure?.(error);
    if (error?.message === 'User did not grant library permission.') {
      Alert.alert(
        'Gallery Permission Denied!',
        'Please Allow Gallery Permission',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'Settings', onPress: () => Linking.openSettings()},
        ],
        {cancelable: true},
      );
      return error?.message;
    }
  }
}

async function OpenCamera() {
  try {
    const result: any = await ImagePicker.openCamera(imagepickerdetails);
    const parts = result.path.split('/');
    const fileName = parts[parts.length - 1];
    const imageDetails = {
      name: fileName,
      path: result?.path,
      type: result?.mime,
    };
    return imageDetails;
  } catch (error: any) {
    if (error.message === 'User did not grant camera permission.') {
      Alert.alert(
        'STRING.Camera_Permission_Denied',
        'STRING.Allow_Camera_Permission',
        [
          {text: 'Cancel', onPress: () => null, style: 'cancel'},
          {text: 'Settings', onPress: () => Linking.openSettings()},
        ],
        {cancelable: true},
      );
      return error?.message;
    }
  }
}

export {OpenCamera, galleryPick};
