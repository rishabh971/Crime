import React from 'react';
import colors from '../../utils/colors';
import {ViewWrapper} from '../../components/viewWrapper';
import PrimaryButton from '../../components/primaryButton';
import CustomTextInput from '../../components/customTextInput';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextWrapper} from '../../components/textWrapper';
import {navigate} from '../../utils/navigationService';
import screens from '../../utils/screens';

export const RegistrationScreen = () => {
  const {top} = useSafeAreaInsets();
  const [filedState, updateState] = React.useState({
    name: '',
    dept: '',
    taluk: '',
    designation: '',
    aadhar: '',
    mobile: '',
    fsl: '',
    emailid: '',
  });

  const renderItem = (item: {
    placeholder: string;
    value: string | number;
    onChange: Function;
  }) => (
    <CustomTextInput
      value={item.value}
      autoCorrect={false}
      onChangeText={item.onChange}
      placeholder={item?.placeholder}
      tstyle={{borderWidth: 0, marginTop: 10}}
    />
  );

  const renderFields = () => {
    return (
      <React.Fragment>
        {[
          {
            placeholder: 'Name',
            value: filedState.name,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, name: txt}));
            },
          },
          {
            placeholder: 'Dept ID*',
            value: filedState.dept,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, dept: txt}));
            },
          },
          {
            placeholder: 'Taluk*',
            value: filedState.taluk,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, taluk: txt}));
            },
          },
          {
            placeholder: 'Designation*',
            value: filedState.designation,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, designation: txt}));
            },
          },
          {
            placeholder: 'DOB/Aadhar*',
            value: filedState.aadhar,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, aadhar: txt}));
            },
          },
          {
            placeholder: 'Mobile*',
            value: filedState.mobile,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, mobile: txt}));
            },
          },
          {
            placeholder: 'Police Station/FSL Code*',
            value: filedState.fsl,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, fsl: txt}));
            },
          },
          {
            placeholder: 'Govt. Email ID*',
            value: filedState.emailid,
            onChange: (txt: string) => {
              updateState(prev => ({...prev, emailid: txt}));
            },
          },
        ].map(renderItem)}
      </React.Fragment>
    );
  };

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 20}}
      style={{backgroundColor: '#F9FAFE'}}>
      <ViewWrapper
        customStyle={{
          flex: 1,
          paddingTop: top,
          backgroundColor: '#F9FAFE',
          paddingHorizontal: 30,
        }}>
        {renderFields()}
        <PrimaryButton
          title="Submit"
          titleStyle={{color: '#fff'}}
          customStyle={{
            width: '100%',
            borderWidth: 0,
            marginTop: 30,
            backgroundColor: colors.green,
          }}
        />
        <ViewWrapper
          row
          center
          justifyCenter
          customStyle={{marginVertical: 15}}>
          <TextWrapper
            h3
            align
            title={'Have an account? '}
            style={{
              color: '#000000',
              fontWeight: '500',
            }}
          />
          <TextWrapper
            h3
            align
            onPress={() => {
              navigate(screens.LOGIN);
            }}
            title={'Sign In'}
            style={{
              color: colors.green,
              fontWeight: '500',
            }}
          />
        </ViewWrapper>
      </ViewWrapper>
    </KeyboardAwareScrollView>
  );
};
