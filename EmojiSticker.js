import { Image, View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

export default function EmojiSticker({ imageSize, stickerSource }) {
  return (
    <View style={styles.sticker}>
      <Image
        source={stickerSource}
        resizeMode='contain'
        style={{
          width: imageSize,
          height: imageSize,
          alignItems: 'center',
          alignContent: 'center',
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  sticker: {
    top: -350,
  },
});
