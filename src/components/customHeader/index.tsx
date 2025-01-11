import {Image} from 'react-native';
import {TextWrapper} from '../textWrapper';
import {ViewWrapper} from '../viewWrapper';
import {images} from '../../asset';

export const CustomHeader = ({
  screenName,
  onLeftIconPress,
}: {
  screenName: string;
  onLeftIconPress: () => void;
}) => {
  return (
    <ViewWrapper
      center
      row
      customStyle={{
        height: 100,
        width: '100%',
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
      }}>
      <ViewWrapper isDisabled={false} onPress={onLeftIconPress}>
        <Image source={images.BACK} />
      </ViewWrapper>
      <TextWrapper
        h24
        align
        title={screenName}
        style={{fontWeight: '700', marginLeft: '29%'}}
      />
    </ViewWrapper>
  );
};
