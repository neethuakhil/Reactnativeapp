import { Image, View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

export default function EmojiSticker({ imageSize, stickerSource }) {
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const scaleImage = useSharedValue(imageSize);
  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      }
    },
  });
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });
  return (
    //<View style={styles.sticker}>
    <View style={{ top: -350 }}>
      <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
        <AnimatedImage
          source={stickerSource}
          resizeMode='contain'
          style={{
            width: imageSize,
            height: imageSize,
            alignItems: 'center',
            alignContent: 'center',
          }}
        />
      </TapGestureHandler>
    </View>
    //</View>
  );
}
const styles = StyleSheet.create({
  sticker: {
    top: -350,
  },
});
