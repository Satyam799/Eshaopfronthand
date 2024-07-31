import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const Loader = () => {
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateYAnim, {
          toValue: -50,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [translateYAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ball, { transform: [{ translateY: translateYAnim }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    width: 50,
    height: 50,
    backgroundColor: '#33cb2b',
    borderRadius: 25,
    shadowColor: '#f8ffeb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default Loader;
