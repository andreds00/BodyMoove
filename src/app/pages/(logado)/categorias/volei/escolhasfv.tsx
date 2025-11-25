import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';

export default function LocaisFutevolei() {
    const router = useRouter();
  const locais = [
    { nome: 'Arena Prime Beach Sports', distancia: '4 KM de distância' },
    { nome: 'Escopo Beach', distancia: '5 KM de distância' },
    { nome: 'Arena Litoral', distancia: '6,7 KM de distância' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Qual é o melhor lugar para praticar hoje?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.options}>
        {locais.map((local, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.localNome}>{local.nome}</Text>
            <Text style={styles.localDistancia}>{local.distancia}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003973',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  options: {
    gap: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  localNome: {
    color: '#003973',
    fontSize: 18,
    fontWeight: '700',
  },
  localDistancia: {
    color: '#003973',
    fontSize: 14,
    marginTop: 5,
  },
});
