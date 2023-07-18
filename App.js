import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import ImageViewer from './ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import Button from './Button';
import CircleButton from './CircleButton';
import IconButton from './IconButton';
import EmojiList from './EmojiList';
import EmojiPicker from './EmojiPicker';
import EmojiSticker from './EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const PlaceholderImage = require('./assets/img.png');

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
        {console.log(pickedEmoji)}
        {pickedEmoji !== null ? (
          <View style={styles.stickerContainer}>
            <EmojiSticker imageSize={60} stickerSource={pickedEmoji} />
          </View>
        ) : null}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon='save-alt'
              label='Save'
              onPress={onSaveImageAsync}
            />

            <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
              <EmojiList
                onSelect={setPickedEmoji}
                onCloseModal={onModalClose}
              />
            </EmojiPicker>
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme='primary'
            label='Choose a photo'
            onPress={pickImageAsync}
          />
          <Button
            label='Use this photo'
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      <StatusBar style='auto' />
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  stickerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: 100 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
