import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import galleryIcon from '../Assets/gallery.png';
import cameraIcon from '../Assets/camera.png';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const BottomSheet = ({visible, onClose, onImageSelected}) => {
  const selectFromCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.error) {
        const imageUri = response.assets[0].uri;
        onImageSelected(imageUri);
      }
    });
    onClose();
  };

  const selectFromGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.error) {
        const imageUri = response.assets[0].uri;
        onImageSelected(imageUri);
      }
    });
    onClose();
  };

  return (
    <View>
      <Modal
        style={{width: '100%', marginLeft: 0, marginBottom: 0}}
        isVisible={visible}
        onBackButtonPress={onClose}>
        <View
          style={{
            position: 'absolute',
            height: 150,
            bottom: 0,
            width: '100%',
            backgroundColor: 'white',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View>
            <TouchableOpacity onPress={selectFromCamera}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderColor: 'black',
                  borderWidth: 1.5,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image style={{height: 30, width: 30}} source={cameraIcon} />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 15,
                fontWeight: 'bold',
                marginTop: 3,
              }}>
              Camera
            </Text>
          </View>

          <View>
            <TouchableOpacity onPress={selectFromGallery}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderColor: 'black',
                  borderWidth: 1.5,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image style={{height: 30, width: 30}} source={galleryIcon} />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 15,
                fontWeight: 'bold',
                marginTop: 3,
              }}>
              Gallery
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BottomSheet;
