import { View, Text, Button, StyleSheet } from 'react-native';

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela Settings</Text>
      <Button 
        title="Ir para Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24
  }
});