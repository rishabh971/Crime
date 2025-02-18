import {Image} from 'react-native';
import {ViewWrapper} from '../../components/viewWrapper';
import {images} from '../../asset';
import {TextWrapper} from '../../components/textWrapper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
import {navigate, reset} from '../../utils/navigationService';
import screens from '../../utils/screens';
import {setAuthorizationToken} from '../../utils/common';
import { setAuthToken } from '../../redux/AuthReducer/authSlice';
import { useDispatch } from 'react-redux';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch()
  return (
    <ViewWrapper customStyle={[styles.container, {paddingTop: top}]}>
      <TextWrapper
        semibold
        h3
        title={'LOGOUT'}
        onPress={() => {
          setAuthorizationToken('');
          dispatch(setAuthToken(''));
          reset(screens.LOGIN);
        }}
        style={{alignSelf: 'flex-end', marginRight: 10, color: 'red'}}
      />
      <Image source={images.LOGO} style={{alignSelf: 'center'}} />
      <ViewWrapper
        row
        self
        center
        between
        customStyle={styles.mainContainer}
        onPress={() => {
          navigate(screens.RECENTCASE);
        }}
        isDisabled={false}>
        <TextWrapper
          h3
          title={'View Recent Case'}
          style={styles.recentCaseText}
        />
        <Image source={images.SEARCH} style={{resizeMode: 'contain'}} />
      </ViewWrapper>
      <ViewWrapper
        center
        row
        self
        between
        customStyle={styles.newCaseContainer}
        onPress={() => {
          navigate(screens.NEWCASE);
        }}
        isDisabled={false}>
        <TextWrapper
          align
          h3
          title={'Add New Case'}
          style={styles.newCaseText}
        />
        <Image source={images.NEWCASE} style={{resizeMode: 'contain'}} />
      </ViewWrapper>
      <TextWrapper align h24 title={'View a Case'} style={styles.viewCase} />
      <TextWrapper
        h5
        align
        title={'Use this scanner to view any case'}
        style={styles.scannerText}
      />
    </ViewWrapper>
  );
};
