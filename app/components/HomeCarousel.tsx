import React from 'react';
import {
  View,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import { IProduct } from '../screen/Home';


const { width } = Dimensions.get('window');

interface Props {
  data: IProduct[];
  onPressItem?: (item: IProduct) => void;
}

const HomeCarousel: React.FC<Props> = ({ data, onPressItem }) => {
  const ref = React.useRef<ICarouselInstance>(null);

  return (
    <Carousel
      ref={ref}
      width={width}
      height={width / 2}
      data={data}
      loop
      autoPlay
      autoPlayInterval={3000}
      scrollAnimationDuration={800}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => onPressItem?.(item)}
        >
          <FastImage
            style={styles.image}
            source={{
              uri: item?.thumbnail,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.caption}>
            <Text style={styles.title} numberOfLines={1}>
              {item?.title}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
};

export default HomeCarousel;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  caption: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    padding: 8,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
