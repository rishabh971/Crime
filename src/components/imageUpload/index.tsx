import {Image} from 'react-native';
import {TextWrapper} from '../textWrapper';
import {ViewWrapper} from '../viewWrapper';
import {images} from '../../asset';

export const ImageUploadButton = ({onCameraIconPress}) => {
  return (
    <ViewWrapper row center customStyle={{marginTop: 20}}>
      <ViewWrapper
        isDisabled={false}
        onPress={onCameraIconPress}
        customStyle={{width: 40, height: 40, marginRight: 10}}>
        <Image
          source={images.CAMERA}
          style={{resizeMode: 'contain', height: '100%', width: '100%'}}
        />
      </ViewWrapper>
      <TextWrapper
        h5
        title={'Upload from Gallery or Click from Camera'}
        style={{color: '#8489A3', fontWeight: '400'}}
      />
    </ViewWrapper>
    // <ViewWrapper customStyle={{marginTop: 20}}>
    // <TextWrapper
    //   h5
    //   title={'Upload from Gallery or Click from Camera'}
    //   style={{color: '#8489A3', fontWeight: '400'}}
    // />
    // </ViewWrapper>
  );
};
