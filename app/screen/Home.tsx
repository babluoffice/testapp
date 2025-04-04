import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import HomeCarousel from '../components/HomeCarousel';
import ProductCard from '../components/ProductCard';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Header from '../components/Header';
import { API_URL } from '@env'




export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  brand: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  images: string[];
  thumbnail: string;
}

const Home = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}products`, {
        timeout: 10000, 
      });
      setData(response.data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{paddingTop: 5}}>
        <Header />
        {loading ? (
        <ActivityIndicator size="large" color="#170c34" style={styles.loader} />
      ) : (
        <View style={{paddingTop:10}}>
          <HomeCarousel data={data} />

          <View style={{marginTop: responsiveHeight(3)}}>
            <Text style={styles.title}>Our Product</Text>
            <View style={styles.product_container}>
              {data.length > 0 &&
                data.map((item: IProduct, i) => {
                  return <ProductCard key={i} item={item} />;
                })}
            </View>
          </View>
        </View>
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  product_container: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    marginTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(6),
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
  },
  title: {
    color: '#212121',
    fontSize: 20,
    fontWeight: 500,
    paddingLeft: 12,
  },
});
