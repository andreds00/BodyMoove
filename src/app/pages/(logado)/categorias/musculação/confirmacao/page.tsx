import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';

export default function ConfirmacaoMusculação() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.content}>
          <Text style={styles.message}>
            Parabéns por confirmar sua aula de{"\n"}
            <Text style={styles.bold}>Crossfit Avançado </Text> no{" "}
            <Text style={styles.bold}>Mob Gym</Text>{" "}
            às <Text style={styles.bold}>9h00!</Text>
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#003973',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 30,
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#003973',
    fontSize: 16,
    fontWeight: '600',
  },
});
