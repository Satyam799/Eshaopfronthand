import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function CartComponent({ list }) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('singleproduct', { items: list })}>
      <View style={styles.container}>
        <Image resizeMode='contain' style={styles.imageStyling} source={{ uri: list.image }} />
        <View style={styles.smallContainer}>
          <Text style={styles.name}>{list.name}</Text>
          <Text style={styles.price}>{list.description}</Text>
        </View>
      </View>
      
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageStyling: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: width - 30,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  smallContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
});
