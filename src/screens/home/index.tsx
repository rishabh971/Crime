import {Image} from 'react-native';
import {ViewWrapper} from '../../components/viewWrapper';
import {images} from '../../asset';
import {TextWrapper} from '../../components/textWrapper';
import colors from '../../utils/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  return (
    <ViewWrapper center customStyle={{flex: 1, backgroundColor: '#F9FAFE', paddingTop: top}}>
      <Image source={images.LOGO} style={{alignSelf: 'center'}} />
      <ViewWrapper
        center
        justifyCenter
        customStyle={{
          height: 75,
          width: '90%',
          borderRadius: 50,
          marginVertical: 20,
          backgroundColor: colors.lightGreen,
        }}>
        <TextWrapper
          h3
          title={'View Recent Case'}
          style={{fontWeight: '500', color: colors.green}}
        />
      </ViewWrapper>
      <ViewWrapper
        center
        justifyCenter
        customStyle={{
          height: 75,
          width: '90%',
          borderRadius: 50,
          backgroundColor: colors.lightOrange,
        }}>
        <TextWrapper
          h3
          title={'Add New Case'}
          style={{fontWeight: '500', color: colors.orange}}
        />
      </ViewWrapper>
      <TextWrapper
        h24
        title={'View a Case'}
        style={{fontWeight: '700', color: '#000000', marginVertical: 30}}
      />
      <TextWrapper
        h5
        title={'Use this scanner to view any case'}
        style={{fontWeight: '400', color: '#000000'}}
      />
    </ViewWrapper>
  );
};
