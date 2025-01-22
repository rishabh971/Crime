import {Image} from 'react-native';
import {ViewWrapper} from '../../components/viewWrapper';
import {images} from '../../asset';
import {TextWrapper} from '../../components/textWrapper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
import { navigate } from '../../utils/navigationService';
import screens from '../../utils/screens';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  return (
    <ViewWrapper center customStyle={[styles.container, {paddingTop: top}]}>
      <Image source={images.LOGO} style={{alignSelf: 'center'}} />
      <ViewWrapper row center between customStyle={styles.mainContainer}>
        <TextWrapper
          h3
          title={'View Recent Case'}
          style={styles.recentCaseText}
        />
        <Image source={images.SEARCH} style={{resizeMode: 'contain'}} />
      </ViewWrapper>
      <ViewWrapper center row between customStyle={styles.newCaseContainer} onPress={() => {navigate(screens.NEWCASE)}} isDisabled={false}>
        <TextWrapper h3 title={'Add New Case'} style={styles.newCaseText} />
        <Image source={images.NEWCASE} style={{resizeMode: 'contain'}} />
      </ViewWrapper>
      <TextWrapper h24 title={'View a Case'} style={styles.viewCase} />
      <TextWrapper
        h5
        title={'Use this scanner to view any case'}
        style={styles.scannerText}
      />
    </ViewWrapper>
  );
};
