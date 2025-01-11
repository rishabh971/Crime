import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
import { normalize } from '../../utils/dimensions';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flex: 1,
    backgroundColor: '#F9FAFE',
  },
  cameraView: {
    borderWidth: 1,
    height: 151,
    width: 151,
    borderRadius: 151 / 2,
    alignSelf: 'center',
    marginVertical: 38,
    borderColor: '#22B7FA'
  },
  generateQRbtn: {
    marginTop: 100,
    width: '100%',
    backgroundColor: colors.green,
    borderWidth: 0,
  },
  mainContainer: {
    marginTop: 'auto',
    width: '100%',
    padding: normalize(20),
    backgroundColor: '#fff',
    borderTopLeftRadius: normalize(30),
    borderTopRightRadius: normalize(30),
    borderTopWidth: 1,
    borderStartWidth: 1,
    borderEndWidth: 1,
    height: 100,
    borderColor: 'transparent',
  }
});
