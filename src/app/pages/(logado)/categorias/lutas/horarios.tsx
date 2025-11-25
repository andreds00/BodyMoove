import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';

export default function HorariosLutas() {
    const router = useRouter();
  const horarios = [
    { hora: '7h00', nivel: 'Iniciante' },
    { hora: '9h20', nivel: 'Intermediário' },
    { hora: '11h30', nivel: 'Iniciante' },
    { hora: '14h30', nivel: 'Intermediário' },
    { hora: '15h40', nivel: 'Avançado' },
    { hora: '18h30', nivel: 'Intermediário' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.local}>Kombat</Text>
        <Text style={styles.title}>E o seu melhor horário?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.options}>
        {horarios.map((item, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.hora}>{item.hora}</Text>
            <Text style={styles.nivel}>{item.nivel}</Text>
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
    alignItems: 'center',
  },
  local: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  options: {
    gap: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: 'center',
  },
  hora: {
    color: '#003973',
    fontSize: 20,
    fontWeight: '700',
  },
  nivel: {
    color: '#003973',
    fontSize: 16,
    marginTop: 5,
    textTransform: 'capitalize',
  },
});
