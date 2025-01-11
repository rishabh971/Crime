import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewWrapper} from '../../components/viewWrapper';
import React from 'react';
import CustomTextInput from '../../components/customTextInput';
import PrimaryButton from '../../components/primaryButton';
import colors from '../../utils/colors';
import {Image} from 'react-native';
import {images} from '../../asset';
import {TextWrapper} from '../../components/textWrapper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomModalWrapper from '../../components/customModalWrapper';
import {normalize} from '../../utils/dimensions';
import {OpenCamera, galleryPick} from '../../utils/imageHandler';
import {CustomHeader} from '../../components/customHeader';

export const NewCaseScreen = () => {
  const [fieldValues, setFieldValues] = React.useState({
    date: '',
    time: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    pincode: '',
    crimetype: '',
    remark: '',
  });
  const [error, setError] = React.useState({
    date: '',
    time: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    pincode: '',
    crimetype: '',
    remark: '',
  });
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

  const onChangeTextHandler = (currentIndex, value) => {
    console.log('currentIndex', currentIndex);
    switch (currentIndex) {
      case 0:
        setFieldValues(prev => ({...prev, date: value}));
        break;
      case 1:
        setFieldValues(prev => ({...prev, time: value}));
        break;
      case 2:
        setFieldValues(prev => ({...prev, address1: value}));
        break;
      case 3:
        setFieldValues(prev => ({...prev, address2: value}));
        break;
      case 4:
        setFieldValues(prev => ({...prev, state: value}));
        break;
      case 5:
        setFieldValues(prev => ({...prev, city: value}));
        break;
      case 6:
        setFieldValues(prev => ({...prev, pincode: value}));
        break;
      case 7:
        setFieldValues(prev => ({...prev, crimetype: value}));
        break;
      default:
        setFieldValues(prev => ({...prev, remark: value}));
        break;
    }
  };

  const renderItem = (item, index) => {
    return (
      <ViewWrapper>
        <CustomTextInput
          value={item.value}
          onChangeText={text => onChangeTextHandler(index, text)}
          placeholder={item.placeholder}
          tstyle={{marginTop: 10, borderColor: '#F4F4F4'}}
        />
        {index == 0 && (
          <ViewWrapper
            customStyle={{position: 'absolute', right: 20, top: '43%'}}>
            <Image source={images.NEWCASE} />
          </ViewWrapper>
        )}
      </ViewWrapper>
    );
  };

  return (
    <ViewWrapper
      customStyle={{flex: 1, backgroundColor: '#F9FAFE', paddingTop: top}}>
      <CustomHeader screenName='New Case' />
      <KeyboardAwareScrollView>
        <ViewWrapper
          customStyle={{
            flex: 1,
            paddingHorizontal: 30,
          }}>
          {[
            {value: fieldValues.date, placeholder: 'Date'},
            {value: fieldValues.time, placeholder: 'Time'},
            {value: fieldValues.address1, placeholder: 'Address 1*'},
            {value: fieldValues.address2, placeholder: 'Address 2*'},
            {value: fieldValues.state, placeholder: 'State*'},
            {value: fieldValues.city, placeholder: 'City*'},
            {value: fieldValues.pincode, placeholder: 'Pincode*'},
            {value: fieldValues.crimetype, placeholder: 'Crime Type*'},
            {value: fieldValues.remark, placeholder: 'Remarks by I.O.*'},
          ].map(renderItem)}
          <ViewWrapper row center customStyle={{marginVertical: 20}}>
            <ViewWrapper
              isDisabled={false}
              onPress={openCameraOrGallery}
              customStyle={{width: 40, height: 40}}>
              <Image
                source={images.CAMERA}
                style={{resizeMode: 'contain', height: '100%', width: '100%'}}
              />
            </ViewWrapper>
            <TextWrapper
              h5
              title={'Take picture of the crime scene'}
              style={{fontWeight: '400', color: '#8489A3', marginLeft: 20}}
            />
          </ViewWrapper>
          <PrimaryButton
            title="Submit"
            customStyle={{
              backgroundColor: colors.green,
              borderWidth: 0,
              width: '100%',
            }}
            titleStyle={{color: '#fff'}}
          />
        </ViewWrapper>
        <CustomModalWrapper
          avoidKeyboard={true}
          animationOut="fadeOut"
          backdropOpacity={0}
          modalCustomStyle={{margin: 0}}
          onCloseModal={onCloseModal}
          isVisible={open}>
          <ViewWrapper
            row
            evenly
            customStyle={{
              marginTop: 'auto',
              width: '100%',
              padding: normalize(20),
              backgroundColor: '#fff',
              borderTopLeftRadius: normalize(30),
              borderTopRightRadius: normalize(30),
              borderTopWidth: 1,
              borderStartWidth: 1,
              borderEndWidth: 1,
              height: 100,
              borderColor: 'transparent',
            }}>
            <TextWrapper h3 title={'Open Camera'} onPress={camera} />
            <TextWrapper h3 title={'Open Gallery'} onPress={gallery} />
          </ViewWrapper>
        </CustomModalWrapper>
      </KeyboardAwareScrollView>
    </ViewWrapper>
  );
};
