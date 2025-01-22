import {Image, ImageProps, TextStyle, ViewStyle} from 'react-native';
import {TextWrapper} from '../textWrapper';
import {ViewWrapper} from '../viewWrapper';
import colors from '../../utils/colors';

const PrimaryButton = ({
  onPress,
  disable,
  title,
  customStyle,
  titleStyle,
  icon,
}: {
  onPress: () => void;
  disable: boolean;
  title: string;
  customStyle: ViewStyle;
  titleStyle: TextStyle;
  icon: ImageProps;
}) => {
  return (
    <ViewWrapper
      self
      center
      justifyCenter
      isDisabled={disable}
      onPress={onPress}
      customStyle={[
        {
          borderWidth: 1,
          width: '90%',
          borderRadius: 50,
          height: 75,
          overflow: 'hidden',
          backgroundColor: disable ? 'grey' : colors.green,
        },
        customStyle,
      ]}>
      {!icon ? (
        <TextWrapper h22 title={title} align style={titleStyle} />
      ) : (
        <Image
          source={typeof icon == 'string' ? {uri: icon} : icon}
          style={
            typeof icon == 'string'
              ? {height: '100%', width: '100%'}
              : {resizeMode: 'contain'}
          }
        />
      )}
    </ViewWrapper>
  );
};

export default PrimaryButton;
