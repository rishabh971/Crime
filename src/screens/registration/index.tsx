import React from 'react';
import colors from '../../utils/colors';
import {ViewWrapper} from '../../components/viewWrapper';
import PrimaryButton from '../../components/primaryButton';
import CustomTextInput from '../../components/customTextInput';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextWrapper} from '../../components/textWrapper';
import {goBack, navigate} from '../../utils/navigationService';
import screens from '../../utils/screens';
import {ImageUploadButton} from '../../components/imageUpload';
import {CustomHeader} from '../../components/customHeader';
import CustomModalWrapper from '../../components/customModalWrapper';
import {normalize} from '../../utils/dimensions';
import {galleryPick, OpenCamera} from '../../utils/imageHandler';
import {images} from '../../asset';
import {useDispatch} from 'react-redux';
import {ActivityIndicator, Alert, StyleSheet} from 'react-native';
import {registration} from '../../redux/AuthReducer/action';
import {showErrorToast} from '../../components/toast';

export const RegistrationScreen = () => {
  const {top} = useSafeAreaInsets();
  const [filedState, updateState] = React.useState({
    name: '',
    dept: '',
    taluk: '',
    designation: '',
    aadhar: '',
    mobile: '',
    fsl: '',
    emailid: '',
    password: '',
  });
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
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

  const registrationApi = () => {
    setLoader(true);
    dispatch(
      registration({
        name: filedState.name,
        deptId: filedState.dept,
        taluk: filedState.taluk,
        designation: filedState.designation,
        dobOrAadhaar: filedState.aadhar,
        mobileNo: filedState.mobile,
        code: filedState.fsl,
        email: filedState.emailid,
        imageUrl:
          'https://tr.rbxcdn.com/180DAY-9a7bda8a192a498a4ceeee3b14843620/768/432/Image/Webp/noFilter',
        password: filedState.password,
      }),
    )
      .unwrap()
      .then((res: any) => {
        if (res?.status == 200) {
          showErrorToast(res?.message);
          setTimeout(() => {
            navigate(screens.BOTTOMSTACK);
          }, 1000);
        }
      })
      .catch((error: any) => {
        showErrorToast(error?.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const renderItem = (item: {
    placeholder: string;
    value: string | number;
    onChange: Function;
  }) => (
    <CustomTextInput
      value={item.value}
      autoCorrect={false}
      onChangeText={item.onChange}
      placeholder={item?.placeholder}
      tstyle={{borderWidth: 0, marginTop: 10}}
    />
  );

  const renderFields = () => {
    return (
      <React.Fragment>
        {[
          {
            placeholder: 'Name',
            value: filedState.name,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, name: txt}));
            },
          },
          {
            placeholder: 'Dept ID*',
            value: filedState.dept,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, dept: txt}));
            },
          },
          {
            placeholder: 'Taluk*',
            value: filedState.taluk,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, taluk: txt}));
            },
          },
          {
            placeholder: 'Designation*',
            value: filedState.designation,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, designation: txt}));
            },
          },
          {
            placeholder: 'DOB/Aadhar*',
            value: filedState.aadhar,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, aadhar: txt}));
            },
          },
          {
            placeholder: 'Mobile*',
            value: filedState.mobile,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, mobile: txt}));
            },
          },
          {
            placeholder: 'Police Station/FSL Code*',
            value: filedState.fsl,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, fsl: txt}));
            },
          },
          {
            placeholder: 'Govt. Email ID*',
            value: filedState.emailid,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, emailid: txt}));
            },
          },
          {
            placeholder: 'Password*',
            value: filedState.password,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, password: txt}));
            },
          },
        ].map(renderItem)}
      </React.Fragment>
    );
  };

  const goBackToAnotherScreen = () => {
    goBack();
  };

  return (
    <ViewWrapper
      customStyle={{flex: 1, backgroundColor: '#F9FAFE', paddingTop: top}}>
      <CustomHeader
        screenName="Registration"
        onLeftIconPress={goBackToAnotherScreen}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        style={{flex: 1, backgroundColor: '#F9FAFE'}}>
        <ViewWrapper
          customStyle={{
            flex: 1,
            backgroundColor: '#F9FAFE',
            paddingHorizontal: 30,
          }}>
          {renderFields()}
          <ImageUploadButton onCameraIconPress={openCameraOrGallery} />
          <PrimaryButton
            title="Submit"
            disable={false}
            onPress={registrationApi}
            titleStyle={{color: '#fff'}}
            customStyle={{
              width: '100%',
              borderWidth: 0,
              marginTop: 30,
              backgroundColor: colors.green,
            }}
          />
          <ViewWrapper
            row
            center
            justifyCenter
            customStyle={{marginVertical: 15}}>
            <TextWrapper
              h3
              align
              title={'Have an account? '}
              style={{
                color: '#000000',
                fontWeight: '500',
              }}
            />
            <TextWrapper
              h3
              align
              onPress={() => {
                navigate(screens.LOGIN);
              }}
              title={'Sign In'}
              style={{
                color: colors.green,
                fontWeight: '500',
              }}
            />
          </ViewWrapper>
        </ViewWrapper>
      </KeyboardAwareScrollView>
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
      {loader && (
        <ActivityIndicator
          size={'large'}
          color={'#00000'}
          animating={loader}
          style={{...StyleSheet.absoluteFillObject}}
        />
      )}
    </ViewWrapper>
  );
};
