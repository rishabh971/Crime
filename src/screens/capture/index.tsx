import React from 'react';
import styles from './styles';
import {images} from '../../asset';
import {ViewWrapper} from '../../components/viewWrapper';
import {TextWrapper} from '../../components/textWrapper';
import PrimaryButton from '../../components/primaryButton';
import CustomTextInput from '../../components/customTextInput';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {galleryPick, OpenCamera} from '../../utils/imageHandler';
import CustomModalWrapper from '../../components/customModalWrapper';

export default function CaptureEvidenceScreen() {
  const {top} = useSafeAreaInsets();
  const [open, setOpen] = React.useState(false);
  const [imagePath, setImagePath] = React.useState({path: images.CAMERA});

  const openCameraOrGallery = () => {
    setOpen(prev => !prev);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const camera = async () => {
    try {
      const res = await OpenCamera();
      res?.path && setImagePath(res);
      setOpen(false);
    } catch (error) {
      setOpen(false);
    }
  };

  const gallery = async () => {
    try {
      await galleryPick(
        (res: any) => {
          res?.path && setImagePath(res);
          setOpen(false);
        },
        () => {
          setOpen(false);
        },
      );
    } catch (error) {}
  };

  return (
    <ViewWrapper customStyle={[styles.container, {paddingTop: top}]}>
      <TextWrapper
        h24
        align
        title={'Capture Evidence Photo'}
        style={{fontWeight: '700'}}
      />
      <PrimaryButton
        disable={false}
        icon={imagePath?.path}
        titleStyle={{color: '#fff'}}
        onPress={openCameraOrGallery}
        customStyle={styles.cameraView}
      />
      <CustomTextInput
        tstyle={{borderColor: '#F4F4F4'}}
        placeholder={'Select Evidence Type'}
      />
      <CustomTextInput
        tstyle={{borderColor: '#F4F4F4', marginTop: 20, height: 140}}
        multiline
        placeholder={'Evidence Description'}
      />
      <PrimaryButton
        title={'Generate QR'}
        titleStyle={{color: '#fff'}}
        customStyle={styles.generateQRbtn}
      />
      <CustomModalWrapper
        avoidKeyboard={true}
        animationOut="fadeOut"
        backdropOpacity={0}
        modalCustomStyle={{margin: 0}}
        onCloseModal={onCloseModal}
        isVisible={open}>
        <ViewWrapper row evenly customStyle={styles.mainContainer}>
          <TextWrapper h3 title={'Open Camera'} onPress={camera} />
          <TextWrapper h3 title={'Open Gallery'} onPress={gallery} />
        </ViewWrapper>
      </CustomModalWrapper>
    </ViewWrapper>
  );
}
