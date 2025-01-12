import React from 'react';
import {styles} from './styes';
import {images} from '../../asset';
import {useDispatch} from 'react-redux';
import colors from '../../utils/colors';
import screens from '../../utils/screens';
import {navigate} from '../../utils/navigationService';
import {ViewWrapper} from '../../components/viewWrapper';
import {TextWrapper} from '../../components/textWrapper';
import {emailsignIn} from '../../redux/AuthReducer/action';
import PrimaryButton from '../../components/primaryButton';
import CustomTextInput from '../../components/customTextInput';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, Alert, Image, StyleSheet} from 'react-native';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const {top} = useSafeAreaInsets();
  const [loader, setLoader] = React.useState(false);

  const loginNavigation = () => {
    setLoader(true);
    dispatch(
      emailsignIn({
        email: 'test121@yopmail.com',
        password: 'password',
      }),
    )
      .unwrap()
      .then(res => {
        if (res?.status == 200) {
          navigate(screens.BOTTOMSTACK);
        }
      })
      .catch(error => {
        //ShowToast
        Alert.alert(JSON.stringify(error?.message));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <ViewWrapper customStyle={[styles.container, {paddingTop: top}]}>
      <Image
        source={images.LOGO}
        style={{alignSelf: 'center', marginBottom: 45, marginTop: 25}}
      />
      <TextWrapper
        h24
        title={'Hey There! \nWelcome Back'}
        style={{marginBottom: 50, color: '#000000', fontWeight: '700'}}
      />
      <TextWrapper
        h3
        title={'Email'}
        style={{marginBottom: 15, color: '#8489A3', fontWeight: '500'}}
      />
      <CustomTextInput
        iconName={images.EMAIL}
        iconContainerStyle={{backgroundColor: colors.lightGreen}}
        placeholder={'Enter your email'}
        tstyle={styles.emailContainerStyle}
      />
      <TextWrapper h3 title={'Password'} style={styles.passwordTextStyle} />
      <CustomTextInput
        iconNameStyle={{height: 24, width: 19}}
        iconContainerStyle={{backgroundColor: colors.lightGreen}}
        placeholder={'Enter your password'}
        iconName={images.PASSCODE}
        tstyle={styles.emailContainerStyle}
      />
      <TextWrapper
        h3
        onPress={() => {
          navigate(screens.CAPTUREEVIDENCE);
        }}
        title={'Forgot password?'}
        style={styles.passwordTextStyle}
      />
      <PrimaryButton
        title={'Login'}
        customStyle={{
          backgroundColor: colors.green,
          borderWidth: 0,
          width: '100%',
          marginTop: 30,
        }}
        titleStyle={{color: '#fff'}}
        disable={false}
        onPress={() => {
          // navigate(screens.BOTTOMSTACK);
          loginNavigation();
        }}
      />
      <ViewWrapper row center justifyCenter customStyle={{marginVertical: 15}}>
        <TextWrapper
          h3
          align
          title={"Don't have an account? "}
          style={{
            color: '#000000',
            fontWeight: '500',
          }}
        />
        <TextWrapper
          h3
          align
          onPress={() => {}}
          title={'Sign up'}
          style={{
            color: colors.green,
            fontWeight: '500',
          }}
        />
      </ViewWrapper>
      {loader && (
        <ActivityIndicator
          animating={loader}
          style={{...StyleSheet.absoluteFillObject}}
        />
      )}
    </ViewWrapper>
  );
};
