import { useState } from 'react';
import { FlatList, StyleSheet, Pressable, Image } from 'react-native';

export default function emojiList({ onSelect, onCloseModal }) {
  const [emoji] = useState([
    require('./assets/em1.png'),
    require('./assets/em2.png'),
    require('./assets/em3.png'),
    require('./assets/em4.png'),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalSc
      rollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            onPress={() => {
              onSelect(item);
              onCloseModal();
            }}
          >
            <Image source={item} key={index} style={styles.image} />
          </Pressable>
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
