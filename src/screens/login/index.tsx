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
import {ActivityIndicator, Image, StyleSheet} from 'react-native';
import {showErrorToast, showSuccessToast} from '../../components/toast';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const {top} = useSafeAreaInsets();
  const [loader, setLoader] = React.useState(false);
  const [loginDetails, setLoginDetails] = React.useState({
    email: '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const loginNavigation = () => {
    setLoader(true);
    dispatch(
      emailsignIn({
        email: loginDetails.email,
        password: loginDetails.password,
      }),
    )
      .unwrap()
      .then((res: any) => {
        if (res?.status == 200) {
          navigate(screens.BOTTOMSTACK);
          showSuccessToast(res?.message);
        }
      })
      .catch((error: any) => {
        showErrorToast(error?.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  /**
   *
   * @param email
   */
  const onEmailChange = (email: string) => {
    setLoginDetails(prev => ({...prev, email: email}));
  };

  /**
   *
   * @param password
   */
  const onPasswordChange = (password: string) => {
    setLoginDetails(prev => ({...prev, password: password}));
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
        autoCapitalize={'none'}
        iconContainerStyle={{backgroundColor: colors.lightGreen}}
        placeholder={'Enter your email'}
        tstyle={styles.emailContainerStyle}
        onChangeText={onEmailChange}
      />
      <TextWrapper h3 title={'Password'} style={styles.passwordTextStyle} />
      <CustomTextInput
        autoCapitalize="none"
        iconName={images.PASSCODE}
        placeholder="Enter your password"
        secureTextEntry={!isPasswordVisible}
        onChangeText={onPasswordChange}
        rightIconName={isPasswordVisible ? images.EYE : images.EYE}
        onRightIconPress={togglePasswordVisibility}
        tstyle={styles.emailContainerStyle}
      />
      <TextWrapper
        h3
        onPress={() => {
          navigate(screens.CAPTUREEVIDENCE);
        }}
        title={'Forgot password?'}
        style={{
          marginBottom: 15,
          marginTop: 30,
          color: '#8489A3',
          fontWeight: '500',
          alignSelf: 'flex-end'
        }}
      />
      <PrimaryButton
        title={'Login'}
        customStyle={{
          borderWidth: 0,
          width: '100%',
          marginTop: 30,
        }}
        titleStyle={{color: '#fff'}}
        disable={
          !(loginDetails.email.length > 1 && loginDetails.password.length > 1)
        }
        onPress={loginNavigation}
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
          onPress={() => {
            navigate(screens.REGISTRATION);
          }}
          title={'Sign up'}
          style={{
            color: colors.green,
            fontWeight: '500',
          }}
        />
      </ViewWrapper>
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
