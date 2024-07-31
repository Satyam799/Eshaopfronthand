import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function ConfirmComponent({ list }) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('singleproduct', { items: list })}>
      <View style={styles.container}>
        <Image resizeMode='contain' style={styles.imageStyling} source={{ uri: list.image }} />
        <View style={styles.spcebar}/>
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
    width: width - 120,
    alignSelf: 'center',
    marginVertical: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderBottomWidth:2,
    borderColor:'white'
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
  spcebar:{
    marginRight:20
  }
});
