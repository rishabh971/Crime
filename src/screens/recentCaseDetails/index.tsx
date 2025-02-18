import {
  View,
  Text,
  Image,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import ReactNativeBlobUtil from 'react-native-blob-util';
import axios from 'axios';
import Device from '../../utils/device';
import {showErrorToast, showSuccessToast} from '../../components/toast';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useSelector } from 'react-redux';

export const RecentCaseDetails = ({route}: any) => {
  const {item} = route?.params;
  const [loader, setLoader] = React.useState(false);
  const {token} = useSelector(store => store?.auth);

  const generatePDF = async () => {
    try {
      const htmlContent = `
        <h1>Case Details</h1>
        <p><strong>Date:</strong> ${item.date}</p>
        <p><strong>Time:</strong> ${item.time}</p>
        <p><strong>City:</strong> ${item.city}</p>
        <p><strong>Pincode:</strong> ${item.pincode}</p>
        <p><strong>Crime Type:</strong> ${item.crimetype}</p>
      `;

      const options = {
        html: htmlContent,
        fileName: 'CaseDetails',
        directory: 'Documents',
      };
      const file = await RNHTMLtoPDF.convert(options);
      console.log('file', file?.filePath);
      uploadPdf(file.filePath);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const downloadPdf = (links: string, type = 'pdf') => {
    const link =
      'https://vedicon.in.objectstorage.pappayacloud.com/image/fc2df70c-aadd-438b-883b-f4bf1f39f612.pdf';
    const {config, fs, ios, android} = ReactNativeBlobUtil;
    const date = new Date();
    console.log('inside');
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
    config(configOption)
      .fetch('GET', link, {})
      .then(res => {
        showSuccessToast('File Downloaded Successfully');
      })
      .catch(e => {
        console.log('errro in the download', e);
      });
  };

  const uploadPdf = pdfPath => {
    setLoader(true);
    const uploadUrl = 'https://api.vedicon.in/upload-file';
    const formData = new FormData();

    formData.append('file', {
      uri: Platform.OS === 'ios' ? pdfPath.replace('file://', '') : pdfPath,
      name: 'test.pdf',
      type: 'application/pdf',
    });

    console.log('fromdata', formData);
    downloadPdf('', 'pdf')
    axios({
      method: 'post',
      url: uploadUrl,
      data: formData,
      headers: {
        accept: 'application/json',
        timezone: '0',
        'Content-Type': 'multipart/form-data',
        appVersion: Device?.getVersion(),
        // Authorization: `Bearer ${token}`
      },
      timeout: 30000,
    })
      .then(response => {
        const res = response?.data;
        if (res?.statusCode == 200) {
          showSuccessToast(res?.message);
        }
      })
      .catch(error => {
        showErrorToast(error?.message || 'Upload failed');
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const crimeSceneImages = [
    'https://blog.puritanmedproducts.com/hs-fs/hubfs/GettyImages-1159196095.jpeg?width=1200&name=GettyImages-1159196095.jpeg',
    'https://www.stedwards.edu/sites/default/files/styles/modal_full/public/2024-08/2020928_Crime_Scene_Investigation_Class_Edits_017_maxWidth_900_maxHeight_900_ppi_72_quality_80.jpg?itok=BOiTB63i',
    'https://cms-artifacts.artlist.io/content/motion-array/431731/Crime_Scene_Photography_high_resolution_preview_431731.jpg?Expires=2036686640856&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=ntltF3JYZyxdWyKPFjRFJurCugau3NEUSoHyXEZtJyOWa55Ku9JXtR7EKvw6FtW5Zf~IXLutMJhcTkyCdkbLKJuqu95DI4QyOxwdQtznt0~wJcFdR3JObC62jnhqlCk6pwkYk3dGLM2EL-3mS~WvS4n~dPrx8jMEAK8lDZ4wN3r6fUmyX4PiZ~ou-fhMiXQ936mMI6BcC4Ghp~GNk0N0xI4KYZxkzqYBud0qEDMfMPZdec37ZeZsIj6RWAV5vkFbVlD4qvjLrQTh~affRXQdqGuJsmcUaRNxqLKOzWoQgnfqsPmhTPIegpYpJYFjOxyKQ0o-pjDHwyQbtP8EdDl~yQ__',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7YTOq2jPFTHMSgEw4TkwJwc2YGbyEvMfCmQ&s',
  ];
  return (
    <>
      <View style={styles.card}>
        <Text style={styles.header}>Crime Scene Investigation Report</Text>
        <View style={{flexDirection: 'row', marginBottom: 6}}>
          <Text style={styles.title}>Case ID: </Text>
          <Text style={styles.desc}>{item?.caseNo}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 6}}>
          <Text style={styles.title}>Crime Type: </Text>
          <Text style={styles.desc}>{item?.crimeType}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 6}}>
          <Text style={styles.title}>City: </Text>
          <Text style={styles.desc}>{item?.city}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 6}}>
          <Text style={styles.title}>Date: </Text>
          <Text style={styles.desc}>{item?.date}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 6}}>
          <Text style={styles.title}>Time: </Text>
          <Text style={styles.desc}>{item?.time}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 3}}>
          <Text style={styles.title}>Evidence Details:</Text>
        </View>
        <Text style={styles.desc}>{item?.remarksByIO}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.header}>Evidence Images</Text>
        <View style={styles.imageGrid}>
          {crimeSceneImages.map((image, index) => (
            <Image key={index} source={{uri: image}} style={styles.image} />
          ))}
        </View>
      </View>
      <Button
        title="Download PDF"
        onPress={() => {
          generatePDF();
        }}
      />
      {loader && (
        <ActivityIndicator
          size={'large'}
          color={'#00000'}
          animating={loader}
          style={{...StyleSheet.absoluteFillObject}}
        />
      )}
    </>
  );
};
