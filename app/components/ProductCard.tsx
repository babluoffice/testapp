import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { IProduct } from '../screen/Home';
import { responsiveWidth } from 'react-native-responsive-dimensions';

interface Props {
  item: IProduct;
}

const ProductCard: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: item.thumbnail }}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.brand}>{item.brand}</Text>
       <View style={styles.price_container}> <Text style={styles.price}>₹{item.price}</Text>
       <Text style={styles.discount}>Save {item.discountPercentage}%</Text></View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
    width: responsiveWidth(45),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 150,
  },
  info: {
    padding: responsiveWidth(2),
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  brand: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  discount: {
    fontSize: 12,
    color: 'green',
    marginTop: 2,
  },
  price_container:{
    display:'flex', 
    flexDirection:'row',
    gap:8
  }
});
