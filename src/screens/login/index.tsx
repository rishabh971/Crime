import React from 'react';
import {Image, ImageBackground} from 'react-native';
import {images} from '../../asset';
import colors from '../../utils/colors';
import {ViewWrapper} from '../../components/viewWrapper';
import PrimaryButton from '../../components/primaryButton';

export const LoginScreen = () => {
  return (
    <ImageBackground
      source={images.IB}
      style={{flex: 1, justifyContent: 'center'}}>
      <ViewWrapper>
        <Image source={images.APPLOGO} style={{alignSelf: 'center'}} />
        <PrimaryButton
          title={'Register'}
          customStyle={{
            marginTop: 80,
            backgroundColor: colors.green,
            borderWidth: 0,
          }}
          titleStyle = {{color: '#fff'}}
        />
        <PrimaryButton
          title={'Or'}
          customStyle={{
            borderRadius: 50,
            borderWidth: 1,
            width: 50,
            height: 50,
            marginVertical: 30,
            borderColor: 'lightgrey'
          }}
        />
        <PrimaryButton
          title={'Login'}
          customStyle={{backgroundColor: '#ffff', borderColor: colors.green}}
        />
      </ViewWrapper>
    </ImageBackground>
  );
};
