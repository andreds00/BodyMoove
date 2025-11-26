import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '@/constants/Colors';

export default function HorariosHandebol() {
  const router = useRouter();
  const params = useLocalSearchParams<{ localNome?: string; localEndereco?: string }>();

  const horarios = [
    { hora: '08h00', nivel: 'iniciante' },
    { hora: '09h30', nivel: 'intermediário' },
    { hora: '11h00', nivel: 'avançado' },
    { hora: '14h00', nivel: 'intermediário' },
    { hora: '16h30', nivel: 'iniciante' },
    { hora: '19h00', nivel: 'avançado' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.header}
        colors={[colors.darkBlue, colors.blue, colors.lightBlue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Agende seu horário</Text>
      </LinearGradient>

      <Text style={styles.subtitle}>Escolha o melhor horário e nível da partida</Text>

      {params.localNome && (
        <View style={styles.localInfo}>
          <Text style={styles.localLabel}>Quadra selecionada</Text>
          <Text style={styles.localNome}>{params.localNome}</Text>
          {!!params.localEndereco && <Text style={styles.localEndereco}>{params.localEndereco}</Text>}
        </View>
      )}

      <ScrollView contentContainerStyle={styles.options}>
        {horarios.map((item, index) => (
          <Link
            key={`${item.hora}-${index}`}
            href={{
              pathname: '/pages/(logado)/categorias/handebol/confimacao/page',
              params: {
                localNome: params.localNome || 'Quadra não informada',
                localEndereco: params.localEndereco || '',
                horario: item.hora,
                nivel: item.nivel,
              },
            }}
            asChild
          >
            <TouchableOpacity style={styles.button}>
              <Text style={styles.hora}>{item.hora}</Text>
              <Text style={styles.nivel}>{item.nivel}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 12,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  subtitle: {
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  localInfo: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    backgroundColor: '#f0f4ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9e1ff',
  },
  localLabel: {
    fontSize: 12,
    color: colors.darkGray,
    textTransform: 'uppercase',
  },
  localNome: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkBlue,
  },
  localEndereco: {
    fontSize: 13,
    color: colors.darkGray,
    marginTop: 4,
  },
  options: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 14,
  },
  button: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d9e1ff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#f8faff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hora: {
    color: colors.darkBlue,
    fontSize: 18,
    fontWeight: 'bold',
  },
  nivel: {
    color: colors.darkGray,
    fontSize: 14,
    textTransform: 'capitalize',
  },
});

