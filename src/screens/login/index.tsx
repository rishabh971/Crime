import React from 'react';
import {Alert, Image} from 'react-native';
import {images} from '../../asset';
import CustomTextInput from '../../components/customTextInput';
import {ViewWrapper} from '../../components/viewWrapper';
import colors from '../../utils/colors';
import {TextWrapper} from '../../components/textWrapper';
import PrimaryButton from '../../components/primaryButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigate} from '../../utils/navigationService';
import screens from '../../utils/screens';

export const LoginScreen = () => {
  const {top, bottom} = useSafeAreaInsets();

  const registerNavigation = () => {
    navigate(screens.REGISTRATION);
  };
  return (
    <ViewWrapper
      customStyle={{
        flex: 1,
        paddingTop: top,
        backgroundColor: '#F9FAFE',
        paddingHorizontal: 30,
      }}>
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
        placeholder={'Enter your email'}
        tstyle={{
          backgroundColor: '#fff',
          paddingVertical: 25,
          paddingLeft: 20,
          borderRadius: 10,
          borderColor: colors.green,
          borderWidth: 1,
          fontSize: 17,
          fontWeight: '400',
        }}
      />
      <TextWrapper
        h3
        title={'Password'}
        style={{
          marginBottom: 15,
          marginTop: 30,
          color: '#8489A3',
          fontWeight: '500',
        }}
      />
      <CustomTextInput
        placeholder={'Enter your password'}
        tstyle={{
          backgroundColor: '#fff',
          paddingVertical: 25,
          paddingLeft: 20,
          borderRadius: 10,
          borderColor: colors.green,
          borderWidth: 1,
          fontSize: 17,
          fontWeight: '400',
        }}
      />
      <TextWrapper
        h3
        title={'Forgot password?'}
        style={{
          alignSelf: 'flex-end',
          marginBottom: 15,
          marginTop: 30,
          color: '#8489A3',
          fontWeight: '500',
        }}
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
          navigate(screens.BOTTOMSTACK)
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
          onPress={registerNavigation}
          title={'Sign up'}
          style={{
            color: colors.green,
            fontWeight: '500',
          }}
        />
      </ViewWrapper>
    </ViewWrapper>
  );
};
