import React, {ReactNode} from 'react';
import { Alert } from 'react-native';
import Modal from 'react-native-modal';

function CustomModalWrapper(props: any) {
  const {
    isVisible,
    modalCustomStyle,
    onCloseModal = () => {},
    backdropColor = '#fff',
    customBackdrop,
    backdropOpacity,
    ...rest
  } = props;

  const _handleModal = () => {
    onCloseModal();
  };

  return (
    //@ts-ignore
    <Modal
      useNativeDriverForBackdrop={true}
      hasBackdrop
      isVisible={isVisible}
      style={modalCustomStyle}
      backdropColor={backdropColor}
      onBackdropPress={_handleModal}
      customBackdrop={customBackdrop}
      backdropOpacity={backdropOpacity}
      {...rest}>
      {props?.children}
    </Modal>
  );
}

CustomModalWrapper.defaultProps = {
  title: '',
  buttonText: '',
  rightIcon: true,
  isVisible: false,
  modalCustomStyle: {},
  onCloseModal: () => {},
  customViewEnable: false,
  onPressButton: () => {},
  renderCustomContent: () => {},
};

export default React.memo(CustomModalWrapper);
