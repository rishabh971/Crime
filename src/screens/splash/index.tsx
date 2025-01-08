import {Image, ImageBackground} from 'react-native';
import {images} from '../../asset';
import colors from '../../utils/colors';
import {TextWrapper} from '../../components/textWrapper';
import {ViewWrapper} from '../../components/viewWrapper';
import React from 'react';
import {navigate, reset} from '../../utils/navigationService';
import screens from '../../utils/screens';

export const SplashScreen = () => {
  React.useEffect(() => {
    setTimeout(() => navigate(screens.LANDING), 1000);
  }, []);

  return (
    <ImageBackground
      source={images.IB}
      style={{flex: 1, justifyContent: 'center'}}>
      <ViewWrapper
        center
        justifyCenter
        customStyle={{flex: 0.8, marginTop: 100}}>
        <ViewWrapper>
          <TextWrapper
            h24
            semibold
            align
            title={'CRIME SCENE EVIDENCE'}
            style={{color: colors.green}}
          />
          <TextWrapper h24 align semibold title={'MANAGEMENT SOFTWARE'} black />
        </ViewWrapper>
      </ViewWrapper>
      <ViewWrapper>
        <TextWrapper h4 align regular title={'Powered By'} black />
        <Image source={images.APPLOGO} style={{alignSelf: 'center'}} />
      </ViewWrapper>
    </ImageBackground>
  );
};
