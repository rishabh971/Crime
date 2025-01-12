import React from 'react';
import {images} from '../../asset';
import colors from '../../utils/colors';
import {useSelector} from 'react-redux';
import screens from '../../utils/screens';
import {Image, ImageBackground} from 'react-native';
import {TextWrapper} from '../../components/textWrapper';
import {ViewWrapper} from '../../components/viewWrapper';
import {navigate, reset} from '../../utils/navigationService';

export const SplashScreen = () => {
  const {auth} = useSelector(store => store);

  React.useEffect(() => {
    setTimeout(() => {
      if (auth?.token?.length > 0) {
        reset(screens.BOTTOMSTACK);
      } else {
        reset(screens.LANDING);
      }
    }, 1000);
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
