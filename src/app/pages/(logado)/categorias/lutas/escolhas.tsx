import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Region } from 'react-native-maps';
import colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

type GooglePlace = {
  place_id: string;
  name: string;
  vicinity?: string;
  rating?: number;
  user_ratings_total?: number;
  geometry: {
    location: { lat: number; lng: number };
  };
};

type DisplayPlace = {
  id: string;
  name: string;
  address: string;
  highlight?: string;
  rating?: number;
  extra?: string;
  location?: {
    lat: number;
    lng: number;
  };
};

type ActivityConfig = {
  title: string;
  description: string;
  query: string;
  fallback: DisplayPlace[];
};

const ACTIVITIES: Record<string, ActivityConfig> = {
  'muay-thai': {
    title: 'Muay Thai',
    description:
      'Academias especializadas em Muay Thai, com treinadores experientes para todos os níveis.',
    query: 'muay thai|academia muay thai|aula de muay thai',
    fallback: [
      {
        id: 'fight-club',
        name: 'Fight Club',
        address: 'Rua das Lutas, 123 - Centro',
        highlight: 'Treinamento intensivo com campeões locais.',
        extra: 'Abre às 08h',
        location: { lat: -23.5635, lng: -46.6549 },
      },
      {
        id: 'espaco-lutas',
        name: 'Espaço Lutas',
        address: 'Av. dos Campeões, 456 - Bairro Forte',
        highlight: 'Treinamento intensivo com campeões locais.',
        extra: 'Instrutores certificados',
        location: { lat: -23.5478, lng: -46.6363 },
      },
      {
        id: 'campoes-gym',
        name: 'Campeões Gym',
        address: 'Rua do Boxe, 789 - Zona Leste',
        highlight: 'Aulas para iniciantes e avançados.',
        extra: 'Primeira aula gratuita',
        location: { lat: -23.5672, lng: -46.6429 },
      },
    ],
  },
  karate: {
    title: 'Karate',
    description:
      'Academias especializadas em Karate, com treinadores experientes para todos os níveis.',
    query: 'karate|academia karate|aula de karate',
    fallback: [
      {
        id: 'stake-karate',
        name: 'Stake Karate Dojo',
        address: 'Rua dos Samurai, 234 - Centro',
        highlight: 'Aulas tradicionais com mestres certificados.',
        extra: 'Treinos para crianças e adultos',
        location: { lat: -23.6001, lng: -46.6673 },
      },
      {
        id: 'kathay-gym',
        name: 'Kathay Gym',
        address: 'Av. do Dragão, 567 - Bairro Leste',
        highlight: 'Treinos focados em competição.',
        extra: 'Planos mensais',
        location: { lat: -23.5704, lng: -46.6582 },
      },
      {
        id: 'samurai-center',
        name: 'Samurai Center',
        address: 'Rua do Guerreiro, 890 - Zona Sul',
        highlight: 'Aulas para todas as idades.',
        extra: 'Estacionamento gratuito',
        location: { lat: -23.5712, lng: -46.6789 },
      },
    ],
  },
  wrestling: {
    title: 'Wrestling',
    description:
      'Academias especializadas em Wrestling, com treinadores experientes para todos os níveis.',
    query: 'wrestling|academia wrestling|aula de wrestling',
    fallback: [
      {
        id: 'romano-wrestling',
        name: 'Romano Wrestling Club',
        address: 'Rua das Lutas, 321 - Centro',
        highlight: 'Treinamento técnico e físico completo.',
        extra: 'Aulas para todas as idades',
        location: { lat: -23.5558, lng: -46.6396 },
      },
      {
        id: 'zenith-wrestling',
        name: 'Zenith Wrestling',
        address: 'Rua Horizonte, 410 - Zona Norte',
        highlight: 'Sessões de treino personalizadas.',
        extra: 'Treinadores experientes',
        location: { lat: -23.5294, lng: -46.6499 },
      },
      {
        id: 'gladiadores-gym',
        name: 'Gladiadores Gym',
        address: 'Rua do Comércio, 88 - Bairro Antigo',
        highlight: 'Treinos intensivos para competição.',
        extra: 'Equipe multidisciplinar',
        location: { lat: -23.5505, lng: -46.6333 },
      },
    ],
  },
};

const DEFAULT_ACTIVITY = 'wrestling';
const GOOGLE_KEY = 'AIzaSyCjqzmGElJkuDPEDVQQNqsOb-edZYauSto';

