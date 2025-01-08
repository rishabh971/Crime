import {TextWrapper} from '../textWrapper';
import {ViewWrapper} from '../viewWrapper';

const PrimaryButton = ({onPress, disable, title, customStyle}) => {
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
      <TextWrapper h22 title={title} align />
    </ViewWrapper>
  );
};

export default PrimaryButton;
