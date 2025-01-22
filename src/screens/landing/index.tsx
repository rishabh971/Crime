import React from 'react';
import {Image, ImageBackground} from 'react-native';
import {images} from '../../asset';
import colors from '../../utils/colors';
import {ViewWrapper} from '../../components/viewWrapper';
import PrimaryButton from '../../components/primaryButton';
import screens from '../../utils/screens';
import {navigate} from '../../utils/navigationService';
import styles from './styles';
import { useDispatch } from 'react-redux';

export const LandingScreen = () => {
  
  const loginNavigation = () => {
    navigate(screens.LOGIN);
  };
  
  const registrationNavigation = () => {
    navigate(screens.REGISTRATION);
  };

  return (
    <ImageBackground source={images.IB} style={styles.container}>
      <ViewWrapper>
        <Image source={images.APPLOGO} style={{alignSelf: 'center'}} />
        <PrimaryButton
          title={'User Registeration'}
          disable={false}
          customStyle={styles.registerButton}
          titleStyle={styles.registerTitleStyle}
          onPress={registrationNavigation}
        />
        <PrimaryButton
          title={'Or'}
          customStyle={styles.orButtonStyle}
          titleStyle={{fontSize: 18, fontWeight: '400'}}
        />
        <PrimaryButton
          title={'Login'}
          customStyle={{backgroundColor: '#ffff', borderColor: colors.green}}
          titleStyle={styles.loginButtonStyle}
          disable={false}
          onPress={loginNavigation}
        />
      </ViewWrapper>
    </ImageBackground>
  );
};