export default function LocaisMeditacao() {
  const params = useLocalSearchParams<{ atividade?: string }>();
  const activityKey =
    typeof params.atividade === 'string' ? params.atividade : DEFAULT_ACTIVITY;
  const activity = ACTIVITIES[activityKey] ?? ACTIVITIES[DEFAULT_ACTIVITY];

  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [places, setPlaces] = useState<GooglePlace[]>([]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const locationModule = await import('expo-location');
        const requestPermission = locationModule?.requestForegroundPermissionsAsync;
        const getCurrentPosition = locationModule?.getCurrentPositionAsync;
        const accuracy = locationModule?.Accuracy?.Highest;

        if (!requestPermission || !getCurrentPosition || !accuracy) {
          throw new Error('expo-location não está disponível neste build.');
        }

        const { status } = await requestPermission();
        if (status !== 'granted') {
          Alert.alert(
            'Permissão necessária',
            'Ative sua localização para sugerir locais próximos.'
          );
          if (isMounted) {
            setLocationError('Localização desativada.');
            setLoading(false);
          }
          return;
        }

        const location = await getCurrentPosition({ accuracy });
        const { latitude, longitude } = location.coords;

        if (isMounted) {
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
        }

        const query = encodeURIComponent(activity.query);
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=4000&keyword=${query}&key=${GOOGLE_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (isMounted && Array.isArray(data.results)) {
          setPlaces(data.results.slice(0, 8));
        }
      } catch (err) {
        console.warn(err);
        if (isMounted) {
          setLocationError(
            err instanceof Error
              ? err.message
              : 'Não foi possível obter sua localização.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [activity.query]);

  const displayPlaces: DisplayPlace[] = useMemo(() => {
    if (places.length === 0) {
      return activity.fallback;
    }

    return places.map((place) => ({
      id: place.place_id,
      name: place.name,
      address: place.vicinity ?? 'Endereço não informado',
      highlight: place.user_ratings_total
        ? `${place.user_ratings_total} avaliações`
        : undefined,
      rating: place.rating,
      extra: 'Sugerido pelo Google Maps',
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
    }));
  }, [places, activity.fallback]);

  const markers = displayPlaces.filter((p) => p.location);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.header}
        colors={[colors.darkBlue, colors.blue, colors.lightBlue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={{ paddingHorizontal: 4 }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>{activity.title}</Text>
      </LinearGradient>

      <View style={styles.main}>
        <Text style={styles.subtitle}>{activity.description}</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.blue}
            style={{ marginTop: 20 }}
          />
        ) : region ? (
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation
            loadingEnabled
          >
            {markers.map((place) => (
              <Marker
                key={place.id}
                coordinate={{
                  latitude: place.location!.lat,
                  longitude: place.location!.lng,
                }}
                title={place.name}
                description={place.address}
              />
            ))}
          </MapView>
        ) : (
          <Text style={styles.errorText}>
            {locationError ?? 'Não foi possível obter sua localização.'}
          </Text>
        )}

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Locais recomendados</Text>
          {places.length === 0 && (
            <Text style={styles.listSubtitle}>Mostrando sugestões fixas</Text>
          )}
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {displayPlaces.map((place) => (
            <TouchableOpacity
              key={place.id}
              style={styles.card}
              onPress={() => {
                router.push({
                  pathname: '/pages/(logado)/categorias/lutas/horarios',
                  params: {
                    localNome: place.name,
                    localEndereco: place.address,
                  },
                });
              }}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.placeName}>{place.name}</Text>
                {place.rating && (
                  <View style={styles.ratingPill}>
                    <MaterialCommunityIcons
                      name="star"
                      size={14}
                      color="#FFB703"
                    />
                    <Text style={styles.ratingText}>{place.rating.toFixed(1)}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.placeAddress}>{place.address}</Text>
              {place.highlight && (
                <Text style={styles.placeHighlight}>{place.highlight}</Text>
              )}
              {place.extra && (
                <Text style={styles.placeExtra}>{place.extra}</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  main: { flex: 1, paddingHorizontal: 20 },
  subtitle: {
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: 260,
    borderRadius: 16,
  },
  errorText: {
    textAlign: 'center',
    color: colors.darkGray,
    marginBottom: 16,
  },
  listHeader: {
    marginTop: 24,
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkBlue,
    textAlign: 'left',
  },
  listSubtitle: {
    fontSize: 12,
    color: colors.darkGray,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#f7f9ff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e5ff',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkBlue,
  },
  placeAddress: {
    marginTop: 4,
    fontSize: 14,
    color: colors.darkGray,
  },
  placeHighlight: {
    marginTop: 8,
    fontSize: 13,
    color: colors.blue,
  },
  placeExtra: {
    marginTop: 4,
    fontSize: 12,
    color: colors.darkGray,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff7dd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '600',
  },
});
