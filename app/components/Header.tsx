import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AlignLeft, Bell } from 'react-native-feather';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const Header = () => {
  return (
    <View style={styles.header}>
      <Pressable style={styles.iconWrapper}>
        <AlignLeft stroke="#fff" width={24} height={24} />
      </Pressable>

      <Text style={styles.headerText}>TestApp</Text>

      <Pressable style={styles.iconWrapper}>
        <Bell stroke="#fff" width={24} height={24} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    backgroundColor: '#170c34',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.3),
    borderBottomLeftRadius:10,
    borderBottomRightRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginBottom:responsiveHeight(.5)
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 100,
  },
});
