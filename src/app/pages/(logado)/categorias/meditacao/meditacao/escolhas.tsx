import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function LocaisMeditação() {
  const router = useRouter();

  const locais = [
    { nome: 'Studio Sunset', distancia: '2 KM' },
    { nome: 'Eywa', distancia: '3 KM' },
    { nome: 'AYMA', distancia: '7 KM' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bannerText}>Meditação</Text>
        <Text style={styles.title}>Qual é o melhor lugar para praticar hoje?</Text>
      </View>

      <View>
        {locais.map((local, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => router.replace('/pages/(logado)/categorias/meditacao/confimacao/page')}
          >
            <View style={styles.cardRow}>
              <Text style={styles.localNome}>{local.nome}</Text>
              <View style={styles.distanciaContainer}>
                <Text style={styles.localDistancia}>{local.distancia}</Text>
                <Text style={styles.localTextoDistancia}>de distância</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 30,
  },
  bannerText: {
    color: '#003973',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    color: '#586583',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 18,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    borderColor: '#D9D9D9',
    borderWidth: 1,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  localNome: {
    color: '#003973',
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  distanciaContainer: {
    alignItems: 'flex-end',
  },
  localDistancia: {
    color: '#003973',
    fontSize: 18,
    fontWeight: 'bold',
  },
  localTextoDistancia: {
    color: '#003973',
    fontSize: 12,
  },
});
