import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewWrapper} from '../../components/viewWrapper';
import React, {useEffect} from 'react';
import CustomTextInput from '../../components/customTextInput';
import PrimaryButton from '../../components/primaryButton';
import colors from '../../utils/colors';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {images} from '../../asset';
import {useDispatch} from 'react-redux';
import {normalize} from '../../utils/dimensions';
import {TextWrapper} from '../../components/textWrapper';
import {addCase} from '../../redux/addCaseReducer/action';
import DateTimePicker from '@react-native-community/datetimepicker';
import {showErrorToast, showSuccessToast} from '../../components/toast';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Alert, Linking} from 'react-native';
import {galleryPick, OpenCamera} from '../../utils/imageHandler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomHeader} from '../../components/customHeader';
import CustomModalWrapper from '../../components/customModalWrapper';
import Geolocation from '@react-native-community/geolocation';
import ReactNativeBlobUtil from 'react-native-blob-util';

export const NewCaseScreen = () => {
  const [fieldValues, setFieldValues] = React.useState({
    date: '',
    time: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    pincode: '',
    crimetype: '',
    remark: '',
    latitude: '',
    longitude: '',
  });
  const [error, setError] = React.useState({
    date: '',
    time: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    pincode: '',
    crimetype: '',
    remark: '',
    latitude: '',
    longitude: '',
  });
  const dispatch = useDispatch();
  const {top} = useSafeAreaInsets();
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [pdfPath, setPdfPath] = React.useState('');
  const [imagePath, setImagePath] = React.useState({path: images.CAMERA});
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showTimePicker, setShowTimePicker] = React.useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(selectedDate);
      setFieldValues(prev => ({...prev, date: formattedDate}));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const hours = String(selectedTime.getHours()).padStart(2, '0');
      const minutes = String(selectedTime.getMinutes()).padStart(2, '0');
      // const seconds = String(selectedTime.getSeconds()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      setFieldValues(prev => ({...prev, time: formattedTime}));
    }
  };

  const openCameraOrGallery = () => {
    setOpen(prev => !prev);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const camera = async () => {
    try {
      const res = await OpenCamera();
      res?.path && setImagePath(res);
      setOpen(false);
    } catch (error) {
      setOpen(false);
    }
  };

  const gallery = async () => {
    try {
      await galleryPick(
        (res: any) => {
          res?.path && setImagePath(res);
          setOpen(false);
        },
        () => {
          setOpen(false);
        },
      );
    } catch (error) {
      setOpen(false);
    }
  };

  const addCaseApi = () => {
    setLoader(true);
    generatePDF();
    dispatch(
      addCase({
        date: fieldValues.date,
        time: fieldValues.time,
        permanentAdd: fieldValues.address1,
        tempAdd: fieldValues.address2,
        state: fieldValues.state,
        city: fieldValues.city,
        pincode: fieldValues.pincode,
        crimeType: fieldValues.crimetype,
        remarksByIO: fieldValues.remark,
      }),
    )
      .unwrap()
      .then((res: any) => {
        if (res?.status == 200) {
          showSuccessToast(res?.message);
          // navigate(screens.BOTTOMSTACK);
        }
      })
      .catch((error: any) => {
        showErrorToast(error?.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const onChangeTextHandler = (index, value) => {
    const keys = [
      'date',
      'time',
      'address1',
      'address2',
      'state',
      'city',
      'pincode',
      'crimetype',
      'remark',
      'latitude',
      'longitude',
    ];
    setFieldValues(prev => ({...prev, [keys[index]]: value}));
  };

  useEffect(() => {
    const getISTTime = () => {
      const currentDate = new Date();
      const utcOffset = currentDate.getTimezoneOffset() * 60000;
      const istOffset = 5.5 * 60 * 60000;
      const istTime = new Date(currentDate.getTime() + utcOffset + istOffset);
      const hours = String(istTime.getHours()).padStart(2, '0');
      const minutes = String(istTime.getMinutes()).padStart(2, '0');
      const seconds = String(istTime.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };
    const getISTDate = () => {
      const currentDate = new Date();
      const utcOffset = currentDate.getTimezoneOffset() * 60000;
      const istOffset = 5.5 * 60 * 60000;
      const istTime = new Date(currentDate.getTime() + utcOffset + istOffset);
      const month = String(istTime.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const date = String(istTime.getDate()).padStart(2, '0');
      const year = istTime.getFullYear();
      return `${month}/${date}/${year}`;
    };

    setFieldValues(prev => ({...prev, time: getISTTime(), date: getISTDate()}));
  }, []);

  const generatePDF = async () => {
    try {
      const htmlContent = `
        <h1>Case Details</h1>
        <p><strong>Date:</strong> ${fieldValues.date}</p>
        <p><strong>Time:</strong> ${fieldValues.time}</p>
        <p><strong>Address 1:</strong> ${fieldValues.address1}</p>
        <p><strong>Address 2:</strong> ${fieldValues.address2}</p>
        <p><strong>State:</strong> ${fieldValues.state}</p>
        <p><strong>City:</strong> ${fieldValues.city}</p>
        <p><strong>Pincode:</strong> ${fieldValues.pincode}</p>
        <p><strong>Crime Type:</strong> ${fieldValues.crimetype}</p>
        <p><strong>Remark:</strong> ${fieldValues.remark}</p>
        <p><strong>Longitude:</strong> ${fieldValues.longitude}</p>
        <p><strong>Latitude:</strong> ${fieldValues.latitude}</p>
      `;

      const options = {
        html: htmlContent,
        fileName: 'CaseDetails',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      setPdfPath(file.filePath);
      // console.log(file.filePath, 'file.filePath');
      Alert.alert('Download PDF', '', [
        {text: 'Yes', onPress: () => viewPDF(file.filePath, 'pdf')},
        {text: 'No', style: 'cancel'},
      ]);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const viewPDF = async (link: string, type = 'pdf') => {
    console.log('linkkkkkk', link);
    const date = new Date();
    const file_URL = 'https://CaseDetails.pdf';
    const {config, fs, ios, android} = ReactNativeBlobUtil;
    const configOption = Platform.select({
      ios: {
        fileCache: true,
        path: `${fs.dirs.DocumentDir}/${type}${Math.floor(
          date.getTime() + date.getSeconds() / 2,
        )}.pdf`,
        appendExt: type,
      },
      android: {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${fs.dirs.LegacyDownloadDir}/${Math.floor(
            date.getTime() + date.getSeconds() / 2,
          )}/${type}`,
          description: 'Downloading PDF file',
        },
      },
    });
    console.log('configOption', configOption);
    config(configOption)
      .fetch('GET', file_URL, {})
      .then(res => {
        if (Platform.OS === 'ios') {
          ios.previewDocument(`file://${res.data}`);
        }
        if (Platform.OS === 'android') {
          Alert.alert('File downloaded successfully');
        }
      })
      .catch(e => {
        Alert.alert('Error in downloading');
      });
  };

  const renderItem = (item, index) => {
    return (
      <ViewWrapper>
        <CustomTextInput
          value={item.value.toString()}
          onChangeText={text => onChangeTextHandler(index, text)}
          placeholder={item.placeholder}
          tstyle={{
            marginTop: 10,
            borderColor: '#F4F4F4',
            color: !item.editable ? 'grey' : 'black',
          }}
          editable={item.editable}
        />
      </ViewWrapper>
    );
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const coords = position?.coords;
        console.log('coords?.latitude', coords?.latitude);
        setFieldValues((prev: any) => ({
          ...prev,
          latitude: coords?.latitude,
          longitude: coords?.longitude,
        }));
      },
      error => {
        console.log('error', error);
      },
      {},
    );
  }, []);

  return (
    <ViewWrapper
      customStyle={{flex: 1, backgroundColor: '#F9FAFE', paddingTop: top}}>
      <CustomHeader screenName="New Case" />
      <KeyboardAwareScrollView>
        <ViewWrapper
          customStyle={{
            flex: 1,
            paddingHorizontal: 30,
          }}>
          {[
            {
              value: fieldValues.longitude,
              placeholder: 'Longitude',
              editable: false,
            },
            {
              value: fieldValues.latitude,
              placeholder: 'Latitude',
              editable: false,
            },
            {value: fieldValues.date, placeholder: 'Date', editable: false},
            {value: fieldValues.time, placeholder: 'Time', editable: false},
            {
              value: fieldValues.address1,
              placeholder: 'Address 1*',
              editable: true,
            },
            {
              value: fieldValues.address2,
              placeholder: 'Address 2*',
              editable: true,
            },
            {value: fieldValues.state, placeholder: 'State*', editable: true},
            {value: fieldValues.city, placeholder: 'City*', editable: true},
            {
              value: fieldValues.pincode,
              placeholder: 'Pincode*',
              editable: true,
            },
            {
              value: fieldValues.crimetype,
              placeholder: 'Crime Type*',
              editable: true,
            },
            {
              value: fieldValues.remark,
              placeholder: 'Remarks by I.O.*',
              editable: true,
            },
          ].map(renderItem)}
          <ViewWrapper row center customStyle={{marginVertical: 20}}>
            <ViewWrapper
              isDisabled={false}
              onPress={openCameraOrGallery}
              customStyle={{width: 40, height: 40}}>
              <Image
                source={images.CAMERA}
                style={{resizeMode: 'contain', height: '100%', width: '100%'}}
              />
            </ViewWrapper>
            <TextWrapper
              h5
              title={'Take picture of the crime scene'}
              style={{fontWeight: '400', color: '#8489A3', marginLeft: 20}}
            />
          </ViewWrapper>

          <PrimaryButton
            title="Submit"
            disable={false}
            onPress={addCaseApi}
            customStyle={{
              backgroundColor: colors.green,
              borderWidth: 0,
              width: '100%',
            }}
            titleStyle={{color: '#fff'}}
          />
        </ViewWrapper>
        <CustomModalWrapper
          avoidKeyboard={true}
          animationOut="fadeOut"
          backdropOpacity={0.1}
          modalCustomStyle={{margin: 0}}
          onCloseModal={onCloseModal}
          isVisible={open}>
          <ViewWrapper
            row
            evenly
            customStyle={{
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
            }}>
            <TextWrapper h3 title={'Open Camera'} onPress={camera} />
            <TextWrapper h3 title={'Open Gallery'} onPress={gallery} />
          </ViewWrapper>
        </CustomModalWrapper>
      </KeyboardAwareScrollView>
      {loader && (
        <ActivityIndicator
          size={'large'}
          color={'#00000'}
          animating={loader}
          style={{...StyleSheet.absoluteFillObject}}
        />
      )}
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={new Date()}
          onChange={handleDateChange}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        />
      )}
    </ViewWrapper>
  );
};
