import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function LocaisMeditacao() {
  const [region, setRegion] = useState<Region | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const GOOGLE_KEY = 'AIzaSyCjqzmGElJkuDPEDVQQNqsOb-edZYauSto';

  useEffect(() => {
    (async () => {
      try {
        // Pede permissão de localização
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão necessária', 'Habilite a localização para ver os lugares próximos.');
          setLoading(false);
          return;
        }

        // Pega localização atual
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
        const { latitude, longitude } = location.coords;

        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        // Busca lugares próximos com Google Places API
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=3000&keyword=meditação|yoga|mindfulness&key=${GOOGLE_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        setPlaces(data.results || []);
      } catch (err) {
        console.log(err);
        Alert.alert('Erro', 'Não foi possível pegar a localização ou buscar lugares.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.header}
        colors={[colors.darkBlue, colors.blue, colors.lightBlue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <MaterialIcons name="arrow-back-ios" size={24} color={colors.white} />
        <Text style={styles.title}>Meditação Guiada</Text>
      </LinearGradient>

      <View style={styles.main}>
        <Text style={styles.subtitle}>Escolha algum lugar próximo</Text>

        {loading ? (
          <ActivityIndicator size="large" color={colors.blue} style={{ marginTop: 20 }} />
        ) : region ? (
          <MapView style={{ flex: 1, marginTop: 20 }} region={region} showsUserLocation>
            {places.map((p, i) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: p.geometry.location.lat,
                  longitude: p.geometry.location.lng,
                }}
                title={p.name}
                description={p.vicinity}
              />
            ))}
          </MapView>
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Não foi possível obter sua localização.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignContent: 'center', marginBottom: 20, padding: 20 },
  title: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: colors.white },
  main: { flex: 1, paddingHorizontal: 20, paddingVertical: 10 },
  subtitle: { fontSize: 16, color: colors.darkGray, textAlign: 'center' },
});
