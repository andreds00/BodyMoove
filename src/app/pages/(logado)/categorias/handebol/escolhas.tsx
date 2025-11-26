import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Region } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '@/constants/Colors';
import { router } from 'expo-router';

type HandebolPlace = {
  nome: string;
  distancia: string;
  endereco: string;
  latitude: number;
  longitude: number;
  destaque?: string;
};

const locais: HandebolPlace[] = [
  {
    nome: 'Federação Paulista de Handebol',
    distancia: '1 km de distância',
    endereco: 'Rua Abolição, 201 - Bela Vista',
    latitude: -23.5588,
    longitude: -46.6454,
    destaque: 'Quadra oficial indoor e clínicas técnicas.',
  },
  {
    nome: 'H10 Escola de Esportes',
    distancia: '4 km de distância',
    endereco: 'Av. Dr. Arnaldo, 351 - Sumaré',
    latitude: -23.5427,
    longitude: -46.6658,
    destaque: 'Treinos para todas as idades com material incluso.',
  },
  {
    nome: 'ACM Centro',
    distancia: '8 km de distância',
    endereco: 'Rua da Consolação, 247 - Consolação',
    latitude: -23.5472,
    longitude: -46.6497,
    destaque: 'Programação semanal e vestiários completos.',
  },
];

export default function LocaisHandebol() {
  const [region, setRegion] = useState<Region | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const locationModule = await import('expo-location');
        const requestPermission = locationModule?.requestForegroundPermissionsAsync;
        const getCurrentPosition = locationModule?.getCurrentPositionAsync;
        const accuracy = locationModule?.Accuracy?.Balanced;

        if (!requestPermission || !getCurrentPosition || !accuracy) {
          throw new Error('expo-location não está disponível neste build.');
        }

        const { status } = await requestPermission();
        if (status !== 'granted') {
          if (mounted) {
            setLocationError('Ative a localização para ver quadras próximas.');
            setLoadingLocation(false);
          }
          return;
        }

        const position = await getCurrentPosition({ accuracy });
        if (mounted) {
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          });
        }
      } catch (_) {
        if (mounted) setLocationError('Não foi possível obter sua localização.');
      } finally {
        if (mounted) setLoadingLocation(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

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
        <Text style={styles.title}>Quadras de Handebol</Text>
      </LinearGradient>

      <View style={styles.main}>
        <Text style={styles.subtitle}>Selecione um local para reservar seu horário</Text>

        {loadingLocation ? (
          <ActivityIndicator size="large" color={colors.blue} style={{ marginVertical: 20 }} />
        ) : region ? (
          <MapView style={styles.map} region={region} showsUserLocation>
            {locais.map((local) => (
              <Marker
                key={local.nome}
                coordinate={{ latitude: local.latitude, longitude: local.longitude }}
                title={local.nome}
                description={local.endereco}
              />
            ))}
          </MapView>
        ) : (
          <Text style={styles.errorText}>
            {locationError || 'Ative a localização para visualizar o mapa.'}
          </Text>
        )}

        <ScrollView contentContainerStyle={styles.list}>
          {locais.map((local, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/pages/(logado)/categorias/handebol/horarios',
                  params: {
                    localNome: local.nome,
                    localEndereco: local.endereco,
                  },
                })
              }
            >
              <Text style={styles.localNome}>{local.nome}</Text>
              <Text style={styles.localEndereco}>{local.endereco}</Text>
              <Text style={styles.localDistancia}>{local.distancia}</Text>
              {local.destaque ? (
                <Text style={styles.localDestaque}>{local.destaque}</Text>
              ) : null}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
  main: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.darkGray,
    marginBottom: 12,
  },
  map: {
    width: '100%',
    height: 220,
    borderRadius: 16,
  },
  errorText: {
    textAlign: 'center',
    color: colors.darkGray,
    marginBottom: 12,
  },
  list: {
    paddingVertical: 18,
    gap: 14,
  },
  card: {
    backgroundColor: '#f6f8ff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e0e6ff',
  },
  localNome: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.darkBlue,
  },
  localEndereco: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 4,
  },
  localDistancia: {
    fontSize: 13,
    color: colors.darkGray,
    marginTop: 4,
  },
  localDestaque: {
    fontSize: 13,
    color: colors.blue,
    marginTop: 6,
  },
});

