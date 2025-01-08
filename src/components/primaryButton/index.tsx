import {TextStyle, ViewStyle} from 'react-native';
import {TextWrapper} from '../textWrapper';
import {ViewWrapper} from '../viewWrapper';

const PrimaryButton = ({
  onPress,
  disable,
  title,
  customStyle,
  titleStyle,
}: {
  onPress: () => void;
  disable: boolean;
  title: string;
  customStyle: ViewStyle;
  titleStyle: TextStyle;
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
        },
        customStyle,
      ]}>
      <TextWrapper h22 title={title} align style={titleStyle} />
    </ViewWrapper>
  );
};

export default PrimaryButton;
