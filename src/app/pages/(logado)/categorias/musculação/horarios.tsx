import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';

export default function HorariosMusculação() {
    const router = useRouter();
  const horarios = [
    { hora: '7h00', nivel: 'iniciante' },
    { hora: '9h00', nivel: 'avançado' },
    { hora: '10h00', nivel: 'intermediária' }, 
    { hora: '17h30', nivel: 'avançado' }, 
    { hora: '18h00', nivel: 'iniciante' }, 
    { hora: '20h30', nivel: 'iniciante' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.local}> Mob Gym </Text>
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
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    padding: 15, 
    borderWidth: 1, 
    borderColor: '#D9D9D9', 
    borderRadius: 30, 
    marginBottom: 12, 
    marginTop: 10, 
  }, 
  hora: { 
    marginLeft: 10, 
    fontSize: 16, 
    color: '#003973', 
  }, 
  nivel: { 
    marginLeft: 10, 
    fontSize: 10, 
    color: '#586583', 
  }, 
});